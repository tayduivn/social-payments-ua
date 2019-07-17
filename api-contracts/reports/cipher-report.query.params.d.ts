import { FinancialInstitution } from '../financial-institution/financial.institution';

export interface CipherReportQueryParams {
  date: string;
  codeKFK: string;
  codeKEK: string;
  reportNumber: string;
  financialInstitution?: FinancialInstitution;
  filename?: boolean;
}
