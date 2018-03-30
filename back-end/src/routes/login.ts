import bcrypt from 'bcryptjs';
import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import { sign } from 'jws';
import { LoginResponse } from '../../../api-contracts/auth/login-response';
import { UserModel } from '../core/user/user.model';

const router = express.Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  const {login, password} = req.body;
  const token = sign({
    header: {alg: 'HS256'},
    payload: new Date(),
    secret: login
  });

  UserModel.findOneAndUpdate({login}, {token}, (err, user: UserModel) => {
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