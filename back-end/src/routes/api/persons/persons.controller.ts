import {
  NextFunction,
  Request,
  Response
} from 'express';
import { Person } from '../../../../../api-contracts/person/person';
import { PersonModel } from '../../../models/person/person.model';
import { ApiCommonController } from '../api-common.controller';

export class PersonsController extends ApiCommonController {
  public static getAll(req: Request, res: Response, next: NextFunction): void {
    PersonModel
      .find()
      .populate('address.street')
      .then(...super.promiseResponse<Person[]>(res, next));
  }
}
