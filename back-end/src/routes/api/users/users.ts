import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import { Types } from "mongoose";
import { User } from '../../../../../api-contracts/user/user';
import { AppRequest } from '../../../app-request';
import { UserModel } from '../../../models/user/user.model';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  return UserModel
    .find()
    .select('login fullName isAdmin')
    .then(
      (users: User[]) => res.send(users),
      (err) => next(err)
    );
});

router.post('/', (req: AppRequest, res: Response, next: NextFunction) => {
  const user = Object.assign({_id: new Types.ObjectId()}, req.body);

  return UserModel
    .create(user)
    .then(...req.apiHelpers.promiseResolver)
});

router.put('/:id', (req: AppRequest, res: Response, next: NextFunction) => {
  UserModel.findByIdAndUpdate(req.params._id, req.body)
    .then(...req.apiHelpers.promiseResolver);
});

router.delete('/:id', (req: AppRequest, res: Response, next: NextFunction) => {
  UserModel.findByIdAndRemove(req.params._id)
    .then(...req.apiHelpers.promiseResolver);
});

export const usersRouter = router;
