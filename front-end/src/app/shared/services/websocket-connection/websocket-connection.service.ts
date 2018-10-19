import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { AuthService } from '../../../core/auth.service';
import { WindowProvider } from '../../providers/window-provider';

@Injectable()
export class WebsocketConnectionService {
  private socketSubject: WebSocketSubject<any>;

  constructor(private window: WindowProvider, private authService: AuthService) {}

  public connect() {
    this.socketSubject = new WebSocketSubject({
      url: `wss://${this.window.location.hostname}`,
      protocol: this.authService.getToken()
    });

    this.socketSubject.subscribe(
      (msg) => console.log('~~~ websocket message', msg),
      (err) => console.log('!!! websocket ERROR', err),
      () => console.log('------------------------------------------------ websocket complete')
    );
  }
}
