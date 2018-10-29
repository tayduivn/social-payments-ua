import { FinancialInstitutionMessage } from './financial-institution-message';
import { PaymentMessage } from './payment-message';
import { PersonAccountsMessage } from './person-accounts-message';
import { PersonMessage } from './person-message';
import { StreetMessage } from './street-message';

export type WebsocketMessage =
  FinancialInstitutionMessage |
  StreetMessage |
  PersonMessage |
  PersonAccountsMessage |
  PaymentMessage
;

