import { FinancialInstitution } from '../../../../api-contracts/financial-institution/financial.institution';
import { FinancialInstitutionModel } from './financial-institution.model';

export function checkAndUpdate(financialInstitution: FinancialInstitution): Promise<FinancialInstitution> {
  if (financialInstitution._id) {
    return FinancialInstitutionModel.findById(financialInstitution._id);
  }

  return FinancialInstitutionModel.find({
    mfo: financialInstitution.mfo,
    edrpou: financialInstitution.edrpou
  })
    .then(
      (fi: FinancialInstitutionModel[]) => {
        if (fi.length) {
          return Promise.resolve(fi[0]);
        } else {
          delete financialInstitution._id;
          return FinancialInstitutionModel.create(financialInstitution);
        }
      }
    );
}

