import { PersonAccountModel } from './person-account.model';
import { PersonFinancialInstitutionsModel } from './person-financial-institutions.model';

export interface PersonAccountSelectedModel {
  id: string;
  person: string;
  financialInstitution: PersonFinancialInstitutionsModel;
  account: PersonAccountModel;
}
