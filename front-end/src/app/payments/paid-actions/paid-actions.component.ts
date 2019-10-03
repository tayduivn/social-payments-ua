import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { HistoryTableLoaderComponent } from '../shared/history-table/history-table-loader.component';
import { PaymentsHistoryService } from '../shared/services/payments-history.service';
import { apiDateFormat } from '../../shared/constants/date-formats';
import * as moment from 'moment';
import { HistoryFilterModel } from '../shared/history-filter.model';

@Component({
  selector: 'sp-paid-actions',
  templateUrl: './paid-actions.component.html',
  styleUrls: ['./paid-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaidActionsComponent extends HistoryTableLoaderComponent {
  public date: Moment = null;
  public reportNumber = '';

  public get buttonDisabled(): boolean {
    return !(this.date || this.reportNumber);
  }

  constructor(cdRef: ChangeDetectorRef, paymentsHistoryService: PaymentsHistoryService) {
    super(cdRef, paymentsHistoryService);
  }

  ngOnInit() {
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

    this.onFilterChange(filter);
  }
}
