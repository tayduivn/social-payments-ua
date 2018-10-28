import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

export class UnsubscribableComponent implements OnDestroy {
  protected componentSubscriptions: Subscription = new Subscription();

  public ngOnDestroy() {
    debugger;
    this.componentSubscriptions.unsubscribe();
  }
}
