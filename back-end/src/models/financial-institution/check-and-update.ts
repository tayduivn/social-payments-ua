import { FinancialInstitutionModel } from './financial-institution.model';

export function checkAndUpdate(financialInstitution: any) {
  if (financialInstitution._id) {
    return Promise.resolve(financialInstitution);
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
          return FinancialInstitutionModel.create(financialInstitution);
        }
      }
    );
}

