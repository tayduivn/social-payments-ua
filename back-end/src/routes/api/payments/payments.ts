import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import { Payment } from '../../../../../api-contracts/payment/payment';
import { PaymentsFilter } from '../../../../../api-contracts/payment/payments-filter';
import { PaymentsController } from './payments.controller';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  PaymentsController.getList(req.query as PaymentsFilter)
    .then(
      (payments: Payment[]) => res.send(payments),
      (err) => next(err)
    );
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  PaymentsController.submit(req.body as Payment)
    .then(
      (responsePayment: Payment) => res.send(responsePayment),
      (err: any) => next(err)
    );
});

export const paymentsRouter = router;