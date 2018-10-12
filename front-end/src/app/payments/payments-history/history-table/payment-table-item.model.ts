import * as _ from 'lodash';
import * as moment from 'moment';
import { Payment } from '../../../../../../api-contracts/payment/payment';
import { displayDateFormat } from '../../../shared/constants/date-formats';

export class PaymentTableItemModel {
  public date: string;
  public account: string;
  public orgName: string;
  public mfo: string;
  public edrpou: string;
  public sum: number;
  public fullName: string;
  public identityCode: string;
  public passport: string;
  public address: string;
  public description: string;

  constructor(private payment: Payment) {
    this.init();
  }

  private init() {
    const item = this.payment;

    this.date = moment(item.date).format(displayDateFormat);
    this.account = item.accountNumber;

    this.orgName = item.financialInstitution.name;
    this.mfo = item.financialInstitution.mfo;
    this.edrpou = item.financialInstitution.edrpou;

    this.sum = item.sum;

    this.fullName = item.person.fullName;
    this.identityCode = item.person.identityCode;
    this.passport = item.person.passportNumber;
    this.address = this.getPersonAddress();

    this.description = item.description;
  }

  private getPersonAddress(): string {
    const address = this.payment.person.address;

    if (!address) {
      return '';
    }

    const result: string[] = [];

    result.push(address.street ? address.street.name : null);
    result.push(address.house);

    if (address.houseSection) {
      result.push(`корп. ${address.houseSection}`)
    }

    if (address.apartment) {
      result.push(`кв. ${address.apartment}`);
    }

    return _.compact(result).join(', ');
  }
}
