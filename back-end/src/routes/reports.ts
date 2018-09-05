import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import moment from 'moment';
import * as Excel from 'exceljs';
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
    .exec(function (err: any, result: PaymentModel[]) {
      if (err) next(err);

      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet('My Sheet');

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");

      worksheet.columns = [
        {header: 'Дата платежу', key: 'date', width: 15},
        {header: 'Призначення платежу', key: 'accountNumber', width: 25},
        {header: 'Номер рахунку', key: 'description', width: 20}
      ];

      result.forEach((res: PaymentModel) => {
        worksheet.addRow(({
          date: res.date,
          accountNumber: res.accountNumber,
          description: res.description
        }));
      });

      workbook.xlsx.write(res)
        .then(() => res.end());
    })
});

export const reportsRouter = router;