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
import { WebsocketConnectionService } from '../../../shared/services/websocket-connection/websocket-connection.service';
import { WebsocketDataService } from '../../../shared/services/websocket-data.service';

@Injectable()
export class LatestPaymentsService extends WebsocketDataService<Payment> {
  public readonly items$: Observable<Payment[]>;

  private static readonly take = '30';
  private static readonly requestUrl = '/payments/latest';

  constructor(private http: HttpClient, websocketConnectionService: WebsocketConnectionService) {
    super('payment', websocketConnectionService);

    this.dataObserver = new ReplaySubject<Payment[]>(1);
    this.items$ = this.dataObserver.asObservable();
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
        (res: PaymentsLatest) => this.dataObserver.next(res.payments),
        (err: any) => this.dataObserver.error(err)
      );

    this.connectWebsocketChannel();
  }
}
