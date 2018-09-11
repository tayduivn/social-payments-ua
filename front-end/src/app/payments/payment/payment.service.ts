import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { FetchResult } from 'apollo-link';
import { PaymentModel } from '../shared/payment.model';

@Injectable()
export class PaymentService {

  constructor(private apollo: Apollo) { }

  public submitPayment(payment: PaymentModel): Observable<PaymentModel> {
    return this.apollo.mutate<PaymentModel>({
      mutation: gql(require('webpack-graphql-loader!./submit-payment.graphql')),
      variables: {payment}
    }).pipe(
      map((res: FetchResult<PaymentModel>) => res.data.submitPayment)
    )
  }
}
