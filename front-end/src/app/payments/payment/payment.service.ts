import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../../../../../api-contracts/payment/payment';
import { apiEndpoint } from '../../shared/constants/api-endpoint';

@Injectable()
export class PaymentService {
  constructor(private http: HttpClient) {}

  public submitPayment(payment: Payment): void {
    this.http.post(`${apiEndpoint}/payments/`, payment)
      .subscribe((res: any) => {
        // debugger;
      });
  }
}
