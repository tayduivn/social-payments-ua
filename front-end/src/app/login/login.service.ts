import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {
  constructor(private apollo: Apollo, private http: HttpClient) {
  }

  public requestLogin(login: string, password: string): Observable<any> {
    return this.http.post(environment.dataQueries.login, {login, password})
    .pipe(
      tap((res: any) => {
          localStorage.setItem('token', res.token);
      })
    );
  }
}
