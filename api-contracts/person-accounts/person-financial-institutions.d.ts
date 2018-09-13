import { PersonAccount } from './person-account';

export interface PersonFinancialInstitutions {
  financialInstitution: string;
  accounts: PersonAccount[]
}

