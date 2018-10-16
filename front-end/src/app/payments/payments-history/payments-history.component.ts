import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import * as _ from 'lodash/fp';
import { Payment } from '../../../../../api-contracts/payment/payment';
import { PaymentsHistoryService } from './payments-history.service';
import { HistoryFilterModel } from './shared/history-filter.model';

const filterEmptyMessage = 'Вкажіть параметри пошуку';

@Component({
  selector: 'sp-payments-history',
  templateUrl: './payments-history.component.html',
  styleUrls: ['./payments-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsHistoryComponent {
  public statusTextDescription = filterEmptyMessage;

  public payments: Payment[];

  constructor(private cdRef: ChangeDetectorRef, private paymentsHistoryService: PaymentsHistoryService) {}

  public onFilterChange(filter: HistoryFilterModel) {
    this.paymentsHistoryService.requestPayments(filter)
      .subscribe((payments: Payment[]) => {
        if (_.isEmpty(payments)) {
          this.statusTextDescription = 'Не знайдено';
        } else {
          this.statusTextDescription = null;
        }

        this.payments = payments;

        this.cdRef.markForCheck();
      });
  }

  public onFilterEmpty() {
    this.statusTextDescription = filterEmptyMessage;
  }
}
