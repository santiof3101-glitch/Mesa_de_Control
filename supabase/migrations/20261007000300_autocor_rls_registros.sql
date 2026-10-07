-- Reglas de acceso (RLS) para REGISTROS.
-- Antes: cualquier persona con la llave publica podia leer y crear registros.
-- Ahora: solo usuarios con sesion de Supabase Auth; sin sesion solo se lee el logo y colores.
-- (Aplicada el 2026-10-07 transformando las dos reglas abiertas anteriores.)

alter table public."REGISTROS" enable row level security;

-- Quien guardo cada registro (no se puede falsificar desde el navegador).
alter table public."REGISTROS" add column if not exists auth_uid uuid default auth.uid();

alter policy "Enable read access for all users" on public."REGISTROS"
  to anon
  using (modulo = 'sistema' and tipo = 'branding');
alter policy "Enable read access for all users" on public."REGISTROS" rename to "registros_marca_publica";

alter policy "Permitir_guardar_registros" on public."REGISTROS"
  to authenticated
  with check (
    (auth.jwt() -> 'app_metadata' ->> 'autocor_role') in ('admin', 'commercial', 'legal', 'manager', 'processing')
    and auth_uid = auth.uid()
    and coalesce(modulo, '') <> ''
    and modulo <> 'datacil'
    and (modulo <> 'usuarios' or (auth.jwt() -> 'app_metadata' ->> 'autocor_role') in ('admin', 'legal'))
    and (modulo <> 'sistema' or (auth.jwt() -> 'app_metadata' ->> 'autocor_role') = 'admin')
  );
alter policy "Permitir_guardar_registros" on public."REGISTROS" rename to "registros_guardar_con_sesion";

create policy "registros_leer_con_sesion" on public."REGISTROS"
  for select to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'autocor_role') in ('admin', 'commercial', 'legal', 'manager', 'processing'));

-- Sin reglas de UPDATE ni DELETE: desde la app nadie puede modificar ni borrar el historial.

create index if not exists registros_modulo_tipo_fecha_idx on public."REGISTROS" (modulo, tipo, created_at desc);
