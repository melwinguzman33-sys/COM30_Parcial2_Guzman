import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Router } from '@angular/router';
import { RegistroService, normalizar } from '../registro.service';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { hastaMayor, multiploDe } from './validadores';

// Parámetros de la fila d = 2 (tabla 1)
export const M = 4;
export const TOPE = 24;
export const PATRON_CODIGO = /^[A-Z]{2}\d{3}$/;

@Component({
  selector: 'app-taller2',
  imports: [ReactiveFormsModule],
  templateUrl: './taller2.html',
  styleUrl: './taller2.css',
})
export class Taller2 {
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly router = inject(Router);

  readonly m = M;
  readonly tope = TOPE;

  readonly form = this.fb.group(
    {
      codigo: ['', [Validators.required, Validators.pattern(PATRON_CODIGO)]],
      cantidad: [0, [Validators.required, Validators.min(1), Validators.max(TOPE), multiploDe(M)]],
      desde: [0, Validators.required],
      hasta: [0, Validators.required],
    },
    { validators: hastaMayor },
  );

  // R2: búsqueda reactiva
  private readonly servicio = inject(RegistroService);
  readonly buscar = this.fb.control('');
  readonly ultimo = signal('');
  readonly emisiones = signal(0);

  readonly filtrados = computed(() => {
    const texto = normalizar(this.ultimo());
    return this.servicio
      .registros()
      .filter(
        r =>
          normalizar(r.solicitante).includes(texto) ||
          normalizar(r.categoria).includes(texto),
      );
  });

  constructor() {
    this.buscar.valueChanges
      .pipe(
        map(v => v.trim()),
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
      .subscribe(valor => {
        this.ultimo.set(valor);
        this.emisiones.update(n => n + 1);
      });
  }

  mostrar(control: AbstractControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  mostrarGrupo(): boolean {
    const { desde, hasta } = this.form.controls;
    return (
      this.form.hasError('hastaMayor') &&
      (desde.touched || desde.dirty || hasta.touched || hasta.dirty)
    );
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { codigo, cantidad } = this.form.getRawValue();
    this.router.navigate(['/taller2/detalle', codigo], { queryParams: { cantidad } });
  }
}
