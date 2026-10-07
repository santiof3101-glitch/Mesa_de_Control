# Plan de estabilizacion Autocor

## Objetivo

Convertir el sistema actual en una version mas estable y mantenible sin rehacerlo desde cero.
El sistema ya tiene procesos validados; la prioridad es proteger la operacion, ordenar el codigo
y reducir errores antes de invertir en una reingenieria completa.

## Diagnostico inicial

- La aplicacion carga `index.html`, `styles.css`, `layout-fix.css`, los modulos en `js/` y luego `app.js`.
- La logica principal sigue concentrada en `app.js`, que actualmente es el archivo critico.
- Ya existe una estructura modular en `js/core`, `js/components` y `js/modules`, pero todavia no reemplaza al nucleo.
- Supabase esta integrado mediante la tabla `REGISTROS` y sincronizacion por modulos.
- La carpeta usada para publicar en GitHub parece ser `.github-publish`.
- El foco no debe ser reescribir todo, sino estabilizar por fases.

## Fase 1: estabilidad operativa

Objetivo: que el sistema guarde, sincronice y no pierda informacion.

Tareas:

- Validar login y persistencia de sesion.
- Revisar guardado en Supabase por modulo.
- Revisar sincronizacion entre navegadores y celular.
- Crear respaldo antes de cambios importantes.
- Revisar consumo de Supabase y reducir consultas innecesarias.
- Probar flujos criticos:
  - Comercial crea saneamiento.
  - Comercial crea CUV.
  - Comercial crea contrato.
  - Mesa de control toma tarea.
  - Mesa de control cambia estado.
  - Firma muestra ficha completa.
  - Proveedores guarda carga y calcula valores.
  - PDFs se generan y se guardan.

## Fase 2: orden modular

Objetivo: reducir el riesgo de que un cambio rompa otro modulo.

Tareas:

- Mantener `app.js` como nucleo mientras se migra con cuidado.
- Mover primero funciones visuales reutilizables:
  - modales;
  - tarjetas KPI;
  - renderizadores de listas;
  - helpers de formularios;
  - helpers de PDF.
- Separar despues por dominios:
  - Comercial;
  - Mesa de Control;
  - Proveedores;
  - Procesamiento;
  - Administrador;
  - Reportes.

## Fase 3: Supabase y datos

Objetivo: preparar una base mas sana sin romper produccion.

Tareas:

- Documentar los tipos actuales dentro de `REGISTROS`.
- Crear mapa de datos por modulo.
- Definir que entidades deberian ser tablas futuras:
  - usuarios;
  - agencias;
  - leads;
  - tareas;
  - firmas;
  - CUV;
  - contratos;
  - proveedores;
  - cargas;
  - archivos;
  - auditoria.
- Mantener la tabla actual mientras se valida la migracion.
- Crear exportaciones de respaldo.

## Fase 4: seguridad y permisos

Objetivo: evitar accesos incorrectos y cambios no autorizados.

Tareas:

- Revisar roles:
  - administrador;
  - comercial;
  - mesa de control;
  - gerencia;
  - procesamiento de datos.
- Validar permisos por modulo.
- Registrar acciones importantes:
  - crear;
  - editar;
  - eliminar;
  - cambiar estado;
  - generar PDF;
  - aprobar duplicado;
  - cerrar sesion forzada.

## Fase 5: pruebas antes de publicar

Objetivo: no subir cambios a produccion sin revisar flujos clave.

Checklist minimo:

- Abre la pagina principal.
- Inicia sesion como administrador.
- Inicia sesion como comercial.
- Inicia sesion como mesa de control.
- Crea una solicitud de saneamiento.
- Crea una solicitud CUV.
- Crea una solicitud de contrato.
- Revisa tracking comercial.
- Revisa repositorio de tareas.
- Abre ficha de firmas.
- Genera PDF.
- Guarda y recarga la pagina.
- Verifica desde otro navegador.
- Verifica desde celular.

## Recomendacion de trabajo

1. No modificar produccion directo.
2. Trabajar en `.github-publish` o en una rama de prueba.
3. Hacer cambios pequenos.
4. Probar.
5. Publicar.
6. Si algo falla, volver al commit anterior.

## Que pedir a un TI externo

Si se contrata soporte externo, no pedir "hacer todo desde cero" al inicio.
Pedir primero:

- auditoria tecnica;
- backups;
- optimizacion Supabase;
- seguridad basica;
- pruebas de flujos criticos;
- plan de migracion por fases.

La reingenieria completa debe hacerse solo cuando los procesos ya esten estables y documentados.
