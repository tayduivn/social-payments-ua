import { Payment } from './payment';

export interface PaymentsLatest {
  hasMore: boolean;
  payments: Payment[]
}
