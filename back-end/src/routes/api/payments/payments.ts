import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import {
  Document,
  Types
} from 'mongoose';
import { Payment } from '../../../../../api-contracts/payment/payment';
import { checkAndUpdate as fiCheckAndUpdate } from '../../../models/financial-institution/check-and-update';
import { PaymentModel } from '../../../models/payment/payment.model';
import { checkAndUpdate as personAccountsCheckAndUpdate } from '../../../models/person-accounts/check-and-update';
import { checkAndUpdate as personCheckAndUpdate } from '../../../models/person/check-and-update';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  return PaymentModel
    .find()
    .then(
      (payments: Payment[]) => res.send(payments),
      (err) => next(err)
    );
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const payment: Payment = req.body;
  let financialInstitution: any;
  let person: any;

  fiCheckAndUpdate(payment.financialInstitution)
    .then((fi) => {
      financialInstitution = fi;
      return personCheckAndUpdate(payment.person)
    })
    .then((prsn) => {
      person = prsn;
      return personAccountsCheckAndUpdate({
        personId: person._id,
        financialInstitutionId: financialInstitution._id,
        account: payment.accountNumber
      });
    })
    .then(() => {
      delete payment._id;
      PaymentModel.create(payment)
        .then(
          (payment: PaymentModel) => {
            const responsePayment = payment.toObject();
            responsePayment.financialInstitution = financialInstitution;
            responsePayment.person = person;

            res.send(responsePayment);
          }
        );
    },
    (err: any) => next(err));
});

export const paymentsRouter = router;