import { TabbedItemsConfig } from '../layout/tabbed-items/tabbed-items-config.model';
import { PaymentComponent } from './payment/payment.component';
import { PaymentsDashboardComponent } from './payments-dashboard/payments-dashboard.component';

export const PaymentsConfig: TabbedItemsConfig = {
  list: [
    {
      title: 'Новий платіж',
      icon: 'note_add',
      component: PaymentComponent
    },
    {
      title: 'Історія платежів',
      icon: 'history',
      component: {} as any
    }
  ],
  pinnedTabs: [
    {
      title: 'Головна',
      icon: 'bookmark',
      component: PaymentsDashboardComponent
    },
    {
      title: 'Головна2',
      icon: 'bookmark',
      component: PaymentsDashboardComponent
    }
  ]
};
