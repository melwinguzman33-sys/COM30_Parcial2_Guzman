import { Routes } from '@angular/router';
import { Listado } from './listado/listado';
import { RegistroForm } from './registro-form/registro-form';
import { Detalle } from './detalle/detalle';
import { Busqueda } from './busqueda/busqueda';
import { Taller2 } from './taller2/taller2';
import { DetalleTaller2 } from './taller2/detalle';
import { NoEncontrada } from './no-encontrada/no-encontrada';

// T08: el orden importa. El comodín '**' va siempre de último.
export const routes: Routes = [
  { path: '', redirectTo: 'solicitudes', pathMatch: 'full' },
  { path: 'solicitudes', component: Listado, title: 'Solicitudes · Mesa de ayuda TI' },
  { path: 'solicitudes/nueva', component: RegistroForm, title: 'Nueva solicitud · Mesa de ayuda TI' },
  // 'nueva' va antes que ':id'; en el orden contrario «nueva» se leería como un código.
  { path: 'solicitudes/:id', component: Detalle, title: 'Detalle de solicitud · Mesa de ayuda TI' },
  { path: 'busqueda', component: Busqueda, title: 'Búsqueda · Mesa de ayuda TI' },
  {
    path: 'estadisticas',
    // Carga diferida: el componente se descarga en su propio chunk la primera vez que se visita.
    loadComponent: () => import('./estadisticas/estadisticas').then(m => m.Estadisticas),
    title: 'Estadísticas · Mesa de ayuda TI',
  },
  { path: 'taller2', component: Taller2, title: 'Parcial 2 · Mesa de ayuda TI' },
  { path: 'taller2/detalle/:codigo', component: DetalleTaller2, title: 'Detalle Parcial 2 · Mesa de ayuda TI' },
  { path: '**', component: NoEncontrada, title: 'Página no encontrada · Mesa de ayuda TI' },
];
