import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinancialInstitution } from '../../../../../../api-contracts/financial-institution/financial.institution';
import { CachedDataService } from '../../services/cached-data.service';
import { WebsocketConnectionService } from '../../services/websocket-connection/websocket-connection.service';

@Injectable()
export class FinancialInstitutionService extends CachedDataService<FinancialInstitution> {
  constructor(protected http: HttpClient, websocketConnectionService: WebsocketConnectionService) {
    super('/financial-institutions', 'financial-institution', websocketConnectionService);
  }
}
