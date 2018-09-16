import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Payment } from '../../../../../api-contracts/payment/payment';

@Injectable()
export class PaymentService {

  constructor() { }

  public submitPayment(payment: Payment): Observable<Payment> {
    return Observable.of({}) as any;
    // return this.apollo.mutate<PaymentModel>({
    //   mutation: gql(require('webpack-graphql-loader!./submit-payment.graphql')),
    //   variables: {payment}
    // }).pipe(
    //   map((res: FetchResult<PaymentModel>) => res.data.submitPayment)
    // )
  }
}
