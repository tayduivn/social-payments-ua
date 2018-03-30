import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { LoginResponse } from '../../../../api-contracts/auth/login-response';
import { LoginService } from './login.service';

@Component({
  selector: 'sp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  public login: string;
  public password: string;

  constructor(private cdRef: ChangeDetectorRef, private loginService: LoginService) { }

  public loginRequest() {
    this.loginService.requestLogin(this.login, this.password).subscribe(
      (res: LoginResponse) => {console.log('Login:', res);},
      () => alert('Not authorized')
    );
  }
}
