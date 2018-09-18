import { PersonFinancialInstitutions } from './person-financial-institutions';

export interface PersonAccounts {
  _id: string;
  personId: string;
  financialInstitutions: PersonFinancialInstitutions[];
}
