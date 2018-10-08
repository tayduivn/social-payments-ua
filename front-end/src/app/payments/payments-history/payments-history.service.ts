import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Payment } from '../../../../../api-contracts/payment/payment';
import { PaymentsFilter } from '../../../../../api-contracts/payment/payments-filter';
import { apiEndpoint } from '../../shared/constants/api-endpoint';
import { HistoryFilterModel } from './shared/history-filter.model';

@Injectable()
export class PaymentsHistoryService {
  private readonly requestUrl = `${apiEndpoint}/payments/`;

  constructor(private http: HttpClient) {}

  public requestPayments(filter: HistoryFilterModel): Observable<Payment[]> {
    const options = {
      params: new HttpParams({fromObject: this.prepareRequestParams(filter)})
    };

    return this.http.get<Payment[]>(this.requestUrl, options);
  }

  private static assignObjectPrefixedFields(prefix: string, rootObj: {[key: string]: string}): void {
    const obj = rootObj[prefix];

    Object.keys(obj).forEach((key: string) => {
      if (key === '_id') {
        rootObj[`${prefix}Id`] = obj[key];
      } else {
        rootObj[`${prefix}${_.upperFirst(key)}`] = obj[key];
      }
    });
  }

  private prepareRequestParams(filter: HistoryFilterModel): PaymentsFilter {
    // get primitive not empty fields
    const result = Object.assign({}, filter);

    // assign inserted object to plain fields of root object
    PaymentsHistoryService.assignObjectPrefixedFields('person', result);
    PaymentsHistoryService.assignObjectPrefixedFields('financialInstitution', result);

    // cleanup non primitive fields
    delete result.person;
    delete result.financialInstitution;

    return this.clearObject(result);
  }

  private clearObject(obj: any): {[key: string]: string} {
    return _.omitBy(obj as any, (item) => {
      return _.isNil(item) || !item.toString().trim()
    });
  }
}
