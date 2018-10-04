import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Street } from '../../../../../../api-contracts/street/street';
import { CachedDataService } from '../../services/cached-data.service';

@Injectable({
  providedIn: 'root'
})
export class StreetService extends CachedDataService<Street> {
  protected readonly requestUrl = '/streets';

  constructor(protected http: HttpClient) {
    super();
  }
}
