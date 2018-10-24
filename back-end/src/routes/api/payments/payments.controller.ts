import {
  NextFunction,
  Request,
  Response
} from 'express';
import * as _ from 'lodash';
import moment from 'moment';
import { Types } from 'mongoose';
import { Payment } from '../../../../../api-contracts/payment/payment';
import { PaymentsFilter } from '../../../../../api-contracts/payment/payments-filter';
import { PaymentsLatest } from '../../../../../api-contracts/payment/payments-latest';
import { PaymentsLatestFilter } from '../../../../../api-contracts/payment/payments-latest-filter';
import { HttpError } from '../../../core/http-error';
import { PaymentModelService } from '../../../models/payment/payment.model.service';
import { ApiCommonController } from '../api-common.controller';

export class PaymentsController extends ApiCommonController {
  public static getByFilter(req: Request, res: Response, next: NextFunction): void {
    if (_.isEmpty(req.query)) {
      PaymentsController.sendBadRequest(next);
      return;
    }

    return PaymentModelService
      .find(PaymentsController.getSearchConditions(req.query as PaymentsFilter))
      .then(...super.promiseResponse<Payment[]>(res, next));
  }

  public static getLatest(req: Request, res: Response, next: NextFunction): void {
    const {skip, take} = req.query as PaymentsLatestFilter;

    if (_.isEmpty(req.query) || !skip || !take) {
      PaymentsController.sendBadRequest(next);
      return;
    }

    return PaymentModelService
      .latest(Number(skip), Number(take))
      .then(...super.promiseResponse<PaymentsLatest>(res, next));
  }

  public static create(req: Request, res: Response, next: NextFunction): void {
    PaymentModelService.create(req.body as Payment)
      .then(...super.promiseResponse<Payment>(res, next));
  }

  private static sendBadRequest(next: NextFunction) {
    const err = new HttpError('Missed request params');
    err.status = 400;

    return next(err);
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

    return _.omitBy(conditions, (item) => _.isEmpty(item));
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

    if (sumFrom) {
      Object.assign(searchConditions, {$gte: sumFrom});
    }

    if (sumTo) {
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

  private static getNestedSchemaFilter(filterToModelFields: Map<string, string>): { [field: string]: Object } {
    const searchConditions: { [field: string]: Object } = {};

    filterToModelFields.forEach((filterFieldVal, modelFieldName) => {
      if (!filterFieldVal) {
        return;
      }

      searchConditions[modelFieldName] = {$regex: filterFieldVal} as Object;
    });

    return searchConditions;
  }
}
