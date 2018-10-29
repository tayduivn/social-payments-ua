import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import {
  map,
  take
} from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { environment } from '../../../environments/environment';
import { WebsocketChannel } from './websocket-connection/websocket-channel.type';
import { WebsocketConnectionService } from './websocket-connection/websocket-connection.service';
import { WebsocketDataService } from './websocket-data.service';

export abstract class CachedDataService<T> extends WebsocketDataService<T> {
  protected abstract http: HttpClient;

  protected constructor(
    protected readonly requestUrl: string,
    websocketChannel: WebsocketChannel,
    websocketConnectionService: WebsocketConnectionService
  ) {
    super(websocketChannel, websocketConnectionService);
  }

  public connect() {
    console.log('cache connect', this.requestUrl);
    if (!this.dataObserver || this.dataObserver.hasError) {
      this.dataObserver = new ReplaySubject<T[]>(1);
    }

    this.requestData();
    this.connectWebsocketChannel();
  }

  public getData(filter?: any): Observable<T[]> {
    const obs = this.dataObserver.asObservable();

    return filter ? obs
      .pipe(
        map((items) => _.filter<T>(items, filter)),
        take(1)
      ) : obs;
  }

  public getById(id: string): Observable<T> {
    return this.dataObserver.asObservable()
      .pipe(
        map((items) => _.find<T>(items, {_id: id} as any)),
        take(1)
      );
  }

  private requestData() {
    this.http.get(`${environment.dataQueries.apiEndpoint}${this.requestUrl}`)
      .subscribe(
        (res: T[]) => this.dataObserver.next(res),
        (err: any) => this.dataObserver.error(err)
      );
  }
}
