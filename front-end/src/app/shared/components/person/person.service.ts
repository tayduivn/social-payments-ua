import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { Person } from '../../../../../../api-contracts/person/person';
import { Street } from '../../../../../../api-contracts/street/street';
import { MainProgressBarService } from '../../../layout/main-progress-bar/main-progress-bar.service';
import { CachedDataService } from '../../services/cached-data.service';
import { WebsocketConnectionService } from '../../services/websocket-connection/websocket-connection.service';

@Injectable()
export class PersonService extends CachedDataService<Person> {
  protected readonly requestUrl = '/persons';
  protected readonly websocketChannel = 'person';
  protected readonly mainProgressBarItemCaption = 'Довідник одержувачів';

  constructor(
    protected readonly http: HttpClient,
    protected readonly websocketConnectionService: WebsocketConnectionService,
    protected readonly mainProgressBarService: MainProgressBarService
  ) {
    super();
  }
}
