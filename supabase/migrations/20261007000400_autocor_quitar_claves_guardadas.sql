-- Se ejecuta en la activacion, despues de sincronizar las cuentas de Supabase Auth.
-- Quita las contrasenas en texto plano que quedaron guardadas en el historial de REGISTROS.
-- Se procesa por lotes porque "estado_completo" pesa varios cientos de MB.

create or replace function autocor_private.quitar_claves_lote(p_modulo text, p_desde bigint, p_hasta bigint)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_filas integer;
begin
  update public."REGISTROS" r
  set datos = (
    select jsonb_object_agg(
      e.key,
      case
        when e.key in ('commercialAdvisors', 'legalUsers', 'managerUsers', 'processingUsers') and jsonb_typeof(e.value) = 'array'
          then (
            select coalesce(jsonb_agg(case when jsonb_typeof(x.value) = 'object' then x.value - 'password' else x.value end order by x.ordinality), '[]'::jsonb)
            from jsonb_array_elements(e.value) with ordinality x(value, ordinality)
          )
        else e.value
      end
    )
    from jsonb_each(r.datos) e
  )
  where r.id between p_desde and p_hasta
    and r.modulo = p_modulo
    and r.tipo = case when p_modulo = 'sistema' then 'estado_completo' else 'base' end
    and jsonb_typeof(r.datos) = 'object';
  get diagnostics v_filas = row_count;
  return v_filas;
end;
$$;

revoke all on function autocor_private.quitar_claves_lote(text, bigint, bigint) from public, anon, authenticated;

-- En la activacion:
--   select * from autocor_private.sync_auth_users_from_registros();
--   select autocor_private.quitar_claves_lote('usuarios', 1, 999999);
--   select autocor_private.quitar_claves_lote('sistema', <desde>, <hasta>);  -- lotes de ~30 MB; hay filas de 15 MB
-- Ejecutado el 2026-10-07: 853 filas de usuarios y 297 de estado_completo quedaron sin claves.
