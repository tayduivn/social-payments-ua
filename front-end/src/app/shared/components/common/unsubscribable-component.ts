import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

export class UnsubscribableComponent implements OnDestroy {
  protected componentSubscriptions: Subscription;

  public ngOnDestroy() {
    console.log('destroy component');
    if (this.componentSubscriptions) {
      this.componentSubscriptions.unsubscribe();
    }
  }
}
