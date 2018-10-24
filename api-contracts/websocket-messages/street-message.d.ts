import { Street } from '../street/street';
import { WebsocketMessageCommon } from './websocket-message';

export interface StreetMessage extends WebsocketMessageCommon<Street> {
  channel: 'street'
}

