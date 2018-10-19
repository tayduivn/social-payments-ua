import {
  NextFunction,
  Request,
  Response
} from 'express';
import { Street } from '../../../../../api-contracts/street/street';
import { StreetModel } from '../../../models/street/street.model';
import { ApiCommonController } from '../api-common.controller';

export class StreetsController extends ApiCommonController {
  public static getAll(req: Request, res: Response, next: NextFunction): void {
    StreetModel
      .find()
      .sort('name')
      .then(...super.promiseResponse<Street[]>(res, next));
  }
}
