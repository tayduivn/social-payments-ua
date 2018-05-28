import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { FetchResult } from '../../../../../back-end/node_modules/apollo-link/lib';
import { PaymentModel } from './payment.model';
import { PersonAccountsModel } from './person-accounts.model';

interface PersonAccountsList {
  personAccounts: PersonAccountsModel[]
}

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

  public getPersonAccounts(): Observable<PersonAccountsModel[]> {
    return this.apollo.watchQuery<PersonAccountsList>({
      query: gql(require('webpack-graphql-loader!./person-accounts.graphql'))
    })
      .valueChanges
      .pipe(
        map((r: ApolloQueryResult<PersonAccountsList>) => r.data.personAccounts)
      )
  }
}
