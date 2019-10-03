import { Payment } from '../../../../../../api-contracts/payment/payment';
import { HistoryFilterModel } from '../history-filter.model';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash/fp';
import { ChangeDetectorRef } from '@angular/core';
import { PaymentsHistoryService } from '../services/payments-history.service';

export class HistoryTableLoaderComponent {
  public statusTextDescription: string;
  public showLoadingIndicator: boolean = false;

  public payments: Payment[];

  constructor(protected cdRef: ChangeDetectorRef, protected paymentsHistoryService: PaymentsHistoryService) {
  }


  public onFilterChange(filter: HistoryFilterModel) {
    this.showLoadingIndicator = true;
    this.statusTextDescription = null;
    this.payments = [];

    this.paymentsHistoryService.requestPayments(filter)
      .pipe(
        finalize(() => {
          this.showLoadingIndicator = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe((payments: Payment[]) => {
        if (_.isEmpty(payments)) {
          this.statusTextDescription = 'Не знайдено';
        } else {
          this.statusTextDescription = null;
        }

        this.payments = payments;
      });
  }
}
