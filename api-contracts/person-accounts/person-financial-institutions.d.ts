import { PersonAccount } from './person-account';

export interface PersonFinancialInstitutions {
  financialInstitutionId: string;
  accounts: PersonAccount[]
}

