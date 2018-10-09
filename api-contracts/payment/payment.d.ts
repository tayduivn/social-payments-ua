import { FinancialInstitution } from '../financial-institution/financial.institution';
import { Person } from '../person/person';

export interface Payment {
  _id: string;
  date: string;
  accountNumber?: string;
  sum: number;
  description: string;
  person: Person;
  financialInstitution: FinancialInstitution;
}
