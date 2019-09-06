import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Payment } from '../../../../../api-contracts/payment/payment';
import { environment } from '../../../environments/environment';
import { apiDateFormat } from '../../shared/constants/date-formats';
import * as moment from 'moment';

@Injectable()
export class PaymentService {
  constructor(private http: HttpClient) {}

  public getPayment(id: string): Observable<Payment> {
    return this.http.get<Payment>(`${environment.dataQueries.apiEndpoint}/payments/${id}`);
  }

  public submitPayment(payment: Payment): Observable<Payment> {
    payment.date = moment(payment.date).format(apiDateFormat);
    return this.http.post<Payment>(`${environment.dataQueries.apiEndpoint}/payments/`, payment);
  }
}
