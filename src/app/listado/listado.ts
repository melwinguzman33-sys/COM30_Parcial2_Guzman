import { Component, inject } from '@angular/core';
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

  cambiarEstado(id: number, estado: string): void {
    this.servicio.cambiarEstado(id, estado as Estado);
  }

  eliminar(id: number): void {
    this.servicio.eliminar(id);
  }
}
