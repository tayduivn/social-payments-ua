import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { PaymentModel } from '../shared/payment.model';

@Injectable()
export class PaymentsHistoryService {

  constructor() { }

  public getPayments(): Observable<PaymentModel[]> {
    // return this.apollo.watchQuery<Payments>({
    //   query: paymentsHistoryQuery
    // })
    //   .valueChanges
    //   .pipe(
    //     map((r: ApolloQueryResult<Payments>) => r.data.payments)
    //   );
  }

}
