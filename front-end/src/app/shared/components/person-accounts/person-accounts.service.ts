import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import {
  filter,
  map
} from 'rxjs/operators';
import { FinancialInstitutionModel } from '../financial-institution/financial-institution.model';
import { PersonAccountsModel } from './person-accounts.model';

const personAccountsQuery = gql(require('webpack-graphql-loader!./person-accounts.graphql'));

interface PersonAccountsList {
  personAccounts: PersonAccountsModel[]
}

@Injectable()
export class PersonAccountsService {
  constructor(private apollo: Apollo) { }

  public getPersonAccounts(): Observable<PersonAccountsModel[]> {
    return this.apollo.watchQuery<PersonAccountsList>({
      query: personAccountsQuery
    })
      .valueChanges
      .pipe(
        map((r: ApolloQueryResult<PersonAccountsList>) => r.data.personAccounts)
      )
  }

  public getById(id: string): Observable<PersonAccountsModel | undefined> {
    return this.apollo.query({
      query: personAccountsQuery
    })
      .pipe(
        map((r: ApolloQueryResult<PersonAccountsList>) => r.data.personAccounts.find((item: PersonAccountsModel) => {
          return item.person === id;
        }))
      )
  }
}
