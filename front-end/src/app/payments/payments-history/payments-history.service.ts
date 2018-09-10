import { Injectable } from '@angular/core';
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { UserResponseModel } from '../../../../../api-contracts/user/user-response.model';

@Injectable()
export class PaymentsHistoryService {

  constructor() { }

  public getPayments(): Observable<UserResponseModel[]> {
    return this.apollo.watchQuery({
      query: readAllUsersQuery
    })
      .valueChanges
      .pipe(
        map((r: ApolloQueryResult<Users>) => r.data.users)
      );
  }

}
