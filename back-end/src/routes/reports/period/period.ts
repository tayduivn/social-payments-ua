import * as Excel from 'exceljs';
import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import moment from 'moment';
import { PeriodReportQueryParams } from '../../../../../api-contracts/reports/period-report.query.params';
import { PaymentModel } from '../../../models/payment/payment.model';
import { CommonReport } from '../common-report';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  let {startDate, endDate} = req.query as PeriodReportQueryParams;

  if (!startDate || !endDate || !moment(startDate).isValid() || !moment(endDate).isValid()) {
    const err: any = new Error('Missed or invalid startDate and/or endDate');
    err.status = 400;

    next(err);
  }

  return PaymentModel
    .find()
    .where('date')
      // apply time unit correction for provided dates
      // works with moment but needs type correction "as any"
      .gte(moment(startDate).startOf('day') as any)
      .lte(moment(endDate).endOf('day') as any)
    .then((payments: PaymentModel[]) => CommonReport.form(payments, moment(startDate), moment(endDate), res),
    (err: any) => next(err));
});

export const periodRouter = router;
