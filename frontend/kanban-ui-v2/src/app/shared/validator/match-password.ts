import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class MatchPassword implements Validator {
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const { password, password2 } = control.value;
    if (password === password2) {
      return null;
    } else {
      return { passwordsDontMatch: true };
    }
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
}
