export interface CipherReportQueryParams {
  date: string;
  codeKFK: string;
  codeKEK: string;
  reportNumber: string;
  financialInstitution?: string;
  filename?: boolean;
}
