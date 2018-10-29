import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../../../../api-contracts/login/login-response';
import { environment } from '../../environments/environment';
import { AuthService } from '../shared/services/auth.service';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public requestLogin(login: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.dataQueries.loginEndpoint, {login, password})
      .pipe(
        tap((res: any) => this.authService.setToken(res.token))
      );
  }
}
