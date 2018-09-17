import { FinancialInstitutionModel } from './financial-institution.model';

export function checkAndUpdate(financialInstitution: any) {
  return new Promise((resolve, reject) => {
    if (financialInstitution.id) {
      resolve(financialInstitution);
      return;
    }

    FinancialInstitutionModel.find({
      mfo: financialInstitution.mfo,
      edrpou: financialInstitution.edrpou
    })
      .then(
        (fi: FinancialInstitutionModel[]) => {
          if (fi.length) {
            resolve(financialInstitution[0]);
          } else {
            FinancialInstitutionModel.create(financialInstitution)
              .then(
                (fi: FinancialInstitutionModel) => resolve(fi),
                (err: any) => reject(err)
              );
          }
        },
        (err: any) => reject(err)
      );
  });
}

