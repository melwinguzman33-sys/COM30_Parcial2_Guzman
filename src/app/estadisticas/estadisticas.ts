import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegistroService } from '../registro.service';
import { Estado, Prioridad } from '../registro.model';

// T08: vista cargada con loadComponent (chunk propio, ver F12 > Red).
@Component({
  selector: 'app-estadisticas',
  imports: [RouterLink],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.css',
})
export class Estadisticas {
  private servicio = inject(RegistroService);
  readonly total = this.servicio.total;

  private readonly estados: Estado[] = ['Pendiente', 'En proceso', 'Resuelta'];
  private readonly prioridades: Prioridad[] = ['Baja', 'Media', 'Alta', 'Crítica'];

  readonly porEstado = computed(() =>
    this.contar(this.estados, e => this.servicio.registros().filter(r => r.estado === e).length),
  );

  readonly porPrioridad = computed(() =>
    this.contar(this.prioridades, p => this.servicio.registros().filter(r => r.prioridad === p).length),
  );

  readonly porCategoria = computed(() => {
    const mapa = new Map<string, number>();
    for (const r of this.servicio.registros()) {
      mapa.set(r.categoria, (mapa.get(r.categoria) ?? 0) + 1);
    }
    return [...mapa].map(([nombre, cantidad]) => this.fila(nombre, cantidad));
  });

  private contar<T extends string>(claves: T[], f: (k: T) => number) {
    return claves.map(k => this.fila(k, f(k)));
  }

  private fila(nombre: string, cantidad: number) {
    const total = this.total();
    return { nombre, cantidad, porcentaje: total ? Math.round((cantidad / total) * 100) : 0 };
  }
}
