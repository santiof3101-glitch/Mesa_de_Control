-- Accesos de Autocor con Supabase Auth.
-- Cada usuario del sistema (comercial, mesa de control, gerencia, datos, administrador)
-- tiene su propia cuenta en auth.users. El rol y el id interno van en app_metadata,
-- que solo el servidor puede modificar.

create schema if not exists autocor_private;
revoke all on schema autocor_private from public, anon, authenticated;

-- Correo interno de acceso: <rol>--<usuario normalizado>@acceso.autocor.local
-- Debe coincidir con authEmailForLogin() en app.js.
create or replace function autocor_private.auth_email(p_role text, p_username text)
returns text
language sql
immutable
set search_path = ''
as $$
  select lower(p_role) || '--' ||
    trim(both '.' from regexp_replace(
      regexp_replace(replace(lower(trim(coalesce(p_username, ''))), '@', '.at.'), '[^a-z0-9._-]', '-', 'g'),
      '\.{2,}', '.', 'g'
    )) || '@acceso.autocor.local';
$$;

create or replace function autocor_private.current_role()
returns text
language sql
stable
set search_path = ''
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'autocor_role', '');
$$;

create or replace function autocor_private.current_autocor_id()
returns text
language sql
stable
set search_path = ''
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'autocor_id', '');
$$;

-- Crea o actualiza la cuenta de un usuario. La clave solo se cambia si se envia.
create or replace function autocor_private.upsert_auth_user(
  p_role text,
  p_autocor_id text,
  p_username text,
  p_name text,
  p_password text default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid;
  v_email text := autocor_private.auth_email(p_role, p_username);
  v_app_meta jsonb := jsonb_build_object(
    'provider', 'email',
    'providers', jsonb_build_array('email'),
    'autocor_role', p_role,
    'autocor_id', p_autocor_id
  );
  v_user_meta jsonb := jsonb_build_object('name', coalesce(p_name, ''), 'username', coalesce(p_username, ''));
  v_password text := nullif(trim(coalesce(p_password, '')), '');
begin
  if p_role not in ('admin', 'commercial', 'legal', 'manager', 'processing') then
    raise exception 'Rol invalido: %', p_role;
  end if;
  if coalesce(trim(p_autocor_id), '') = '' or coalesce(trim(p_username), '') = '' then
    raise exception 'Usuario incompleto';
  end if;

  select id into v_user_id
  from auth.users
  where raw_app_meta_data ->> 'autocor_role' = p_role
    and raw_app_meta_data ->> 'autocor_id' = p_autocor_id
  limit 1;

  if v_user_id is null then
    v_user_id := gen_random_uuid();
    insert into auth.users (
      instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
      confirmation_token, recovery_token, email_change_token_new, email_change,
      email_change_token_current, phone_change, phone_change_token, reauthentication_token,
      is_sso_user, is_anonymous
    ) values (
      '00000000-0000-0000-0000-000000000000', v_user_id, 'authenticated', 'authenticated', v_email,
      extensions.crypt(coalesce(v_password, encode(extensions.gen_random_bytes(24), 'hex')), extensions.gen_salt('bf', 10)),
      now(), v_app_meta, v_user_meta, now(), now(),
      '', '', '', '', '', '', '', '', false, false
    );
    insert into auth.identities (id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    values (
      gen_random_uuid(), v_user_id::text, v_user_id,
      jsonb_build_object('sub', v_user_id::text, 'email', v_email, 'email_verified', true, 'phone_verified', false),
      'email', null, now(), now()
    );
  else
    update auth.users set
      email = v_email,
      raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || v_app_meta,
      raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb) || v_user_meta,
      encrypted_password = case when v_password is null then encrypted_password
        else extensions.crypt(v_password, extensions.gen_salt('bf', 10)) end,
      banned_until = null,
      updated_at = now()
    where id = v_user_id;
    update auth.identities set
      identity_data = coalesce(identity_data, '{}'::jsonb) || jsonb_build_object('email', v_email),
      updated_at = now()
    where user_id = v_user_id and provider = 'email';
  end if;
  return v_user_id;
end;
$$;

-- Sincroniza las cuentas con la lista de usuarios publicada en REGISTROS (modulo usuarios).
-- Las claves solo se toman si todavia estan en texto plano (migracion inicial).
-- Las cuentas que ya no existen en la lista quedan bloqueadas.
create or replace function autocor_private.sync_auth_users_from_registros()
returns table(role text, total integer, bloqueados integer)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_snapshot jsonb;
  v_collection record;
  v_user jsonb;
  v_password text;
  v_count integer;
  v_banned integer;
begin
  select datos into v_snapshot
  from public."REGISTROS"
  where modulo = 'usuarios' and tipo = 'base'
  order by id desc
  limit 1;
  if v_snapshot is null then
    raise exception 'No hay lista de usuarios publicada';
  end if;

  for v_collection in
    select * from (values
      ('commercialAdvisors', 'commercial'),
      ('legalUsers', 'legal'),
      ('managerUsers', 'manager'),
      ('processingUsers', 'processing')
    ) as c(collection, role_name)
  loop
    v_count := 0;
    for v_user in select value from jsonb_array_elements(coalesce(v_snapshot -> v_collection.collection, '[]'::jsonb))
    loop
      continue when coalesce(v_user ->> 'id', '') = '' or coalesce(v_user ->> 'username', '') = '';
      v_password := nullif(v_user ->> 'password', '');
      if v_password like 'pbkdf2-%' then
        v_password := null;
      end if;
      perform autocor_private.upsert_auth_user(
        v_collection.role_name, v_user ->> 'id', v_user ->> 'username', v_user ->> 'name', v_password
      );
      v_count := v_count + 1;
    end loop;

    update auth.users u set banned_until = 'infinity', updated_at = now()
    where u.raw_app_meta_data ->> 'autocor_role' = v_collection.role_name
      and u.banned_until is distinct from 'infinity'
      and not exists (
        select 1 from jsonb_array_elements(coalesce(v_snapshot -> v_collection.collection, '[]'::jsonb)) x
        where x.value ->> 'id' = u.raw_app_meta_data ->> 'autocor_id'
      );
    get diagnostics v_banned = row_count;

    role := v_collection.role_name;
    total := v_count;
    bloqueados := v_banned;
    return next;
  end loop;
end;
$$;

revoke all on all functions in schema autocor_private from public, anon, authenticated;

-- ===== Funciones que la aplicacion puede llamar (POST /rest/v1/rpc/...) =====

-- Administrador: crear o actualizar un usuario (con clave opcional).
create or replace function public.autocor_guardar_acceso(
  p_role text,
  p_id text,
  p_username text,
  p_name text,
  p_password text default null
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if autocor_private.current_role() <> 'admin' then
    raise exception 'Solo el administrador puede gestionar accesos' using errcode = '42501';
  end if;
  if p_role = 'admin' then
    raise exception 'Use autocor_cambiar_clave para el administrador' using errcode = '42501';
  end if;
  if nullif(trim(coalesce(p_password, '')), '') is not null and length(trim(p_password)) < 8 then
    raise exception 'La clave debe tener al menos 8 caracteres';
  end if;
  perform autocor_private.upsert_auth_user(p_role, p_id, p_username, p_name, p_password);
  return true;
end;
$$;

-- Administrador o el propio usuario: cambiar clave.
create or replace function public.autocor_cambiar_clave(p_role text, p_id text, p_password text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_caller_role text := autocor_private.current_role();
  v_caller_id text := autocor_private.current_autocor_id();
  v_updated integer;
begin
  if not (v_caller_role = 'admin' or (v_caller_role = p_role and v_caller_id = p_id)) then
    raise exception 'No autorizado' using errcode = '42501';
  end if;
  if length(trim(coalesce(p_password, ''))) < 8 then
    raise exception 'La clave debe tener al menos 8 caracteres';
  end if;
  update auth.users
  set encrypted_password = extensions.crypt(trim(p_password), extensions.gen_salt('bf', 10)), updated_at = now()
  where raw_app_meta_data ->> 'autocor_role' = p_role
    and raw_app_meta_data ->> 'autocor_id' = p_id;
  get diagnostics v_updated = row_count;
  if v_updated = 0 then
    raise exception 'El usuario no tiene cuenta de acceso';
  end if;
  return true;
end;
$$;

-- Administrador: bloquear o desbloquear un acceso (al eliminar un usuario del panel).
create or replace function public.autocor_bloquear_acceso(p_role text, p_id text, p_bloquear boolean default true)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if autocor_private.current_role() <> 'admin' then
    raise exception 'Solo el administrador puede gestionar accesos' using errcode = '42501';
  end if;
  if p_role = 'admin' then
    raise exception 'No se puede bloquear al administrador' using errcode = '42501';
  end if;
  update auth.users
  set banned_until = case when p_bloquear then 'infinity'::timestamptz else null end, updated_at = now()
  where raw_app_meta_data ->> 'autocor_role' = p_role
    and raw_app_meta_data ->> 'autocor_id' = p_id;
  return true;
end;
$$;

-- Administrador: sincronizar cuentas con la lista de usuarios (bloquea los eliminados).
create or replace function public.autocor_sincronizar_accesos()
returns table(role text, total integer, bloqueados integer)
language plpgsql
security definer
set search_path = ''
as $$
begin
  if autocor_private.current_role() <> 'admin' then
    raise exception 'Solo el administrador puede gestionar accesos' using errcode = '42501';
  end if;
  return query select * from autocor_private.sync_auth_users_from_registros();
end;
$$;

revoke all on function public.autocor_guardar_acceso(text, text, text, text, text) from public, anon;
revoke all on function public.autocor_cambiar_clave(text, text, text) from public, anon;
revoke all on function public.autocor_bloquear_acceso(text, text, boolean) from public, anon;
revoke all on function public.autocor_sincronizar_accesos() from public, anon;
grant execute on function public.autocor_guardar_acceso(text, text, text, text, text) to authenticated;
grant execute on function public.autocor_cambiar_clave(text, text, text) to authenticated;
grant execute on function public.autocor_bloquear_acceso(text, text, boolean) to authenticated;
grant execute on function public.autocor_sincronizar_accesos() to authenticated;
