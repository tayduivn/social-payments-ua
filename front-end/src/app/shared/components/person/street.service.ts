import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Street } from '../../../../../../api-contracts/street/street';
import { CachedDataService } from '../../services/cached-data.service';
import { WebsocketConnectionService } from '../../services/websocket-connection/websocket-connection.service';

@Injectable({
  providedIn: 'root'
})
export class StreetService extends CachedDataService<Street> {
  constructor(protected http: HttpClient, websocketConnectionService: WebsocketConnectionService) {
    super('/streets', 'street', websocketConnectionService);
  }
}
