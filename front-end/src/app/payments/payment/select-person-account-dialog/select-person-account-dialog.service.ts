import {
  Injectable,
  OnDestroy
} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { PersonAccountSelectedModel } from '../../../shared/components/person-accounts/person-account-selected.model';
import { SelectPersonAccountDialogComponent } from './select-person-account-dialog.component';

@Injectable()
export class SelectPersonAccountDialogService implements OnDestroy {
  public accountSelected$: Observable<PersonAccountSelectedModel>;

  private dialogRef: MatDialogRef<SelectPersonAccountDialogComponent>;
  public accountSelectedSubject = new Subject<PersonAccountSelectedModel>();

  constructor() {
    this.accountSelected$ = this.accountSelectedSubject.asObservable();
  }

  public setDialogRef(ref: MatDialogRef<SelectPersonAccountDialogComponent>) {
    this.dialogRef = ref;
  }

  public closeDialog(accountSelected: PersonAccountSelectedModel) {
    this.dialogRef.close();
    this.accountSelectedSubject.next(accountSelected);
  }

  public ngOnDestroy() {
    this.accountSelectedSubject.complete();
  }
}
