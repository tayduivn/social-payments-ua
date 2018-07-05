import {
  ChangeDetectionStrategy,
  Component,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PersonAccountSelectedModel } from '../../../shared/components/person-accounts/person-account-selected.model';
import { PersonAccountsModel } from '../../../shared/components/person-accounts/person-accounts.model';
import { SelectPersonAccountDialogService } from './select-person-account-dialog.service';

@Component({
  selector: 'sp-select-person-account-dialog',
  templateUrl: './select-person-account-dialog.component.html',
  styleUrls: ['./select-person-account-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectPersonAccountDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PersonAccountsModel,
    private selectPersonAccountDialogService: SelectPersonAccountDialogService
  ) { }

  public onAccountSelected(accountSelected: PersonAccountSelectedModel) {
    this.selectPersonAccountDialogService.closeDialog(accountSelected)
  }
}
