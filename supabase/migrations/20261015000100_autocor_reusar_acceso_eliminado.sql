-- Volver a crear un usuario que se elimino antes (mismo rol y mismo usuario):
-- la cuenta bloqueada se reutiliza con el nuevo id, la nueva clave y se desbloquea.
create or replace function autocor_private.upsert_auth_user(p_role text, p_autocor_id text, p_username text, p_name text, p_password text default null::text)
 returns uuid
 language plpgsql
 security definer
 set search_path to ''
as $function$
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

  -- Mismo usuario de un acceso eliminado antes: se reutiliza esa cuenta.
  if v_user_id is null then
    select id into v_user_id from auth.users where email = v_email limit 1;
  end if;

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
$function$;
