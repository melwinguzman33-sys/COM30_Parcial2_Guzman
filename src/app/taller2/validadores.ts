import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validador de control: el valor debe ser múltiplo de m.
// 0 es múltiplo de cualquier m, así que en ese caso solo falla min.
// Clave de error: 'multiplo'
export function multiploDe(m: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
    if (typeof valor !== 'number' || Number.isNaN(valor)) {
      return null; // el vacío lo valida Validators.required
    }
    return valor % m === 0 ? null : { multiplo: { m, actual: valor } };
  };
}

// Validador de grupo: 'hasta' debe ser estrictamente mayor que 'desde'.
// La igualdad se rechaza. Clave de error: 'hastaMayor'
export const hastaMayor: ValidatorFn = (grupo: AbstractControl): ValidationErrors | null => {
  const desde = grupo.get('desde')?.value;
  const hasta = grupo.get('hasta')?.value;
  if (typeof desde !== 'number' || typeof hasta !== 'number') {
    return null;
  }
  return hasta > desde ? null : { hastaMayor: { desde, hasta } };
};
