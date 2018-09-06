import { BorderStyle } from 'exceljs';
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
    .exec(function (err: any, result: any[]) {
      if (err) next(err);

      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet('My Sheet');

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");

      worksheet.mergeCells('A1', 'K1');
      const captionCell = worksheet.getCell('A1');
      captionCell.value= `Звіт платежів за період з ${startDate} по ${endDate}`;
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

      headerRow.height = 110;
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
        {key: 'date', width: 15},
        {key: 'account_number', width: 15},
        {key: 'bank_name', width: 15},
        {key: 'mfo', width: 15},
        {key: 'edrpou', width: 15},
        {key: 'sum', width: 15},
        {key: 'person', width: 15},
        {key: 'ident_code', width: 15},
        {key: 'passport_code', width: 15},
        {key: 'address', width: 15},
        {key: 'description', width: 25},
      ];

      const border = {
        top: {style: 'thin' as BorderStyle},
        left: {style: 'thin' as BorderStyle},
        bottom: {style: 'thin' as BorderStyle},
        right: {style: 'thin' as BorderStyle}
      };
      result.forEach((res) => {
        const row = worksheet.addRow({
          date: res.date,
          account_number: res.accountNumber,
          bank_name: res.financialInstitution.name,
          mfo: res.financialInstitution.mfo,
          edrpou: res.financialInstitution.edrpou,
          sum: res.sum,
          person: res.person.fullName,
          ident_code: res.person.identityCode,
          passport_code: res.person.passportNumber,
          address: res.person.address.street,
          description: res.description
        });

        row.eachCell((cell) => {
          cell.border = border;
        });
      });

      workbook.xlsx.write(res)
        .then(() => res.end());
    })
});

export const reportsRouter = router;