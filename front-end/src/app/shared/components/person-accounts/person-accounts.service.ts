import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { PersonAccountsModel } from './person-accounts.model';

interface PersonAccountsList {
  personAccounts: PersonAccountsModel[]
}

@Injectable()
export class PersonAccountsService {

  constructor(private apollo: Apollo) { }

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
