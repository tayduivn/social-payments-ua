import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UserResponseModel } from '../../../../../../api-contracts/user/user-response.model';
import { InputInstantStateMatcher } from '../../../shared/angular-material/input-instant-state-matcher';
import { allUA_CharsDiapason } from '../../../shared/constants/char-diapason-ua';
import { UserDialogModel } from './user-dialog.model';

@Component({
  selector: 'sp-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  public readonly fullNameFilter = `[a-zA-Z${allUA_CharsDiapason} .'-]`;
  public login = new FormControl('', [Validators.required]);
  public fullName = new FormControl('', [Validators.required]);
  public password = new FormControl('', [Validators.required]);
  public repeatPassword: FormControl;
  public isAdmin = new FormControl('');
  public showResetPasswordButton: boolean;

  public repeatPasswordMatcher = new InputInstantStateMatcher();

  private readonly userId: string;

  constructor(@Inject(MAT_DIALOG_DATA) private user: UserResponseModel) {
    this.repeatPassword = new FormControl('', [
      Validators.required,
      this.passwordsMatchValidator()
    ]);

    this.userId = this.user ? this.user.id : null;
    this.showResetPasswordButton = !!this.user;

  }

  public saveUserChanges(): UserDialogModel {
    return {
      user: {
        id: this.userId,
        login: this.login.value,
        fullName: this.fullName.value,
        isAdmin: this.isAdmin.value
      },
      password: this.password.value
    };
  }

  public ngOnInit() {
    if (this.user) {
      this.login.setValue(this.user.login);
      this.fullName.setValue(this.user.fullName);
      this.isAdmin.setValue(this.user.isAdmin);
    }
  }

  public getErrorMessage(input: FormControl) {
    switch (input) {
      case this.login:
        return this.login.hasError('required') ? 'Введіть логін' : '';
      case this.fullName:
        return this.fullName.hasError('required') ? 'Введіть повне ім\'я користувача' : '';
      case this.password:
        return this.password.hasError('required') ? 'Введіть пароль' : '';
      case this.repeatPassword:
        return this.getRepeatPasswordError();
    }
  }

  public isSaveDisabled(): boolean {
    const passwordError = this.showResetPasswordButton ? false : !!this.password.errors || !!this.repeatPassword.errors;

    return !!this.login.errors || !!this.fullName.errors|| passwordError;
  }

  public onResetButton() {
    this.showResetPasswordButton = false;
  }

  private passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const matchError = control.value !== this.password.value;
      return matchError ? {matchError} : null;
    }
  }

  private getRepeatPasswordError(): string {
    return this.repeatPassword.hasError('required') ? 'Введіть пароль повторно' :
      this.repeatPassword.hasError('matchError') ? 'Паролі не співпадають' : '';
  }
}
