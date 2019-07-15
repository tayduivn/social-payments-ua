import express, { NextFunction, Request, Response } from 'express';
import { PaymentModel } from '../../../models/payment/payment.model';
import { CommonReport } from '../common-report';
import moment from 'moment';
import { CipherReportQueryParams } from '../../../../../api-contracts/reports/cipher-report.query.params';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  const queryParams = req.query as CipherReportQueryParams;

  if (!queryParams.date ||
    !queryParams.codeKEK ||
    !queryParams.codeKFK ||
    !queryParams.reportNumber
  ) {
    const err: any = new Error('Missed or invalid startDate and/or endDate');
    err.status = 400;

    return next(err);
  }

  const date = moment(queryParams.date);

  return PaymentModel
    .find()
    .then((payments: PaymentModel[]) => CommonReport.form(payments, date, date, res),
      (err: any) => next(err));

});

export const cipherRouter = router;
