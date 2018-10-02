import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import * as _ from 'lodash/fp';
import { Payment } from '../../../../../api-contracts/payment/payment';
import { PaymentsFilter } from '../../../../../api-contracts/payment/payments-filter';
import { PaymentsHistoryService } from './payments-history.service';

@Component({
  selector: 'sp-payments-history',
  templateUrl: './payments-history.component.html',
  styleUrls: ['./payments-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsHistoryComponent {
  public statusTextDescription = 'Вкажіть параметри пошуку';

  public payments: Payment[];

  constructor(private cdRef: ChangeDetectorRef, private paymentsHistoryService: PaymentsHistoryService) {}

  public onFilterChange(filter: PaymentsFilter) {
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
}
