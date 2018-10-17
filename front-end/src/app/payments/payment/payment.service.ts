import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Payment } from '../../../../../api-contracts/payment/payment';
import { environment } from '../../../environments/environment';

@Injectable()
export class PaymentService {
  constructor(private http: HttpClient) {}

  public submitPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${environment.dataQueries.apiEndpoint}/payments/`, payment);
  }
}
