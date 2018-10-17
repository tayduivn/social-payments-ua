import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Payment } from '../../../../../api-contracts/payment/payment';
import { apiEndpoint } from '../../shared/constants/endpoints';

@Injectable()
export class PaymentService {
  constructor(private http: HttpClient) {}

  public submitPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${apiEndpoint}/payments/`, payment);
  }
}
