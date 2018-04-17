import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {SpDialogConfigModel} from './sp-dialog-config.model';
import {SpDialogType} from './sp-dialog-type.enum';

@Component({
  selector: 'sp-confirm-dialog',
  templateUrl: './sp-dialog.component.html',
  styleUrls: ['./sp-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpDialogComponent {
  public SpDialogType = SpDialogType;

  constructor(@Inject(MAT_DIALOG_DATA) public config: SpDialogConfigModel) { }
}
