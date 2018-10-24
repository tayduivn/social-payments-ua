import {
  Injectable,
  NgZone
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { WebSocketSubject } from 'rxjs/webSocket';
import { AuthService } from '../../../core/auth.service';
import { WindowProvider } from '../../providers/window-provider';

@Injectable()
export class WebsocketConnectionService {
  public readonly websocketConnect$: Observable<void>;

  private static readonly reconnectTimeout = 1000; // ms
  private socketSubject: WebSocketSubject<any>;

  private websocketConnectSubject = new Subject<void>();

  private socketSubscription: Subscription;

  constructor(private window: WindowProvider, private authService: AuthService) {
    this.websocketConnect$ = this.websocketConnectSubject.asObservable();
  }

  public connect() {
    this.createSocketSubject();

    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }

    this.socketSubscription = this.socketSubject.subscribe(
      (msg) => console.log('~~~ websocket message', msg),
      (err: Event) => console.log('WEBSOCKET ERROR', err)
    );
  }

  private createSocketSubject() {
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
    setTimeout(() => this.websocketConnectSubject.next(), WebsocketConnectionService.reconnectTimeout)
  }

  private onWebsocketClose(): void {
    console.log('WEBSOCKET closed, reconnecting...');
    this.socketSubject.unsubscribe();
    this.socketSubject = null;

    setTimeout(() => this.connect(), WebsocketConnectionService.reconnectTimeout);
  }
}
