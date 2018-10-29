import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((err: any, caught: Observable<HttpEvent<any>>): Observable<HttpEvent<any>> => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.authService.setToken(null);
              this.router.navigate(['/login']);
            }
          }

          if (err) {
            throw err;
          } else {
            return caught;
          }
        })
      );
  }
}
