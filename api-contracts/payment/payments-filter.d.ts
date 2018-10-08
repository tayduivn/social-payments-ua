export interface PaymentsFilter {
  dateFrom?: string;
  dateTo?: string;
  sumFrom?: number;
  sumTo?: number;
  searchPhrase?: string;
  financialInstitutionId?: string;
  financialInstitutionMfo?: string;
  financialInstitutionEdrpou?: string;
  financialInstitutionName?: string;
  personId?: string;
  personFullName?: string;
  personPassportNumber?: string;
  personIdentityCode?: string;
}

