import { BorderStyle } from 'exceljs';
import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import moment from 'moment';
import * as Excel from 'exceljs';
import { start } from 'repl';
import { PeriodReportQueryParams } from '../../../../../api-contracts/reports/period-report.query.params';
import { PaymentModel } from '../../../models/payment/payment.model';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  const {startDate, endDate} = req.query as PeriodReportQueryParams;

  if (!startDate || !endDate) {
    const err: any = new Error('requires startDate and endDate query params');
    err.status = 400;
    next(err);
  }

  if (!moment(startDate).isValid() || !moment(endDate).isValid()) {
    const err: any = new Error('requires valid! startDate and endDate query params');
    err.status = 400;

    next(err);
  }

  return PaymentModel
    .find()
    .where('date')
      // works with moment but needs type correction
      .gte(moment(startDate).startOf('day') as any)
      .lte(moment(endDate).endOf('day') as any)
    .then((payments: PaymentModel[]) => {
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet('My Sheet');

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");

      worksheet.mergeCells('A1', 'K1');
      const dateFormat = 'DD-MM-YYYY';
      const captionCell = worksheet.getCell('A1');
      captionCell.value= `Звіт платежів за період з ${moment(startDate).format(dateFormat)} по ${moment(endDate).format(dateFormat)}`;
      captionCell.alignment = {
        vertical: 'middle',
        horizontal: 'center'
      };
      worksheet.getRow(1).height = 50;

      const headerRow = worksheet.getRow(2);
      headerRow.values = [
        'Дата виплати',
        'Номер особового рахунку',
        'Найменування банку одержувача соціальних виплат',
        'Код МФО банку одержувача соціальних виплат',
        'Код згідно ЄДРПОУ банку одержувача соціальних виплат',
        'Сума соціальних виплат, гривень',
        'Прізвище, ім\'я, по батькові одержувача соціальних виплат',
        'Ідентифікаціний код одержувача соціальних виплат',
        'Серія та номер паспорта одержувача соціальних виплат',
        'Адреса реєстрації одержувача соціальних виплат',
        'Призначення платежу'
      ];

      headerRow.height = 120;
      headerRow.eachCell((cell) => {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
          wrapText: true
        };

        cell.border = {
          top: {style: 'medium' as BorderStyle},
          left: {style: 'medium' as BorderStyle},
          bottom: {style: 'medium' as BorderStyle},
          right: {style: 'medium' as BorderStyle}
        }
      });

      worksheet.columns = [
        {key: 'date', width: 14},
        {key: 'account_number', width: 20},
        {key: 'bank_name', width: 20},
        {key: 'mfo', width: 15},
        {key: 'edrpou', width: 15},
        {key: 'sum', width: 15},
        {key: 'person', width: 30},
        {key: 'ident_code', width: 20},
        {key: 'passport_code', width: 15},
        {key: 'address', width: 20},
        {key: 'description', width: 25},
      ];

      const border = {
        top: {style: 'thin' as BorderStyle},
        left: {style: 'thin' as BorderStyle},
        bottom: {style: 'thin' as BorderStyle},
        right: {style: 'thin' as BorderStyle}
      };

      payments.forEach((payment: PaymentModel) => {
        const row = worksheet.addRow({
          date: moment(payment.date).format(dateFormat),
          account_number: payment.accountNumber,
          bank_name: payment.financialInstitution.name,
          mfo: payment.financialInstitution.mfo,
          edrpou: payment.financialInstitution.edrpou,
          sum: payment.sum,
          person: payment.person.fullName,
          ident_code: payment.person.identityCode,
          passport_code: payment.person.passportNumber,
          address: payment.person.address.street,
          description: payment.description
        });

        row.eachCell((cell) => {
          cell.border = border;
        });
      });

      workbook.xlsx.write(res);
      return res;
    },
    (err: any) => next(err));
});

export const periodRouter = router;