import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { PersonAccounts } from '../../../../../../api-contracts/person-accounts/person-accounts';
import { CachedDataService } from '../../services/cached-data.service';

@Injectable()
export class PersonAccountsService extends CachedDataService<PersonAccounts> {
  protected readonly requestUrl = '/person-accounts';

  constructor(protected http: HttpClient) {
    super();
  }

  public getByUserId(id: string): Observable<PersonAccounts> {
    return this.getData({personId: id})
      .pipe(
        map((items) => items[0])
      );
  }
}
