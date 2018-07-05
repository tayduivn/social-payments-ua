import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FinancialInstitutionService } from '../financial-institution/financial-institution.service';
import { PersonAccountSelectedModel } from './person-account-selected.model';
import { PersonAccountModel } from './person-account.model';
import { PersonAccountsModel } from './person-accounts.model';
import { PersonFinancialInstitutionsModel } from './person-financial-institutions.model';

@Component({
  selector: 'sp-person-accounts',
  templateUrl: './person-accounts.component.html',
  styleUrls: ['./person-accounts.component.scss']
})
export class PersonAccountsComponent {
  @Input() public personAccounts: PersonAccountsModel;

  @Output() public accountSelected = new EventEmitter<PersonAccountSelectedModel>();

  constructor(public financialInstitutionService: FinancialInstitutionService) {}

  public onAccountSelected(fi: PersonFinancialInstitutionsModel, account: PersonAccountModel) {
    this.accountSelected.emit({
      id: this.personAccounts.id,
      person: this.personAccounts.person,
      financialInstitution: fi,
      account
    })
  }
}
