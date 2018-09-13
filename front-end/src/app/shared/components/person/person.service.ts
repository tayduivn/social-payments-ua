import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { Person } from '../../../../../../api-contracts/person/person';

@Injectable()
export class PersonService {

  constructor() { }

  public getList(): Observable<Person[]> {
    return Observable.of([]);
    // return this.apollo.watchQuery<Persons>({
    //   query: gql(require('webpack-graphql-loader!./persons.graphql'))
    // })
    //   .valueChanges
    //   .pipe(
    //     map((r: ApolloQueryResult<Persons>) => r.data.persons)
    //   )
  }
}
