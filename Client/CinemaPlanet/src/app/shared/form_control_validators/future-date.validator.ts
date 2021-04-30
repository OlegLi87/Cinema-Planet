import { AbstractControl } from '@angular/forms';

export function futureDateValidator(
  control: AbstractControl
): { [key: string]: boolean } {
  const dateObj = Date.parse(control.value);
  if (dateObj - Date.now() < 1) return { futureDate: true };
  return null;
}
