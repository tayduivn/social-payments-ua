import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { AuthService } from '../../../core/auth.service';
import { WindowProvider } from '../../providers/window-provider';

@Injectable()
export class WebsocketConnectionService {
  private socketSubject: WebSocketSubject<any>;

  constructor(private window: WindowProvider, private authService: AuthService) {}

  public connect() {
    this.validateSocketSubject();

    this.socketSubject.subscribe(
      (msg) => console.log('~~~ websocket message', msg),
      (err) => {
        console.log('!!! websocket ERROR', err);
        this.socketSubject.unsubscribe();
        this.socketSubject = null;
        this.connect();
      },
      () => console.log('----------------------------------------------- websocket complete')
    );
  }

  private validateSocketSubject() {
    if (this.socketSubject && !this.socketSubject.hasError) {
      return;
    }

    console.log('create socket subject');

    this.socketSubject = new WebSocketSubject({
      url: `wss://${this.window.location.hostname}`,
      protocol: this.authService.getToken()
    });
  }
}
