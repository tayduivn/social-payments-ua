import { Injectable } from '@angular/core';
import { CachedDataService } from '../../services/cached-data.service';
import { CodeKFK } from '../../../../../../api-contracts/code-kfk/code-kfk';
import { HttpClient } from '@angular/common/http';
import { WebsocketConnectionService } from '../../services/websocket-connection/websocket-connection.service';
import { MainProgressBarService } from '../../../layout/main-progress-bar/main-progress-bar.service';

@Injectable({
  providedIn: 'root'
})
export class CodeKFKService extends CachedDataService<CodeKFK> {
  protected readonly requestUrl = '/codes-kfk';
  protected readonly websocketChannel = 'codes-kfk';
  protected readonly mainProgressBarItemCaption = 'Коди КФК';

  constructor(
    protected readonly http: HttpClient,
    protected readonly websocketConnectionService: WebsocketConnectionService,
    protected readonly mainProgressBarService: MainProgressBarService
  ) {
    super();
  }
}
