import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import * as _ from 'lodash';
import moment from 'moment';
import { FinancialInstitution } from '../../../../../api-contracts/financial-institution/financial.institution';
import { Payment } from '../../../../../api-contracts/payment/payment';
import { PaymentsFilter } from '../../../../../api-contracts/payment/payments-filter';
import { Person } from '../../../../../api-contracts/person/person';
import { checkAndUpdate as fiCheckAndUpdate } from '../../../models/financial-institution/check-and-update';
import { PaymentModel } from '../../../models/payment/payment.model';
import { checkAndUpdate as personAccountsCheckAndUpdate } from '../../../models/person-accounts/check-and-update';
import { checkAndUpdate as personCheckAndUpdate } from '../../../models/person/check-and-update';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  const {dateFrom, dateTo, sumFrom, sumTo, searchPhrase} = req.query as PaymentsFilter;
  const conditions: any = {
    date: {},
    sum: {}
  };

  if (dateFrom && moment(dateFrom).isValid()) {
    Object.assign(conditions.date, {$gte: moment(dateFrom).startOf('day') as any});
  }

  if (dateTo && moment(dateTo).isValid()) {
    Object.assign(conditions.date, {$lte: moment(dateTo).endOf('day') as any});
  }

  if(sumFrom) {
    Object.assign(conditions.sum, {$gte: sumFrom});
  }

  if(sumTo) {
    Object.assign(conditions.sum, {$lte: sumTo});
  }

  if (searchPhrase) {
    conditions.$text = {
      $search: searchPhrase,
      $language: 'none'
    };
  }

  return PaymentModel
    .find(_.omitBy(conditions, (item) => _.isEmpty(item)))
    .sort('-date')
    .then(
      (payments: Payment[]) => res.send(payments),
      (err) => next(err)
    );
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const payment: Payment = req.body;
  let financialInstitution: FinancialInstitution;
  let person: Person;

  fiCheckAndUpdate(payment.financialInstitution)
    .then((financialInstitutionResponse) => {
      financialInstitution = financialInstitutionResponse;
      return personCheckAndUpdate(payment.person)
    })
    .then((personResponse) => {
      person = personResponse;
      return personAccountsCheckAndUpdate({
        personId: person._id,
        financialInstitutionId: financialInstitution._id,
        account: payment.accountNumber
      });
    })
    .then(() => {
      delete payment._id;
      return PaymentModel.create(payment);
    })
    .then(
      (payment: PaymentModel) => {
        const responsePayment = payment.toObject();
        responsePayment.financialInstitution = financialInstitution;
        responsePayment.person = person;

        res.send(responsePayment);
      },
      (err: any) => next(err)
    );
});

export const paymentsRouter = router;