import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { dateFormat } from '../../shared/constants/date-format';
import { PeriodReportRange } from './period-report-range.enum';

@Injectable()
export class PeriodReportService {
  // todo: change to flexible solution
  private readonly requestUrl = 'https://localhost/reports/period';

  constructor(private httpClient: HttpClient) { }

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
        break;
      default:
        return;
    }

    const params = new HttpParams()
      .append('startDate', startDate.format(dateFormat))
      .append('endDate', endDate.format(dateFormat));

    this.httpClient.get<any>(this.requestUrl, {params}).subscribe();
  }
}
