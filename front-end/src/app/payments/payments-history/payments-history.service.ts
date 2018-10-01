import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Payment } from '../../../../../api-contracts/payment/payment';
import { PaymentsFilter } from '../../../../../api-contracts/payment/payments-filter';
import { apiEndpoint } from '../../shared/constants/api-endpoint';

@Injectable()
export class PaymentsHistoryService {
  public readonly paymentsHistoryStatusDescription$: Observable<string>;
  public readonly paymentsData$: Observable<Payment[]>;

  private readonly requestUrl = `${apiEndpoint}/payments/`;

  private statusDescriptionSubject = new BehaviorSubject('Вкажіть параметри пошуку');
  private paymentsDataSubject = new BehaviorSubject<Payment[]>([]);

  constructor(private http: HttpClient) {
    this.paymentsHistoryStatusDescription$ = this.statusDescriptionSubject.asObservable();
    this.paymentsData$ = this.paymentsDataSubject.asObservable();
  }

  public requestPayments(filter: PaymentsFilter): void {
    // cleanup empty fields
    const fromObject: any = _.omitBy(filter as any, (item) => {
      return _.isNil(item) || !item.toString().trim()
    });

    const options = {
      params: new HttpParams({fromObject})
    };

    this.http.get<Payment[]>(this.requestUrl, options).subscribe();
  }
}
