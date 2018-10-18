import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { WindowProvider } from '../../providers/window-provider';

@Injectable()
export class WebsocketConnectionService {
  private socketSubject: WebSocketSubject<any>;

  constructor(private window: WindowProvider) {
    this.socketSubject = new WebSocketSubject(`wss://${this.window.location.host}`);
    console.log('WebsocketConnectionService created');

    this.socketSubject.subscribe(
      (msg) => console.log('~~~ websocket message', msg),
      (err) => console.log('!!! websocket ERROR', err),
      () => console.log('------------------------------------------------ websocket complete')
    );
  }
}
