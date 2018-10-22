import { FinancialInstitution } from '../../../../api-contracts/financial-institution/financial.institution';
import { MongoosePromise } from '../mongoose-promise';
import { FinancialInstitutionModel } from './financial-institution.model';

export class FinancialInstitutionModelService {
  public static resolve(financialInstitution: FinancialInstitution): Promise<FinancialInstitution | FinancialInstitutionModel> {
    if (financialInstitution._id) {
      return Promise.resolve(financialInstitution)
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

  public static getAll(): MongoosePromise<FinancialInstitutionModel[]> {
    return FinancialInstitutionModel
      .find();
  }
}
