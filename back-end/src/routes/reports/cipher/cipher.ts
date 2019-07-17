import express, { NextFunction, Request, Response } from 'express';
import { PaymentModel } from '../../../models/payment/payment.model';
import { CommonReport } from '../common-report';
import moment from 'moment';
import { CipherReportQueryParams } from '../../../../../api-contracts/reports/cipher-report.query.params';

const router = express.Router();

const getFileName = (date: string): string => `period-report_${date}.xlsx`;

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const {date, codeKEK, codeKFK, reportNumber, filename} = req.query as CipherReportQueryParams;

  if (!date ||
    !codeKEK ||
    !codeKFK ||
    !reportNumber
  ) {
    const err: any = new Error('Missed or invalid startDate and/or endDate');
    err.status = 400;

    return next(err);
  }

  if (filename) {
    res.send({filename: getFileName(date)});
  }

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=${getFileName(date)}`);

  try {
    const payments = await PaymentModel
      .find({
        date: {
          $gte: moment(date).startOf('day'),
          $lte: moment(date).endOf('day')
        },
        codeKFK: codeKFK,
        codeKEK: codeKEK
      });

    const xls = CommonReport.form(payments, moment(date), moment(date));
    await xls.write(res);
  } catch (err) {
    next(err);
  }
});

export const cipherRouter = router;
