import { NgModule } from '@angular/core';
import { filter } from 'rxjs/operators';
import { AuthService } from './shared/services/auth.service';
import { LatestPaymentsService } from './payments/payments-dashboard/latest-payments/latest-payments.service';
import { FinancialInstitutionService } from './shared/components/financial-institution/financial-institution.service';
import { PersonAccountsService } from './shared/components/person-accounts/person-accounts.service';
import { PersonService } from './shared/components/person/person.service';
import { StreetService } from './shared/components/person/street.service';
import { WebsocketConnectionService } from './shared/services/websocket-connection/websocket-connection.service';

@NgModule({
})
export class AppStartupModulesModule {
  constructor(
    private authService: AuthService,
    private websocketConnectionService: WebsocketConnectionService,
    private fiService: FinancialInstitutionService,
    private personService: PersonService,
    private personAccountsService: PersonAccountsService,
    private streetService: StreetService,
    private latestPaymentsService: LatestPaymentsService
  ) {
    this.initWebsocket();
    this.initDataCaches();
  }

  private initWebsocket(): void {
    this.authService.loggedIn$
      .pipe(
        filter((loggedIn) => loggedIn)
      )
      .subscribe(() => this.websocketConnectionService.connect());

    this.websocketConnectionService.subscribeChannel('person')
      .subscribe((a) => console.log('PERSON channel subscription', a));

    this.websocketConnectionService.subscribeChannel('payment')
      .subscribe((a) => console.log('PAYMENT channel subscription', a));
  }

  private initDataCaches(): void {
    this.websocketConnectionService.websocketConnect$
      .subscribe(() => {
        this.fiService.connect();
        this.personService.connect();
        this.personAccountsService.connect();
        this.streetService.connect();
        this.latestPaymentsService.connect();
      });
  }
}
