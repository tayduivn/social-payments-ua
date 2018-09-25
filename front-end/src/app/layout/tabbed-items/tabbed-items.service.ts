import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class TabbedItemsService {
  public readonly closeActiveTab$: Observable<void>;

  private closeActiveTabSubject = new Subject<void>();

  constructor() {
    this.closeActiveTab$ = this.closeActiveTabSubject.asObservable();
  }

  public closeActiveTab(): void {
    this.closeActiveTabSubject.next();
  }
}
