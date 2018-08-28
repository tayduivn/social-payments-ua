import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import moment from 'moment';
import { PaymentModel } from '../models/payment/payment.model';

const router = express.Router();

router.get('/period', (req: Request, res: Response, next: NextFunction) => {
  const {startDate, endDate} = req.query;

  if (!startDate || !endDate) {
    const err: any = new Error('requires startDate and endDate query params');
    err.status = 400;

    throw err;
  } else if (!moment(startDate).isValid() || !moment(endDate).isValid()) {
    const err: any = new Error('requires valid! startDate and endDate query params');
    err.status = 400;

    throw err;
  }

  PaymentModel
    .find()
    .where('date').gt(startDate).lt(endDate)
    .exec(function (err: any, result: any) {
      if (err) next(err);

      res.send(result);
    })
});

export const reportsRouter = router;