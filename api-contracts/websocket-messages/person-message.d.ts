import { Person } from '../person/person';
import { WebsocketMessageCommon } from './websocket-message';

export interface PersonMessage extends WebsocketMessageCommon<Person> {
  channel: 'person'
}
