import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import { User } from '../../../../../api-contracts/user/user';
import { UserModel } from '../../../models/user/user.model';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  UserModel
    .find()
    .select('login fullName isAdmin')
    .exec((err: any, users: User[]) => {
      if (err) next(err);

      res.send(users);
    });
});

export const usersRouter = router;
