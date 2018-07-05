import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { FinancialInstitutionModel } from './financial-institution.model';

interface FinancialInstitutions {
  financialInstitutions: FinancialInstitutionModel[]
}

const listQuery = gql(require('webpack-graphql-loader!./financial-institutions.graphql'));
const fieldsFragment = gql(require('webpack-graphql-loader!./financial-institution.fragment.graphql'));
const typeName = fieldsFragment.definitions.find(i => i.kind === 'FragmentDefinition').typeCondition.name.value;

@Injectable()
export class FinancialInstitutionService {

  constructor(private apollo: Apollo) { }

  public getList(): Observable<FinancialInstitutionModel[]> {
    return this.apollo.watchQuery<FinancialInstitutions>({
      query: listQuery,
    })
      .valueChanges
      .pipe(
        map((r: ApolloQueryResult<FinancialInstitutions>) => r.data.financialInstitutions)
      )
  }

  public getById(id: string): Observable<FinancialInstitutionModel> {
    return Observable.of(this.apollo.getClient().readFragment<FinancialInstitutionModel>({
      id: `${typeName}:${id}`,
      fragment: fieldsFragment
    }));
  }
}
