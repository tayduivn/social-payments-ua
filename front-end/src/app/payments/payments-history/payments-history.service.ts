import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Payment } from '../../../../../api-contracts/payment/payment';

@Injectable()
export class PaymentsHistoryService {

  constructor() { }

  public getPayments(): Observable<Payment[]> {
  }

}
