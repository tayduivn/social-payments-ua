import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinancialInstitution } from '../../../../../../api-contracts/financial-institution/financial.institution';
import { Street } from '../../../../../../api-contracts/street/street';
import { MainProgressBarService } from '../../../layout/main-progress-bar/main-progress-bar.service';
import { CachedDataService } from '../../services/cached-data.service';
import { WebsocketConnectionService } from '../../services/websocket-connection/websocket-connection.service';

@Injectable()
export class FinancialInstitutionService extends CachedDataService<FinancialInstitution> {
  protected readonly requestUrl = '/financial-institutions';
  protected readonly websocketChannel = 'financial-institution';
  protected readonly mainProgressBarItemCaption = 'Фінансові установи';

  constructor(
    protected readonly http: HttpClient,
    protected readonly websocketConnectionService: WebsocketConnectionService,
    protected readonly mainProgressBarService: MainProgressBarService
  ) {
    super();
  }
}
