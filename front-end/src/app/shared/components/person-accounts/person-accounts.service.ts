import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {PersonAccountsModel} from './person-accounts.model';

@Injectable()
export class PersonAccountsService {
  constructor() { }

  public getPersonAccounts(): Observable<PersonAccountsModel[]> {
    // return this.apollo.watchQuery<PersonAccountsList>({
    //   query: personAccountsQuery
    // })
    //   .valueChanges
    //   .pipe(
    //     map((r: ApolloQueryResult<PersonAccountsList>) => r.data.personAccounts)
    //   )
  }

  public getById(id: string): Observable<PersonAccountsModel | undefined> {
    // return this.apollo.query({
    //   query: personAccountsQuery
    // })
    //   .pipe(
    //     map((r: ApolloQueryResult<PersonAccountsList>) => r.data.personAccounts.find((item: PersonAccountsModel) => {
    //       return item.person === id;
    //     }))
    //   )
  }
}
