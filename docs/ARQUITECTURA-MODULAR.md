# Arquitectura modular Autocor

## Objetivo

Separar la aplicacion por dominios para que cada ajuste futuro sea mas seguro:
Comercial, Mesa de Control, Proveedores, Procesamiento de Datos y componentes compartidos.

## Estado actual

La logica principal sigue en `app.js` para no romper produccion. La estructura modular ya
queda conectada desde `index.html` antes de cargar `app.js`.

## Carpetas

- `js/core`: utilidades globales y registro `window.Autocor`.
- `js/components`: componentes reutilizables, por ejemplo modales.
- `js/modules`: puntos de entrada por modulo operativo.

## Proxima fase recomendada

Mover un modulo a la vez desde `app.js`, empezando por componentes sin dependencia de datos:
modales, tarjetas KPI, filtros y renderizadores de listas. Despues mover Comercial,
Mesa de Control, Proveedores y Procesamiento con pruebas por modulo.
