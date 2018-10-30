import { Injectable } from '@angular/core';
import { WindowProvider } from '../providers/window-provider';
import { CurrentUserModel } from './current-user.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private static readonly userKeyName = 'user';

  constructor(private window: WindowProvider) { }

  public setUser(userInfo: CurrentUserModel): void {
    this.window.localStorage.setItem(CurrentUserService.userKeyName, JSON.stringify(userInfo));
  }

  public getUser(): CurrentUserModel {
    return JSON.parse(this.window.localStorage.getItem(CurrentUserService.userKeyName)) || {};
  }
}
