import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { FinancialInstitution } from '../../../../../../api-contracts/financial-institution/financial.institution';
import 'rxjs/add/observable/of';

@Injectable()
export class FinancialInstitutionService {

  constructor() { }

  public getList(): Observable<FinancialInstitution[]> {
    // return this.apollo.watchQuery<FinancialInstitutions>({
    //   query: listQuery,
    // })
    //   .valueChanges
    //   .pipe(
    //     map((r: ApolloQueryResult<FinancialInstitutions>) => r.data.financialInstitutions)
    //   )
  }

  public getById(id: string): Observable<FinancialInstitution> {
    // return Observable.of(this.apollo.getClient().readFragment<FinancialInstitutionModel>({
    //   id: `${typeName}:${id}`,
    //   fragment: fieldsFragment
    // }));
  }
}
