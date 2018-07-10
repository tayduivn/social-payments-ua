import { FinancialInstitutionModel } from '../../models/financial-institution/financial-institution.model';

export const resolvers = {
  Query: {
    financialInstitutions: () => FinancialInstitutionModel.find()
  }
};