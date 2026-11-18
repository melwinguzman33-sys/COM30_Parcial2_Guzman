import { Component, computed, input, numberAttribute } from '@angular/core';
import { RouterLink } from '@angular/router';
import { M, PATRON_CODIGO, TOPE } from './taller2';

@Component({
  selector: 'app-detalle-taller2',
  imports: [RouterLink],
  template: `
    <main class="contenedor">
      <h2>Detalle</h2>
      @if (valido()) {
        <dl>
          <dt>Código</dt><dd>{{ codigo() }}</dd>
          <dt>Cantidad</dt><dd>{{ cantidad() }}</dd>
          <dt>Bloques</dt><dd>{{ bloques() }}</dd>
          <dt>Margen</dt><dd>{{ margen() }}</dd>
        </dl>
      } @else {
        <p class="aviso">Código inválido</p>
      }
      <a routerLink="/taller2">Volver</a>
    </main>
  `,
  styles: `.aviso { color: #b00020; font-weight: 700; }`,
})
export class DetalleTaller2 {
  // :codigo (parámetro de ruta) y ?cantidad= (query param) llegan por withComponentInputBinding
  readonly codigo = input.required<string>();
  readonly cantidad = input(0, { transform: numberAttribute });

  readonly valido = computed(() => PATRON_CODIGO.test(this.codigo()));
  readonly bloques = computed(() => this.cantidad() / M);
  readonly margen = computed(() => TOPE - this.cantidad());
}
