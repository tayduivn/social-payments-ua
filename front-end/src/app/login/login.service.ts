import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../../../../api-contracts/auth/login-response';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {
  constructor(private apollo: Apollo, private http: HttpClient) {
  }

  public requestLogin(login: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.dataQueries.login, {login, password})
    .pipe(
      tap((res: LoginResponse) => {
          localStorage.setItem('token', res.token);

          this.apollo.query({
            query: gql`query QuhtorizeTest {
              authorize(login: "asd", password: "Asdasd") {
                authorized
              }
            }`,
            fetchPolicy: 'no-cache'
          }).subscribe(
            () => {
              console.log('quried');
            },
            (er) => {
              console.log('error', er);
            }
          );
      })
    );
  }
}
