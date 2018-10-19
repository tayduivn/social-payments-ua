import {
  NextFunction,
  Request,
  Response
} from 'express';
import { Types } from 'mongoose';
import { User } from '../../../../../api-contracts/user/user';
import { UserModel } from '../../../models/user/user.model';
import { ApiCommonController } from '../api-common.controller';

export class UsersController extends ApiCommonController {
  public static getAll(req: Request, res: Response, next: NextFunction) {
    return UserModel
      .find()
      .select('login fullName isAdmin')
      .then(...super.promiseResponse<User[]>(res, next));
  }

  public static create(req: Request, res: Response, next: NextFunction) {
    const user = Object.assign({_id: new Types.ObjectId()}, req.body);

    return UserModel
      .create(user)
      .then(...super.promiseEnd(res, next));
  }

  public static update(req: Request, res: Response, next: NextFunction) {
    UserModel.findByIdAndUpdate(req.params._id, req.body)
      .then(...super.promiseEnd(res, next));
  }

  public static delete(req: Request, res: Response, next: NextFunction) {
    UserModel.findByIdAndRemove(req.params._id)
      .then(...super.promiseEnd(res, next));
  }
}
