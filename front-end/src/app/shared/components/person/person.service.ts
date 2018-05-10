import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { PersonModel } from './person.model';

interface Persons {
  persons: PersonModel[]
}


@Injectable()
export class PersonService {

  constructor(private apollo: Apollo) { }

  public getList(): Observable<PersonModel[]> {
    return this.apollo.watchQuery<Persons>({
      query: gql(require('webpack-graphql-loader!./persons.graphql'))
    })
      .valueChanges
      .pipe(
        map((r: ApolloQueryResult<Persons>) => r.data.persons)
      )
  }
}
