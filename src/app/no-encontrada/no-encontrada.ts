import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

// T08: vista 404. Solo llega aquí la dirección que ninguna ruta atiende.
@Component({
  selector: 'app-no-encontrada',
  imports: [RouterLink],
  template: `
    <section class="tarjeta">
      <h2>404 · Página no encontrada</h2>
      <p>La dirección <code>{{ direccion }}</code> no corresponde a ninguna vista de la mesa de ayuda.</p>
      <a routerLink="/solicitudes" class="boton">Volver al listado de solicitudes</a>
    </section>
  `,
  styles: `
    .tarjeta { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; }
    h2 { margin-top: 0; color: #b91c1c; }
    code { background: #f1f5f9; padding: 0.15rem 0.4rem; border-radius: 6px; }
    .boton { display: inline-block; margin-top: 0.5rem; padding: 0.5rem 1rem; background: #2563eb;
             color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600; }
  `,
})
export class NoEncontrada {
  readonly direccion = inject(Router).url;
}
