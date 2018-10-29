import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import * as _ from 'lodash/fp';
import { Payment } from '../../../../../api-contracts/payment/payment';
import { PaymentsHistoryService } from './payments-history.service';
import { HistoryFilterModel } from './shared/history-filter.model';

@Component({
  selector: 'sp-payments-history',
  templateUrl: './payments-history.component.html',
  styleUrls: ['./payments-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsHistoryComponent {
  public statusTextDescription: string;
  public showLoadingIndicator: boolean = false;

  public payments: Payment[];

  private static readonly filterEmptyMessage = 'Вкажіть параметри пошуку';

  constructor(private cdRef: ChangeDetectorRef, private paymentsHistoryService: PaymentsHistoryService) {
    this.statusTextDescription = PaymentsHistoryComponent.filterEmptyMessage;
  }

  public onFilterChange(filter: HistoryFilterModel) {
    this.showLoadingIndicator = true;
    this.statusTextDescription = null;
    this.payments = [];

    this.paymentsHistoryService.requestPayments(filter)
      .subscribe((payments: Payment[]) => {
        if (_.isEmpty(payments)) {
          this.statusTextDescription = 'Не знайдено';
        } else {
          this.statusTextDescription = null;
        }

        this.payments = payments;
        this.showLoadingIndicator = false;

        this.cdRef.markForCheck();
      });
  }

  public onFilterEmpty() {
    this.statusTextDescription = PaymentsHistoryComponent.filterEmptyMessage;
  }
}
