-- Feria: devuelve solo la ultima version de cada solicitud (las reglas de lectura de REGISTROS se aplican igual).
create index if not exists registros_modulo_tipo_id_idx on public."REGISTROS" (modulo, tipo, id desc);

create or replace function public.autocor_feria_tareas()
returns table (id bigint, datos jsonb)
language sql
stable
security invoker
set search_path to ''
as $$
  select distinct on (r.datos ->> 'id') r.id::bigint, r.datos
  from public."REGISTROS" r
  where r.modulo = 'feria' and r.tipo = 'tarea' and coalesce(r.datos ->> 'id', '') <> ''
  order by r.datos ->> 'id', r.id desc;
$$;

revoke all on function public.autocor_feria_tareas() from public, anon;
grant execute on function public.autocor_feria_tareas() to authenticated;
