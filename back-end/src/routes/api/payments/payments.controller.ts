import * as _ from 'lodash';
import moment from 'moment';
import { Types } from 'mongoose';
import { FinancialInstitution } from '../../../../../api-contracts/financial-institution/financial.institution';
import { Payment } from '../../../../../api-contracts/payment/payment';
import { PaymentsFilter } from '../../../../../api-contracts/payment/payments-filter';
import { Person } from '../../../../../api-contracts/person/person';
import { Street } from '../../../../../api-contracts/street/street';
import { checkAndUpdate as fiCheckAndUpdate } from '../../../models/financial-institution/check-and-update';
import { PaymentModel } from '../../../models/payment/payment.model';
import { checkAndUpdate as personAccountsCheckAndUpdate } from '../../../models/person-accounts/check-and-update';
import { checkAndUpdate as personCheckAndUpdate } from '../../../models/person/check-and-update';
import { MongoosePromise } from '../../mongoose-promise';
import { checkAndUpdate as streetCheckAndUpdate } from '../../../models/street/check-and-update';

export class PaymentsController {
  public static getList(filter: PaymentsFilter): MongoosePromise<Payment[]> {
    return PaymentModel
      .find(PaymentsController.getSearchConditions(filter))
      .sort('-date');
  }

  public static submit(payment: Payment): Promise<Payment> {
    let financialInstitution: FinancialInstitution;
    let person: Person;

    return fiCheckAndUpdate(payment.financialInstitution)
      .then((financialInstitutionResponse) => {
        financialInstitution = financialInstitutionResponse;
        return streetCheckAndUpdate(payment.person.address.street);
      })
      .then((str: Street) => {
        payment.person.address.street = str;
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
        payment.financialInstitution = financialInstitution;
        payment.person._id = person._id;
        delete payment._id;

        return PaymentModel.create(payment);
      });
  }

  private static getSearchConditions(filter: PaymentsFilter): Object {
    const conditions: any = {
      date: PaymentsController.getDatesRangeFilter(filter.dateFrom, filter.dateTo),
      sum: PaymentsController.getSumRangeFilter(filter.sumFrom, filter.sumTo),
      description: PaymentsController.getDescriptionFilter(filter.description)
    };

    if (filter.personId) {
      conditions['person._id'] = Types.ObjectId.createFromHexString(filter.personId);
    } else {
      Object.assign(conditions, PaymentsController.getNestedSchemaFilter(new Map([
        ['person.fullName', filter.personFullName],
        ['person.passportNumber', filter.personPassportNumber],
        ['person.identityCode', filter.personIdentityCode]
      ])));
    }

    if (filter.financialInstitutionId) {
      conditions['financialInstitution._id'] = Types.ObjectId.createFromHexString(filter.financialInstitutionId);
    } else {
      Object.assign(conditions, PaymentsController.getNestedSchemaFilter(new Map([
        ['financialInstitution.name', filter.financialInstitutionName],
        ['financialInstitution.mfo', filter.financialInstitutionMfo],
        ['financialInstitution.edrpou', filter.financialInstitutionEdrpou]
      ])));
    }

    return _.omitBy(conditions, (item) => _.isEmpty(item))
  }

  private static getDatesRangeFilter(dateFrom: string, dateTo: string): Object {
    const searchConditions = {};

    if (dateFrom && moment(dateFrom).isValid()) {
      Object.assign(searchConditions, {$gte: moment(dateFrom).startOf('day') as any});
    }

    if (dateTo && moment(dateTo).isValid()) {
      Object.assign(searchConditions, {$lte: moment(dateTo).endOf('day') as any});
    }

    return searchConditions;
  }

  private static getSumRangeFilter(sumFrom: number, sumTo: number): Object {
    const searchConditions = {};

    if(sumFrom) {
      Object.assign(searchConditions, {$gte: sumFrom});
    }

    if(sumTo) {
      Object.assign(searchConditions, {$lte: sumTo});
    }

    return searchConditions;
  }

  private static getDescriptionFilter(description: string): Object {
    if (!description) {
      return null;
    } else {
      return {
        $search: description,
        $language: 'none'
      };
    }
  }

  private static getNestedSchemaFilter(filterToModelFields: Map<string, string>): {[field: string]: Object} {
    const searchConditions: {[field: string]: Object} = {};

    filterToModelFields.forEach((filterFieldVal, modelFieldName) => {
      if (!filterFieldVal) {
        return;
      }

      searchConditions[modelFieldName] = {$regex: filterFieldVal} as Object
    });

    return searchConditions;
  }
}