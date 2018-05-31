import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { FetchResult } from '../../../../../back-end/node_modules/apollo-link/lib';
import { PaymentModel } from './payment.model';

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
