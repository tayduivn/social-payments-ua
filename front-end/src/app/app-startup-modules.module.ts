import { NgModule } from '@angular/core';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/auth.service';
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
    private streetService: StreetService
  ) {
    this.initProtectedConnections();
  }

  private initProtectedConnections() {
    this.authService.loggedIn$
      .pipe(
        filter((loggedIn) => loggedIn)
      )
      .subscribe(() => {
        this.websocketConnectionService.connect();
        this.fiService.getData().subscribe();
        this.personService.getData().subscribe();
        this.personAccountsService.getData().subscribe();
        this.streetService.getData();
      });
  }
}
