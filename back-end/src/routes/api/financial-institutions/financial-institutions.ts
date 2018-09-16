import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import { Payment } from '../../../../../api-contracts/payment/payment';
import { PaymentModel } from '../../../models/payment/payment.model';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  return PaymentModel
    .find()
    .then(
      (payments: Payment[]) => res.send(payments),
      (err) => next(err)
    );
});

export const financialInstitutionsRouter = router;
