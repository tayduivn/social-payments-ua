import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import {
  map,
  tap
} from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { apiEndpoint } from '../constants/api-endpoint';
import { PartialDeep } from 'lodash';

export abstract class CachedDataService<T> {
  protected abstract readonly requestUrl: string;
  protected abstract http: HttpClient;

  private dataObserver: ReplaySubject<T[]>;

  protected constructor() {}

  public getData(filter?: any): Observable<T[]> {
    this.validateCache();

    return this.dataObserver.asObservable()
      .pipe(
        map((items) => _.filter<T>(items, filter))
      );
  }

  public getById(id: string): Observable<T> {
    this.validateCache();

    return this.dataObserver.asObservable()
      .pipe(map((items) => _.find<T>(items, {_id: id} as any))
      );
  }

  private validateCache() {
    if (!this.dataObserver) {
      this.dataObserver = new ReplaySubject<T[]>(1);
      this.requestData();
    }
  }

  private requestData() {
    this.http.get(`${apiEndpoint}/${this.requestUrl}`)
      .subscribe((res: T[]) => this.dataObserver.next(res));
  }
}
