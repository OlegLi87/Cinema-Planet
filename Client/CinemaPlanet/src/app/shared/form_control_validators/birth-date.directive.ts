import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { ageValidator } from './age.validator';

@Directive({
  selector: '[birthDate][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useClass: BirthDateDirective, multi: true },
  ],
})
export class BirthDateDirective implements Validator {
  private ageValidator = ageValidator();

  constructor() {}

  validate(control: AbstractControl): ValidationErrors {
    return this.ageValidator(control);
  }
}
