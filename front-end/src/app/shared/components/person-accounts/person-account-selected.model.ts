import { PersonAccount } from '../../../../../../api-contracts/person-accounts/person-account';
import { PersonFinancialInstitutions } from '../../../../../../api-contracts/person-accounts/person-financial-institutions';

export interface PersonAccountSelectedModel {
  id: string;
  person: string;
  financialInstitution: PersonFinancialInstitutions;
  account: PersonAccount;
}
