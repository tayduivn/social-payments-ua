import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Payment } from '../../../../../../api-contracts/payment/payment';
import { PaymentsLatest } from '../../../../../../api-contracts/payment/payments-latest';
import { PaymentsLatestFilter } from '../../../../../../api-contracts/payment/payments-latest-filter';
import { environment } from '../../../../environments/environment';

@Injectable()
export class LatestPaymentsService {
  public readonly items$: Observable<Payment[]>;

  private static readonly take = '30';
  private static readonly requestUrl = '/payments/latest';

  private readonly cachedDataSubject = new ReplaySubject<Payment[]>(1);

  constructor(private http: HttpClient) {
    this.items$ = this.cachedDataSubject.asObservable();
  }

  public connect(): void {
    const filter: PaymentsLatestFilter &  {[key: string]: string} = {
      skip: '0',
      take: LatestPaymentsService.take
    };
    const options = {
      params: new HttpParams({fromObject: filter})
    };

    this.http.get<PaymentsLatest>(`${environment.dataQueries.apiEndpoint}${LatestPaymentsService.requestUrl}`, options)
      .subscribe(
        (res: PaymentsLatest) => this.cachedDataSubject.next(res.payments),
        (err: any) => this.cachedDataSubject.error(err)
      )
  }

}
