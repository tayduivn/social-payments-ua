import {
  NextFunction,
  Request,
  Response
} from 'express';
import { FinancialInstitutionModel } from '../../../models/financial-institution/financial-institution.model';
import { ApiCommonController } from '../api-common.controller';

export class FinancialInstitutionsController extends ApiCommonController {
  public static getAll(req: Request, res: Response, next: NextFunction): void {
    FinancialInstitutionModel
      .find()
      .then(...super.promiseResponse<FinancialInstitutionModel[]>(res, next));
  }
}