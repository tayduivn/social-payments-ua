import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PersonAccounts } from '../../../../../../api-contracts/person-accounts/person-accounts';

@Injectable()
export class PersonAccountsService {
  constructor() { }

  public getPersonAccounts() { //: Observable<PersonAccounts[]> {
    // return this.apollo.watchQuery<PersonAccountsList>({
    //   query: personAccountsQuery
    // })
    //   .valueChanges
    //   .pipe(
    //     map((r: ApolloQueryResult<PersonAccountsList>) => r.data.personAccounts)
    //   )
  }

  public getById(id: string) { //: Observable<PersonAccounts | undefined> {
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
