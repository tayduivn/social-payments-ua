import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';
import { Moment } from 'moment';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { TabbedItemsService } from '../../layout/tabbed-items/tabbed-items.service';
import { apiDateFormat } from '../../shared/constants/date-formats';
import { PeriodReportRange } from './period-report-range.enum';

@Injectable()
export class PeriodReportService {
  private readonly requestUrl = `${environment.dataQueries.reportsEndpoint}/period`;

  constructor(
    private tabbedItemsService: TabbedItemsService,
    private http: HttpClient
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

    this.saveReport(`${this.requestUrl}?startDate=${startDate.format(apiDateFormat)}&endDate=${endDate.format(apiDateFormat)}`);
  }

  private saveReport(url: string): void {
    this.http.get(url, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return {
            data: new Blob([response], {type: 'application/vnd.ms-excel;charset=utf-8'}),
            filename : 'test.xlsx'
          };
        })
      )
      .subscribe(
        (res) => {
          this.tabbedItemsService.closeActiveTab();
          FileSaver.saveAs(res.data, res.filename);
        }
      )
  }
}
