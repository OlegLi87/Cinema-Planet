import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ageValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const isValid =
      new Date(Date.now()).getFullYear() -
        new Date(control.value).getFullYear() >=
      18;

    if (isValid) return null;
    else return { age: true };
  };
}
