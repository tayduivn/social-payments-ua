import { PersonAccounts } from '../person-accounts/person-accounts';
import { WebsocketMessageCommon } from './websocket-message';

export interface PersonAccountsMessage extends WebsocketMessageCommon<PersonAccounts> {
  channel: 'person-accounts'
}
