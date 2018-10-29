import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { Person } from '../../../../../../api-contracts/person/person';
import { CachedDataService } from '../../services/cached-data.service';
import { WebsocketConnectionService } from '../../services/websocket-connection/websocket-connection.service';

@Injectable()
export class PersonService extends CachedDataService<Person> {
  constructor(protected http: HttpClient, websocketConnectionService: WebsocketConnectionService) {
    super('/persons', 'person', websocketConnectionService);
  }
}
