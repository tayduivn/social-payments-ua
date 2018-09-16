import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { FinancialInstitution } from '../../../../../../api-contracts/financial-institution/financial.institution';
import { CachedDataService } from '../../services/cached-data.service';

@Injectable()
export class FinancialInstitutionService extends CachedDataService<FinancialInstitution> {
  protected readonly requestUrl = 'financial-institutions';

  constructor(protected http: HttpClient) {
    super();
  }
}
