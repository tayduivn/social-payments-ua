import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../../environments/environment';

@Injectable()
export class WebsocketConnectionService {
  private socketSubject: WebSocketSubject<any>;

  constructor() {
    console.log('WebsocketConnectionService created');
    this.socketSubject = new WebSocketSubject(environment.dataQueries.webSocket);

    this.socketSubject.subscribe(
      (msg) => console.log('~~~ websocket message', msg),
      (err) => console.log('!!! websocket ERROR', err),
      () => console.log('------------------------------------------------ websocket complete')
    );
  }
}
