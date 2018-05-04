import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

export class ComponentBase implements OnDestroy {
  protected componentSubscriptions: Subscription;

  public ngOnDestroy() {
    if (this.componentSubscriptions) {
      this.componentSubscriptions.unsubscribe();
    }
  }
}
