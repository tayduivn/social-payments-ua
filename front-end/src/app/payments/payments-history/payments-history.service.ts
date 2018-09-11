import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { PaymentModel } from '../shared/payment.model';

interface Payments {
  payments: PaymentModel[]
}

const paymentsHistoryQuery = gql(require('webpack-graphql-loader!./payments-history.graphql'));

@Injectable()
export class PaymentsHistoryService {

  constructor(private apollo: Apollo) { }

  public getPayments(): Observable<PaymentModel[]> {
    return this.apollo.watchQuery<Payments>({
      query: paymentsHistoryQuery
    })
      .valueChanges
      .pipe(
        map((r: ApolloQueryResult<Payments>) => r.data.payments)
      );
  }

}
