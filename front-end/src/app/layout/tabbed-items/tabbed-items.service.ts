import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TabbedItemsService {
  public readonly closeActiveTab$: Observable<number | null>;

  private closeActiveTabSubject = new Subject<number | null>();

  constructor() {
    this.closeActiveTab$ = this.closeActiveTabSubject.asObservable();
  }

  public closeActiveTab(activationTabIndex: number = null): void {
    this.closeActiveTabSubject.next(activationTabIndex);
  }
}
