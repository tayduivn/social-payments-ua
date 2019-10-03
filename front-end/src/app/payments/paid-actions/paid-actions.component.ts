import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { HistoryTableLoaderComponent } from '../shared/history-table/history-table-loader.component';
import { PaymentsHistoryService } from '../shared/services/payments-history.service';
import { apiDateFormat } from '../../shared/constants/date-formats';
import { HistoryFilterModel } from '../shared/history-filter.model';
import { map } from 'rxjs/operators';
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
  public paidFlag = undefined;

  public paymentsFiltered: Observable<Payment[]>;
  public paymentsTotalSum: Observable<number>;

  public get buttonDisabled(): boolean {
    return !(this.date || this.reportNumber);
  }

  private filterTrigger = new BehaviorSubject<void>(null);

  constructor(cdRef: ChangeDetectorRef, paymentsHistoryService: PaymentsHistoryService) {
    super(cdRef, paymentsHistoryService);

    this.setFilteringPipe();
    this.setTotalRecordsPipe();
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

    this.paidFlag = null;

    this.onFilterChange(filter);
  }

  public onPaidFlagClick() {
    this.filterTrigger.next(null);
  }

  private setTotalRecordsPipe() {
    this.paymentsTotalSum = this.paymentsFiltered.pipe(
      map(items => items.reduce((acc, item) => acc + item.sum, 0))
    );
  }

  private setFilteringPipe() {
    this.paymentsFiltered = combineLatest(
      this.payments,
      this.filterTrigger.asObservable()
    ).pipe(
      map(([payments]) => payments.filter(item => this.paidFlag === null ? true : this.paidFlag === !!item.paid))
    );
  }
}
