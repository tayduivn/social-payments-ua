import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { environment } from '../../../environments/environment';
import { TabbedItemsService } from '../../layout/tabbed-items/tabbed-items.service';
import { requestDateFormat } from '../../shared/constants/date-formats';
import { WindowProvider } from '../../shared/providers/window-provider';
import { PeriodReportRange } from './period-report-range.enum';

@Injectable()
export class PeriodReportService {
  // todo: change to flexible solution
  private readonly requestUrl = `${environment.dataQueries.reportsEndpoint}/period`;

  constructor(
    private tabbedItemsService: TabbedItemsService,
    private window: WindowProvider
  ) { }

  public requestReport(range: PeriodReportRange, startDate?: Moment, endDate?: Moment): void {
    switch (range) {
      case PeriodReportRange.Day:
        startDate = endDate = moment(Date.now());
        break;
      case PeriodReportRange.Month:
        startDate = moment(Date.now()).startOf('month');
        endDate = moment(Date.now()).endOf('month');
        break;
      case PeriodReportRange.Period:
        // leave date range as it is
        break;
      default:
        // do not support other cases
        return;
    }

    this.tabbedItemsService.closeActiveTab();
    this.window.open(`${this.requestUrl}?startDate=${startDate.format(requestDateFormat)}&endDate=${endDate.format(requestDateFormat)}`, '_self');
  }
}
