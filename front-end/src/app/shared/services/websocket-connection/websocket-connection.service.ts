import {
  Injectable,
  NgZone
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { WebSocketSubject } from 'rxjs/webSocket';
import { AuthService } from '../auth.service';
import { WindowProvider } from '../../providers/window-provider';

@Injectable()
export class WebsocketConnectionService {
  public readonly websocketConnect$: Observable<void>;

  private static readonly reconnectTimeout = 1000; // ms
  private socketSubject: WebSocketSubject<any>;

  private websocketConnectSubject = new Subject<void>();

  private socketSubscription: Subscription;

  private reconnectOnClose: boolean;

  constructor(private window: WindowProvider, private authService: AuthService) {
    this.websocketConnect$ = this.websocketConnectSubject.asObservable();
  }

  public connect(reconnectOnClose: boolean = false) {
    this.createSocketSubject();

    if (this.socketSubscription) {
      // causes websocket close
      this.socketSubscription.unsubscribe();

      // set auto reconnect to avoid infinite reconnection loop
      this.reconnectOnClose = reconnectOnClose;
    }

    this.socketSubscription = this.socketSubject.subscribe(
      (msg) => console.log('~~~ websocket message', msg),
      (err: Event) => console.log('~~~ websocket ERROR', err),
      () => console.log('~~~ websocket complete')
    );
  }

  private createSocketSubject() {
    if (this.socketSubject) {
      this.socketSubject.unsubscribe();
      this.socketSubject.complete();
    }

    this.socketSubject = new WebSocketSubject({
      url: `wss://${this.window.location.hostname}`,
      protocol: this.authService.getToken(),
      openObserver: {
        next: this.onWebsocketOpen.bind(this)
      },
      closeObserver: {
        next: this.onWebsocketClose.bind(this)
      }
    });
  }

  private onWebsocketOpen(): void {
    console.log('WEBSOCKET connected');

    // set flag back to enable reconnection in case if server closes connection
    // flag could be set to false in a case of manual reconnection (connect method call) from outside of the module
    this.reconnectOnClose = true;

    // setting timeout to give some time spot for server starting activities in case of connection after server restarts
    setTimeout(() => this.websocketConnectSubject.next(), WebsocketConnectionService.reconnectTimeout)
  }

  private onWebsocketClose(closeEvent: CloseEvent): void {
    console.log('WEBSOCKET closed', closeEvent);

    if (this.reconnectOnClose) {
      console.log('WEBSOCKET reconnect');

      // do not reconnect instantly
      // set auto reconnect to true to reconnect until success connection established
      setTimeout(() => this.connect(true), WebsocketConnectionService.reconnectTimeout);
    }
  }
}
