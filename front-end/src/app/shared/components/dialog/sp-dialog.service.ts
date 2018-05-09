import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatDialogConfig } from '@angular/material/dialog/typings/dialog-config';
import { Observable } from 'rxjs/Observable';
import { SpDialogComponent } from './sp-dialog.component';
import {SpDialogConfigModel} from './sp-dialog-config.model';

@Injectable()
export class SpDialogService {

  constructor(private dialog: MatDialog) { }

  public open(options: SpDialogConfigModel, dialogProps?: MatDialogConfig): Observable<boolean> {
    return this.dialog.open(SpDialogComponent, Object.assign(dialogProps || {}, {
      data: options,
      role: 'alertdialog'
    })).afterClosed();
  }

}
