import { FinancialInstitution } from '../../../../../../api-contracts/financial-institution/financial.institution';
import { Person } from '../../../../../../api-contracts/person/person';

export interface HistoryFilterModel {
  dateFrom: string;
  dateTo: string;
  sumFrom: number;
  sumTo: number;
  searchPhrase: string;
  financialInstitution: FinancialInstitution,
  person: Person
}
