import { FinancialInstitutionModel } from './financial-institution.model';

export function checkAndUpdate(financialInstitution: any) {
  return new Promise((resolve, reject) => {
    if (financialInstitution.id) {
      resolve(financialInstitution);
    } else {
      FinancialInstitutionModel.count({
        mfo: financialInstitution.mfo,
        edrpou: financialInstitution.edrpou
      }, function (err, count) {
        if (err) { reject(err); }

        if (!count) {
          resolve(FinancialInstitutionModel.create(financialInstitution));
        } else {
          resolve(financialInstitution);
        }
      });
    }
  });
}

