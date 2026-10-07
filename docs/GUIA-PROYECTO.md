# Guia del proyecto: AUTOCOR Mesa de Control

Notas para retomar el trabajo en el sistema.

## Que es

Aplicacion web de una sola pagina para la operacion de AUTOCOR: asesores comerciales
crean solicitudes (compra, venta, consignacion, CUV, Consulta ANT), la mesa de control
legal las toma y las cierra, gerencia ve reportes y procesamiento de datos carga bases.

- Publicada con GitHub Pages desde la rama `main`
  (https://santiof3101-glitch.github.io/Mesa_de_Control/).
- Datos en Supabase, proyecto `evblnxgeyelatdmloydl`.

## Archivos principales

| Archivo | Contenido |
| --- | --- |
| `index.html` | Todas las vistas (`<section class="view">`): `acceso` (inicio), logins, `formulario` (panel comercial), `tareas` (mesa de control), `gerencial`, `procesamiento`, `admin`, `comunicados`. |
| `app.js` | Logica completa: estado, render de cada vista, guardado en Supabase, contratos PDF, Consulta ANT. |
| `js/core/autocor-auth.js` | `window.AutocorAuth`: inicio de sesion con Supabase Auth, renovacion del token, llamadas RPC y Storage. |
| `styles.css` | Estilos base (historicos, con muchas capas). |
| `layout-fix.css` | Ajustes y rediseños recientes. Los bloques nuevos van al final, con comentario y fecha. |
| `js/consignment-templates.js`, `assets/contracts` | Plantillas PDF de contratos. |
| `server.js`, `iniciar-autocor.bat` | Servidor local opcional para un PC compartido. |
| `supabase/migrations` | SQL aplicado en Supabase (usuarios, Storage, RLS, limpieza de claves). |
| `supabase/functions` | Funciones `datacil-consulta` y `datacil-vehiculo` (Consulta ANT). |

## Como se guardan los datos

- Tabla `public."REGISTROS"`: cada guardado inserta una fila con `modulo`, `tipo` y `datos`
  (JSON). La aplicacion toma la ultima fila de cada modulo.
- Antes de publicar un modulo se hace una fusion de tres vias con la ultima version remota
  (`reconcileModuleBeforePublish`, `mergeThreeWay`) para no pisar cambios de otra persona.
- Archivos y PDF van al bucket privado `autocor-archivos` de Storage; en `REGISTROS` solo
  queda la referencia (`storageKey`).

## Acceso y seguridad

- Cada usuario entra con Supabase Auth. El correo interno es
  `<rol>--<usuario>@acceso.autocor.local`; el rol viaja en `app_metadata.autocor_role`.
- RLS en `REGISTROS`: sin sesion solo se lee `sistema/branding`; con sesion se lee y se
  inserta segun el rol.
- Las cuentas se crean, bloquean y cambian de clave con funciones RPC
  (`autocor_guardar_acceso`, `autocor_cambiar_clave`, `autocor_bloquear_acceso`).
- Las claves nunca se guardan en `REGISTROS` ni en el navegador.
- Detalle de la activacion y como volver atras: `docs/ACTIVACION-SUPABASE-AUTH.md`.

## Como publicar un cambio

1. Trabajar en la rama `seguridad-supabase`.
2. Cambiar el parametro `?v=` de `index.html` (CSS y JS) para que los navegadores
   descarguen la version nueva.
3. Probar en escritorio, tablet y celular.
4. Subir a `main`; GitHub Pages publica en uno o dos minutos.

## Cuidados

- Actualizaciones grandes en `REGISTROS` (la tabla pesa cientos de MB): hacerlas por lotes
  pequeños de `id`; una sola actualizacion masiva bloqueo la base.
- La clave de Datacil vive solo como secreto de las funciones de Supabase.

## Pendiente

- Probar con usuarios reales cada rol (comercial, mesa de control, procesamiento, gerencia).
- Cambiar la clave del administrador y pedir a los usuarios que cambien la suya.
- Opcional: activar la proteccion de claves filtradas en Supabase Auth.
- Banner del panel comercial: hay una propuesta con cuatro etiquetas en la rama
  `seguridad-supabase` (commit "Etiquetas de compromiso en el banner comercial"),
  sin publicar en `main` hasta aprobarla.
- Mantenimiento: `app.js` es muy grande; separar por modulos en `js/modules` poco a poco.
