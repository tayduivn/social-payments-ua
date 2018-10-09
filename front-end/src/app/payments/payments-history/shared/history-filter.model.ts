import { FinancialInstitution } from '../../../../../../api-contracts/financial-institution/financial.institution';
import { Person } from '../../../../../../api-contracts/person/person';

export interface HistoryFilterCommonModel {
  dateFrom: string;
  dateTo: string;
  sumFrom: number;
  sumTo: number;
}

export interface HistoryFilterModel extends HistoryFilterCommonModel {
  financialInstitution: FinancialInstitution,
  person: Person
}
