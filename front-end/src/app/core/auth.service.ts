import { Injectable } from '@angular/core';
import { WINDOW } from './window';

const tokenKeyName = 'token';

@Injectable()
export class AuthService {
  constructor(private window: WINDOW) { }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public getToken(): string {
    return this.window.localStorage.getItem(tokenKeyName);
  }

  public setToken(token: string): void {
    return this.window.localStorage.setItem(tokenKeyName, token);
  }
}
