import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { Person } from '../../../../../../api-contracts/person/person';
import { CachedDataService } from '../../services/cached-data.service';

@Injectable()
export class PersonService extends CachedDataService<Person> {
  protected readonly requestUrl = '/persons';

  constructor(protected http: HttpClient) {
    super();
  }
}
