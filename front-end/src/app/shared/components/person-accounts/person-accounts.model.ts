import { PersonFinancialInstitutionsModel } from './person-financial-institutions.model';

export class PersonAccountsModel {
  id: string;
  person: string;
  financialInstitutions: PersonFinancialInstitutionsModel[];
}
