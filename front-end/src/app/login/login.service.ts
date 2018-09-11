import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../../../../api-contracts/login.response';
import { environment } from '../../environments/environment';
import { AuthService } from '../core/auth.service';

@Injectable()
export class LoginService {
  constructor(private apollo: Apollo, private http: HttpClient, private authService: AuthService) {}

  public requestLogin(login: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.dataQueries.login, {login, password})
      .pipe(
        tap((res: any) => this.authService.setToken(res.token))
      );
  }
}
