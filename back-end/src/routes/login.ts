import bcrypt from 'bcryptjs';
import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import { sign } from 'jws';
import { LoginResponse } from '../../../api-contracts/login-response';
import { User } from '../../../api-contracts/user/user';
import { UserModel } from '../models/user/user.model';

const router = express.Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const {login, password} = req.body;
  const token = sign({
    header: {alg: 'HS256'},
    payload: new Date(),
    secret: login
  });
  const created = new Date();

  UserModel.findOneAndUpdate({login}, {token, created}, (err, user: User) => {
    if (user && bcrypt.compareSync(password, user.password)) {
      res.send(<LoginResponse> {
        authorized: true,
        token
      });
    } else {
      next(err || {status: 401} as any);
    }
  });
});

export const loginRouter = router;