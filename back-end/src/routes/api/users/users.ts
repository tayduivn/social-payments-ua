import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import { Types } from "mongoose";
import { User } from '../../../../../api-contracts/user/user';
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

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const user = Object.assign({id: new Types.ObjectId()}, req.body);

  return UserModel
    .create(user)
    .then(
      () => res.end(),
      (err) => next(err)
    );
});

router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  UserModel.findByIdAndUpdate(req.params.id, req.body)
    .then(
      () => res.end(),
      (err) => next(err)
    );
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  UserModel.findByIdAndRemove(req.params.id)
    .then(
      () => res.end(),
      (err) => next(err)
    );
});

export const usersRouter = router;
