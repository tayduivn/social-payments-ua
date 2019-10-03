import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/src/internal/Subject';

export class CompleteSubjectComponent implements OnDestroy {
  protected componentSubjects: {complete: () => void}[] = [];

  public ngOnDestroy() {
    (this.componentSubjects || []).forEach(s => s.complete());
  }
}
