import { zip } from 'rxjs/internal/observable/zip';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { WebsocketMessageCommon } from '../../../../../api-contracts/websocket-messages/websocket-message-common';
import { WebsocketChannel } from './websocket-connection/websocket-channel.type';
import { WebsocketConnectionService } from './websocket-connection/websocket-connection.service';

export abstract class WebsocketDataService<T> {
  protected abstract dataObserver: ReplaySubject<T[]>;
  protected abstract readonly websocketChannel: WebsocketChannel;
  protected abstract readonly websocketConnectionService: WebsocketConnectionService;

  protected constructor() {}

  protected connectWebsocketChannel() {
    zip(
      this.websocketConnectionService.subscribeChannel(this.websocketChannel),
      this.dataObserver.asObservable()
    )
      .subscribe((params: [WebsocketMessageCommon<T>, T[]]) => {
        const [message, cached] = params;
        if (message.action === 'create') {
          this.dataObserver.next([message.payload].concat(cached))
        }
      });
  }
}
