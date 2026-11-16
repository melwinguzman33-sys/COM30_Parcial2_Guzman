import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegistroService, codigoDe } from '../registro.service';

// T08: detalle /solicitudes/:id. withComponentInputBinding entrega el parámetro «id»
// a un input() del mismo nombre; si cambia sin salir del componente, el computed se recalcula.
@Component({
  selector: 'app-detalle',
  imports: [RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle {
  private servicio = inject(RegistroService);

  readonly id = input.required<string>();

  readonly registro = computed(() => {
    const codigo = this.id().toUpperCase();
    return this.servicio.registros().find(r => codigoDe(r.id) === codigo);
  });

  readonly codigoDe = codigoDe;
}
