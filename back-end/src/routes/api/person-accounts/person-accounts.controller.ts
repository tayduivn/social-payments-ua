import {
  NextFunction,
  Request,
  Response
} from 'express';
import { PersonAccounts } from '../../../../../api-contracts/person-accounts/person-accounts';
import { PersonAccountsModel } from '../../../models/person-accounts/person-accounts.model';
import { ApiCommonController } from '../api-common.controller';

export class PersonAccountsController extends ApiCommonController {
  public static getAll(req: Request, res: Response, next: NextFunction): void {
    PersonAccountsModel
      .find()
      .then(...super.promiseResponse<PersonAccounts[]>(res, next));
  }
}
