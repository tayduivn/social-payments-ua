import { FinancialInstitutionMessage } from './financial-institution-message';
import { PaymentMessage } from './payment-message';
import { PersonAccountsMessage } from './person-accounts-message';
import { PersonMessage } from './person-message';
import { StreetMessage } from './street-message';
import { WebsocketEvent } from './websocket-event';

export interface WebsocketMessageCommon<T> {
  action: WebsocketEvent;
  payload: T;
}

export type WebsocketMessage =
  FinancialInstitutionMessage |
  StreetMessage |
  PersonMessage |
  PersonAccountsMessage |
  PaymentMessage
;

