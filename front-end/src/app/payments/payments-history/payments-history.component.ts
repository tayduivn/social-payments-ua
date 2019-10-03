import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import * as _ from 'lodash/fp';
import { finalize } from 'rxjs/operators';
import { Payment } from '../../../../../api-contracts/payment/payment';
import { PaymentsHistoryService } from '../shared/services/payments-history.service';
import { HistoryFilterModel } from '../shared/history-filter.model';
import { HistoryTableLoaderComponent } from '../shared/history-table/history-table-loader.component';

@Component({
  selector: 'sp-payments-history',
  templateUrl: './payments-history.component.html',
  styleUrls: ['./payments-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsHistoryComponent extends HistoryTableLoaderComponent {
  private static readonly filterEmptyMessage = 'Вкажіть параметри пошуку';

  constructor(cdRef: ChangeDetectorRef, paymentsHistoryService: PaymentsHistoryService) {
    super(cdRef, paymentsHistoryService);
    this.statusTextDescription = PaymentsHistoryComponent.filterEmptyMessage;
  }

  public onFilterEmpty() {
    this.payments = [];
    this.statusTextDescription = PaymentsHistoryComponent.filterEmptyMessage;
  }
}
