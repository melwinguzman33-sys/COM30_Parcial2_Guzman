import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegistroService, codigoDe } from '../registro.service';
import { Estado } from '../registro.model';
import { Resumen } from '../resumen/resumen';

@Component({
  selector: 'app-listado',
  imports: [RouterLink, Resumen],
  templateUrl: './listado.html',
  styleUrl: './listado.css',
})
export class Listado {
  servicio = inject(RegistroService);
  readonly estados: Estado[] = ['Pendiente', 'En proceso', 'Resuelta'];
  readonly codigoDe = codigoDe;

  // T08: parámetro de consulta ?estado=… recibido con input() (withComponentInputBinding).
  // Al vivir en la URL, el filtro sobrevive a F5 y se puede compartir el enlace.
  readonly estado = input<string>();

  readonly visibles = computed(() => {
    const e = this.estado();
    const lista = this.servicio.registros();
    return e ? lista.filter(r => r.estado === e) : lista;
  });

  cambiarEstado(id: number, estado: string): void {
    this.servicio.cambiarEstado(id, estado as Estado);
  }

  eliminar(id: number): void {
    this.servicio.eliminar(id);
  }
}
