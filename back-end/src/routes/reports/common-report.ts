import { PaymentModel } from '../../models/payment/payment.model';
import * as Excel from 'exceljs';
import moment from 'moment';
import { Moment } from 'moment';
import { BorderStyle } from 'exceljs';
import * as _ from 'lodash';
import { Response } from 'express';

export class CommonReport {
  public static form(payments: PaymentModel[], startDate: Moment, endDate: Moment, res: Response) {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('My Sheet');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=' + 'Report.xlsx');

    worksheet.mergeCells('A1', 'K1');
    const dateFormat = 'DD-MM-YYYY';
    const captionCell = worksheet.getCell('A1');
    captionCell.value = `Звіт платежів за період з ${moment(startDate).format(dateFormat)} по ${moment(endDate).format(dateFormat)}`;
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

    const addressHelper = (address: any): string => {
      if (!address) {
        return '';
      }

      const result: string[] = [];

      result.push(address.street ? `вул. ${address.street.name}` : null);
      result.push(address.house);

      if (address.houseSection) {
        result.push(`корп. ${address.houseSection}`)
      }

      if (address.apartment) {
        result.push(`кв. ${address.apartment}`);
      }

      return _.compact(result).join(', ');
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
        address: addressHelper(payment.person.address),
        description: payment.description
      });

      row.eachCell((cell) => {
        cell.border = border;
      });
    });

    workbook.xlsx.write(res);
    return res;
  }
}
