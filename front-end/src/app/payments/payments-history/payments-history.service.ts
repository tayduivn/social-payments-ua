import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Payment } from '../../../../../api-contracts/payment/payment';
import { apiEndpoint } from '../../shared/constants/api-endpoint';

@Injectable()
export class PaymentsHistoryService {
  private readonly requestUrl = `${apiEndpoint}/payments/`;

  constructor(private http: HttpClient) {}

  public getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.requestUrl);
  }

}
