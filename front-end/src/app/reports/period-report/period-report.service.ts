import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { dateFormat } from '../../shared/constants/date-format';
import { WindowProvider } from '../../shared/providers/window-provider';
import { PeriodReportRange } from './period-report-range.enum';

@Injectable()
export class PeriodReportService {
  // todo: change to flexible solution
  private readonly requestUrl = 'https://localhost/reports/period';

  constructor(private window: WindowProvider) { }

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

    this.window.open(`${this.requestUrl}?startDate=${startDate.format(dateFormat)}&endDate=${endDate.format(dateFormat)}`, '_blank');
  }
}
