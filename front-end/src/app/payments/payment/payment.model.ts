import { FinancialInstitutionModel } from '../../shared/components/financial-institution/financial-institution.model';
import { PersonModel } from '../../shared/components/person/person.model';

export interface PaymentModel {
  date: string;
  accountNumber: string;
  sum: number;
  description: string;
  person: PersonModel;
  financialInstitution: FinancialInstitutionModel;

}
