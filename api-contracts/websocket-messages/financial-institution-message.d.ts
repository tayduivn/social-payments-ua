import { FinancialInstitution } from '../financial-institution/financial.institution';
import { WebsocketMessageCommon } from './websocket-message';

export interface FinancialInstitutionMessage extends WebsocketMessageCommon<FinancialInstitution> {
  channel: 'financial-institution';
}