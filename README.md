# COM30 · Talleres 06, 07 y 08 · Mesa de ayuda de TI

**Autor:** Melwin David Guzmán Guzmán
**Curso:** COM30 Programación con Frameworks para Web · 2026-III · Institución Universitaria de Barranquilla

## Escenario

E1 · Mesa de ayuda de TI. Aplicación para registrar y gestionar solicitudes de soporte
(solicitante, correo institucional, categoría, prioridad, descripción, impacto y equipos afectados).
Los datos viven en memoria, en `RegistroService` (signal). No se usa HttpClient ni guards.

- **Taller 06:** formulario reactivo con validadores propios y de grupo, FormArray de equipos,
  servicio con signals, listado con `@for`/`@empty` y resumen con `@defer`.
- **Taller 07:** búsqueda reactiva sobre las solicitudes (componente `src/app/busqueda`).
- **Taller 08:** rutas y navegación con Angular Router (ver la tabla de rutas).

## Taller 08 · Rutas y navegación

Tabla de rutas, en el orden de `src/app/app.routes.ts`:

| # | Ruta | Vista (componente) | Parámetro o carga | `title` |
|---|---|---|---|---|
| 1 | `/` (vacía) | — | `redirectTo: 'solicitudes'`, `pathMatch: 'full'` | — |
| 2 | `/solicitudes` | `Listado` | Consulta `?estado=` → `input()` `estado` | Solicitudes |
| 3 | `/solicitudes/nueva` | `RegistroForm` (alta) | Al guardar: `router.navigate(['/solicitudes', código])` | Nueva solicitud |
| 4 | `/solicitudes/:id` | `Detalle` | Parámetro `:id` → `input.required()` `id` + `computed` | Detalle de solicitud |
| 5 | `/busqueda` | `Busqueda` (Taller 07) | — | Búsqueda |
| 6 | `/estadisticas` | `Estadisticas` | `loadComponent` (chunk diferido) | Estadísticas |
| 7 | `**` | `NoEncontrada` (404) | Comodín, siempre de último | Página no encontrada |

`/solicitudes/nueva` va antes que `/solicitudes/:id`; en el orden contrario, «nueva» se leería como un código.

| Pieza | Dónde |
|---|---|
| `provideRouter(routes, withComponentInputBinding())` | `src/app/app.config.ts` |
| Menú con `routerLink` y `routerLinkActive` (inicio `/` con `{ exact: true }`), un solo `<router-outlet />` | `src/app/app.html` |
| Filtro con `[queryParams]` + `input()` `estado` + `computed` `visibles` + `@empty` | `src/app/listado/` |
| Detalle con `input.required<string>()` `id` + `computed` y mensaje «No existe la solicitud …» | `src/app/detalle/` |
| `router.navigate` al detalle del registro creado | `src/app/registro-form/registro-form.ts` |
| Vista diferida con `loadComponent` | `src/app/estadisticas/` |
| Vista 404 con la dirección pedida y enlace al listado | `src/app/no-encontrada/no-encontrada.ts` |

El código de cada solicitud es `R` + número de dos dígitos (`R01` … `R12`); el alta asigna el siguiente (`R13`).
Ningún enlace interno usa `href`; no se usa `ActivatedRoute.snapshot`, `NgModule` ni `*ngIf`.

### Casos de prueba (tabla B)

| Caso | Acción | Resultado esperado | Obtenido |
|---|---|---|---|
| C1 | Abrir `/` | Redirige a `/solicitudes`: 12 registros. Menú «Solicitudes» activo | Igual al esperado |
| C2 | Pulsar el filtro «En proceso» | URL `/solicitudes?estado=En%20proceso` · 4 registros (R02, R07, R08, R10) | Igual al esperado |
| C3 | Recargar con F5 en C2 | Los mismos 4 registros y el filtro «En proceso» marcado | Igual al esperado |
| C4 | Escribir `/solicitudes?estado=Cancelada` | Mensaje de `@empty`: 0 registros con ese estado | Igual al esperado |
| C5 | Pulsar la fila R05 | URL `/solicitudes/R05` · María Rodríguez · Accesos · Alta · Pendiente. «Solicitudes» sigue activo | Igual al esperado |
| C6 | Escribir `/solicitudes/R99` | «No existe la solicitud R99» dentro del detalle; no es la 404 | Igual al esperado |
| C7 | Escribir `/reportes` | Vista 404 con la dirección `/reportes` y un enlace al listado | Igual al esperado |
| C8 | Guardar el alta Laura Méndez · Hardware · Media · PRY-204 | Navega a `/solicitudes/R13`. El listado tiene 13 registros; filtro Pendiente: 5 | Igual al esperado |
| C9 | Abrir Estadísticas con F12 > Red (JS) | Un archivo `chunk-….js` nuevo la primera vez; ninguno la segunda | Igual al esperado |

## Taller 07 · Búsqueda reactiva

| Pieza | Dónde |
|---|---|
| Semilla de 12 registros (3 estados) | `src/app/semilla.ts` |
| `buscar(texto)` con retardo `max(150, 1500 − 300 × longitud)` ms y signal `llamadas` con `asReadonly()` | `src/app/registro.service.ts` |
| `FormControl` → `valueChanges` → `map(trim)` → `debounceTime(300)` → `distinctUntilChanged()` → `switchMap` (`of([])` bajo 2 caracteres) | `src/app/busqueda/busqueda.ts` |
| `toSignal` con valor inicial, filtro por estado con `signal` + `computed`, total y conteo por estado | `src/app/busqueda/busqueda.ts` |
| Historial de 5 consultas con `subscribe` + `takeUntilDestroyed()` | `src/app/busqueda/busqueda.ts` |
| Mensajes: mínimo 2 caracteres, «Buscando…», «Sin coincidencias» (`@empty`), `@for` con `track` | `src/app/busqueda/busqueda.html` |

**Regla de búsqueda:** sin tildes ni mayúsculas, el texto recortado con `trim()` debe estar contenido
en el campo **solicitante** o en el campo **descripción**. Con menos de 2 caracteres no se consulta.

## Cómo ejecutar

Requisitos: Node.js 20 o superior y npm.

```bash
git clone https://github.com/melwinguzman33-sys/com30-taller06-guzman.git
cd com30-taller06-guzman
npm install
npx ng serve
```

Abrir `http://localhost:4200/`. Para compilar la versión de producción:

```bash
npx ng build
```
