import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CipherReportParams } from './cipher-report-params.model';
import { apiDateFormat } from '../../shared/constants/date-formats';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CipherReportService {
  private readonly requestUrl = `${environment.dataQueries.reportsEndpoint}/cipher`;

  constructor(private http: HttpClient) { }

  public requestReport(reportParams: CipherReportParams): void {
    let params = new HttpParams();
    params = params.set('date', reportParams.date.format(apiDateFormat));

    this.http.get(this.requestUrl, {params}).subscribe();
  }
}
