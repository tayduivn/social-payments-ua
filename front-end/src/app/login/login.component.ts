import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { WINDOW } from '../core/window';
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

  constructor(
    private cdRef: ChangeDetectorRef,
    private loginService: LoginService,
    private window: WINDOW
  ) {}

  public loginRequest() {
    this.loginService.requestLogin(this.login, this.password).subscribe(
      (res: any) => {
        console.log('Login:', res);
      },
      () => this.window.alert('Not authorized')
    );
  }
}
