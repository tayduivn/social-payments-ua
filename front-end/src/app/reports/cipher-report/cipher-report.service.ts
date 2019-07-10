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
    params = params.set('codeKEK', reportParams.codeKEK);
    params = params.set('codeKFK', reportParams.codeKFK);
    params = params.set('reportNumber', reportParams.reportNumber);
    params = params.set('financialInstitution', JSON.stringify(reportParams.financialInstitution));

    this.http.get(this.requestUrl, {params}).subscribe();
  }
}
