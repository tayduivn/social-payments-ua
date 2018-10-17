import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { WindowProvider } from '../shared/providers/window-provider';

const tokenKeyName = 'token';

@Injectable()
export class AuthService {
  public readonly loggedIn$: Observable<boolean>;

  private readonly loggedInSubject: BehaviorSubject<boolean>;

  constructor(private window: WindowProvider) {
    this.loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
    this.loggedIn$ = this.loggedInSubject.asObservable();
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public getToken(): string {
    return this.window.localStorage.getItem(tokenKeyName);
  }

  public setToken(token: string): void {
    this.window.localStorage.setItem(tokenKeyName, token);
    this.loggedInSubject.next(!!token);
  }
}
