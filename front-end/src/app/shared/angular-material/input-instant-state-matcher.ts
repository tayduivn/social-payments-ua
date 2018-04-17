import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export class InputInstantStateMatcher implements ErrorStateMatcher {
  public isErrorState(control: FormControl): boolean {
    return control && control.invalid && (control.dirty || control.touched);
  }
}
