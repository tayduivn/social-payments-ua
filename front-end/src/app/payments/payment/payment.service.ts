import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { PaymentModel } from '../shared/payment.model';

@Injectable()
export class PaymentService {

  constructor() { }

  public submitPayment(payment: PaymentModel): Observable<PaymentModel> {
    // return this.apollo.mutate<PaymentModel>({
    //   mutation: gql(require('webpack-graphql-loader!./submit-payment.graphql')),
    //   variables: {payment}
    // }).pipe(
    //   map((res: FetchResult<PaymentModel>) => res.data.submitPayment)
    // )
  }
}
