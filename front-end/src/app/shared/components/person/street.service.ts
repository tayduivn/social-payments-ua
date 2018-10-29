import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Street } from '../../../../../../api-contracts/street/street';
import { CachedDataService } from '../../services/cached-data.service';
import { WebsocketConnectionService } from '../../services/websocket-connection/websocket-connection.service';

@Injectable()
export class StreetService extends CachedDataService<Street> {
  protected readonly requestUrl = '/streets';
  protected readonly websocketChannel = 'street';

  constructor(
    protected readonly http: HttpClient,
    protected readonly websocketConnectionService: WebsocketConnectionService
  ) {
    super();
  }
}
