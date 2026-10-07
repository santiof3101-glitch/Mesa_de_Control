-- Archivos y PDFs del sistema en Supabase Storage (bucket privado).
-- Solo usuarios con sesion pueden leer o subir; borrar solo administrador y procesamiento de datos.

insert into storage.buckets (id, name, public, file_size_limit)
values ('autocor-archivos', 'autocor-archivos', false, 52428800)
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit;


create policy "autocor_archivos_leer" on storage.objects
  for select to authenticated
  using (bucket_id = 'autocor-archivos');

create policy "autocor_archivos_subir" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'autocor-archivos');

create policy "autocor_archivos_actualizar" on storage.objects
  for update to authenticated
  using (bucket_id = 'autocor-archivos')
  with check (bucket_id = 'autocor-archivos');

create policy "autocor_archivos_borrar" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'autocor-archivos'
    and (auth.jwt() -> 'app_metadata' ->> 'autocor_role') in ('admin', 'processing')
  );
