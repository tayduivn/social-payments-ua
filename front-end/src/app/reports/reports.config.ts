import { TabbedItemsConfig } from '../layout/tabbed-items/tabbed-items-config.model';
import { PeriodReportComponent } from './period-report/period-report.component';

export const reportsConfig: TabbedItemsConfig = {
  list: [
    {
      title: 'Платежі за період',
      icon: 'event_note',
      component: PeriodReportComponent
    }
  ]
};
