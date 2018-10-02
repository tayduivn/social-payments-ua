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

@Injectable()
export class PaymentsHistoryService {
  private readonly requestUrl = `${apiEndpoint}/payments/`;

  constructor(private http: HttpClient) {}

  public requestPayments(filter: PaymentsFilter): Observable<Payment[]> {
    // cleanup empty fields
    const fromObject: any = _.omitBy(filter as any, (item) => {
      return _.isNil(item) || !item.toString().trim()
    });

    const options = {
      params: new HttpParams({fromObject})
    };

    return this.http.get<Payment[]>(this.requestUrl, options);
  }
}
