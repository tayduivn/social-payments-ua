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

@Injectable()
export class FinancialInstitutionService {

  constructor(private apollo: Apollo) { }

  public getList(): Observable<FinancialInstitutionModel[]> {
    return this.apollo.watchQuery<FinancialInstitutions>({
      query: gql(require('webpack-graphql-loader!./financial-institutions.graphql'))
    })
      .valueChanges
      .pipe(
        map((r: ApolloQueryResult<FinancialInstitutions>) => r.data.financialInstitutions)
      )
  }
}
