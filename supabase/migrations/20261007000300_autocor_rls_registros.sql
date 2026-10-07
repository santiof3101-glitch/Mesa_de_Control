-- Reglas de acceso (RLS) para REGISTROS.
-- Antes: cualquier persona con la llave publica podia leer y crear registros.
-- Ahora: solo usuarios con sesion de Supabase Auth; sin sesion solo se lee el logo y colores.

alter table public."REGISTROS" enable row level security;

drop policy if exists "Enable read access for all users" on public."REGISTROS";
drop policy if exists "Permitir_guardar_registros" on public."REGISTROS";

-- Quien guardo cada registro (no se puede falsificar desde el navegador).
alter table public."REGISTROS" add column if not exists auth_uid uuid default auth.uid();

create policy "registros_marca_publica" on public."REGISTROS"
  for select to anon
  using (modulo = 'sistema' and tipo = 'branding');

create policy "registros_leer_con_sesion" on public."REGISTROS"
  for select to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'autocor_role') in ('admin', 'commercial', 'legal', 'manager', 'processing'));

create policy "registros_guardar_con_sesion" on public."REGISTROS"
  for insert to authenticated
  with check (
    (auth.jwt() -> 'app_metadata' ->> 'autocor_role') in ('admin', 'commercial', 'legal', 'manager', 'processing')
    and auth_uid = auth.uid()
    and coalesce(modulo, '') <> ''
    and modulo <> 'datacil'
    and (modulo <> 'usuarios' or (auth.jwt() -> 'app_metadata' ->> 'autocor_role') in ('admin', 'legal'))
    and (modulo <> 'sistema' or (auth.jwt() -> 'app_metadata' ->> 'autocor_role') = 'admin')
  );

-- Sin reglas de UPDATE ni DELETE: desde la app nadie puede modificar ni borrar el historial.

create index if not exists registros_modulo_tipo_fecha_idx on public."REGISTROS" (modulo, tipo, created_at desc);
