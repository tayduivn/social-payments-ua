import { PersonFinancialInstitutions } from './person-financial-institutions';

export interface PersonAccounts {
  id: string;
  person: string;
  financialInstitutions: PersonFinancialInstitutions[];
}
