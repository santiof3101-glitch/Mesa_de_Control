# Activacion: Supabase Auth, RLS y Storage

## Ya hecho en Supabase (no afecta a la version actual)

- Cuentas de Supabase Auth para todos los usuarios (`autocor_private.upsert_auth_user`), con las mismas claves.
- Cuenta de administrador nueva (usuario interno `admin`).
- Funciones para el panel: `autocor_guardar_acceso`, `autocor_cambiar_clave`, `autocor_bloquear_acceso`, `autocor_sincronizar_accesos`.
- Bucket privado `autocor-archivos` con sus reglas.
- Funcion `datacil-consulta` (verifica el token del usuario).

## Pasos de activacion (en este orden, en horario sin uso)

1. [Hecho 2026-10-07] Unir la rama `seguridad-supabase` a `main` (GitHub Pages publica la nueva version en 1-2 minutos).
2. [Hecho] Aplicar `20261007000300_autocor_rls_registros.sql` (cierra la tabla REGISTROS).
3. [Hecho] Aplicar `20261007000400_autocor_quitar_claves_guardadas.sql` (sincroniza cuentas y borra claves del historial).
4. [Hecho] Publicar `datacil-vehiculo` con el mismo codigo seguro de `datacil-consulta`.
5. Probar: ingreso de administrador, comercial, mesa de control, procesamiento; guardar algo; Consulta ANT; subir un archivo.

Los navegadores abiertos con la version anterior se recargan solos al detectar la nueva version.

## Si algo falla (volver atras)

1. Revertir el merge en `main`.
2. Restaurar las reglas anteriores:

```sql
drop policy if exists "registros_marca_publica" on public."REGISTROS";
drop policy if exists "registros_leer_con_sesion" on public."REGISTROS";
drop policy if exists "registros_guardar_con_sesion" on public."REGISTROS";
create policy "Enable read access for all users" on public."REGISTROS" for select to public using (true);
create policy "Permitir_guardar_registros" on public."REGISTROS" for insert to public with check (true);
```

Nota: despues del paso 3 la version anterior ya no tiene claves para comparar; si se vuelve atras,
el administrador debe asignar claves de nuevo desde el panel anterior.

## Como funciona el acceso ahora

- Cada usuario entra con su usuario y clave; Supabase Auth entrega un token firmado.
- El rol (comercial, mesa de control, gerencia, datos, administrador) viaja dentro del token y no se puede alterar.
- La base de datos solo responde a quien tiene un token valido (RLS).
- Las claves no se guardan en REGISTROS ni en el navegador.
- Al eliminar un usuario en el panel, su acceso queda bloqueado.
