import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { PersonModel } from './person.model';

@Injectable()
export class PersonService {

  constructor() { }

  public getList(): Observable<PersonModel[]> {
    // return this.apollo.watchQuery<Persons>({
    //   query: gql(require('webpack-graphql-loader!./persons.graphql'))
    // })
    //   .valueChanges
    //   .pipe(
    //     map((r: ApolloQueryResult<Persons>) => r.data.persons)
    //   )
  }
}
