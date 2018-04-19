import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../../../../api-contracts/login-response';
import { WINDOW } from '../core/window';
import { SpDialogType } from '../shared/components/sp-dialog/sp-dialog-type.enum';
import { SpDialogService } from '../shared/components/sp-dialog/sp-dialog.service';
import { LoginService } from './login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  public login: string;
  public password: string;

  constructor(
    private cdRef: ChangeDetectorRef,
    private loginService: LoginService,
    private router: Router,
    private spDialogService: SpDialogService
  ) {}

  public loginRequest() {
    this.loginService.requestLogin(this.login, this.password).subscribe(
      (res: LoginResponse) => {
        if (res.authorized) {
          this.router.navigate(['/']);
        }
      },
      () => {
        this.spDialogService.open({
          type: SpDialogType.Alert,
          title: 'Помилка',
          text: 'Невірний логін або пароль'
        }, {panelClass: 'sp-login-error-alert'});
      }
    );
  }
}
