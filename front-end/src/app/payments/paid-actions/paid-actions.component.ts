import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { HistoryTableLoaderComponent } from '../shared/history-table/history-table-loader.component';
import { PaymentsHistoryService } from '../shared/services/payments-history.service';
import { apiDateFormat } from '../../shared/constants/date-formats';
import { HistoryFilterModel } from '../shared/history-filter.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Payment } from '../../../../../api-contracts/payment/payment';

@Component({
  selector: 'sp-paid-actions',
  templateUrl: './paid-actions.component.html',
  styleUrls: ['./paid-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaidActionsComponent extends HistoryTableLoaderComponent {
  public date: Moment = null;
  public reportNumber = '';

  public paymentsFiltered: Observable<Payment[]>;
  public paymentsTotalSum: Observable<number>;

  public get buttonDisabled(): boolean {
    return !(this.date || this.reportNumber);
  }

  public filterTrigger = new BehaviorSubject<boolean>(undefined);

  constructor(cdRef: ChangeDetectorRef, paymentsHistoryService: PaymentsHistoryService) {
    super(cdRef, paymentsHistoryService);

    this.setFilteringPipe();
    this.setTotalSumPipe();
  }

  public onFindClick() {
    let filter: HistoryFilterModel = {};

    if (this.date && moment(this.date).isValid()) {
      const date = moment(this.date).format(apiDateFormat);

      filter.datesRange = {
        dateFrom: date,
        dateTo: date
      };
    }

    if (this.reportNumber) {
      filter.reportNumber = this.reportNumber;
    }
    this.filterTrigger.next(null);
    this.onFilterChange(filter);
  }

  public onPaidFlagClick(filterVal: boolean) {
    this.filterTrigger.next(filterVal);
  }

  private setTotalSumPipe() {
    this.paymentsTotalSum = this.paymentsFiltered.pipe(
      map(items => items.reduce((acc, item) => acc + item.sum, 0))
    );
  }

  private setFilteringPipe() {
    this.paymentsFiltered = this.payments.pipe(
      switchMap((payments) => this.filterTrigger.asObservable().pipe(
        map((paidFlag) => payments.filter(item => paidFlag === null ? true : paidFlag === !!item.paid))
      ))
    )
  }
}
