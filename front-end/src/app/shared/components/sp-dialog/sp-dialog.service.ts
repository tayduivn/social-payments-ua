import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { SpDialogComponent } from './sp-dialog.component';
import {SpDialogConfigModel} from './sp-dialog-config.model';

@Injectable()
export class SpDialogService {

  constructor(private dialog: MatDialog) { }

  public open(options: SpDialogConfigModel): Observable<boolean> {
    return this.dialog.open(SpDialogComponent, {
      data: options,
      role: 'alertdialog'
    }).afterClosed();
  }

}
