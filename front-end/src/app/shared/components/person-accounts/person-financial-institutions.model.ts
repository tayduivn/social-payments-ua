import { PersonAccountModel } from './person-account.model';

export interface PersonFinancialInstitutionsModel {
  financialInstitution: string;
  accounts: PersonAccountModel[]
}

