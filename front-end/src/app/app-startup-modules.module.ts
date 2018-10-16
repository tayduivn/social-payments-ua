import { NgModule } from '@angular/core';
import { FinancialInstitutionService } from './shared/components/financial-institution/financial-institution.service';
import { PersonAccountsService } from './shared/components/person-accounts/person-accounts.service';
import { PersonService } from './shared/components/person/person.service';
import { StreetService } from './shared/components/person/street.service';

@NgModule({
})
export class AppStartupModulesModule {
  constructor(
    private fiService: FinancialInstitutionService,
    private personService: PersonService,
    private personAccountsService: PersonAccountsService,
    private streetService: StreetService
  ) {
    this.initCaches();
  }

  private initCaches() {
    this.fiService.getData().subscribe();
    this.personService.getData().subscribe();
    this.personAccountsService.getData().subscribe();
    this.streetService.getData();
  }
}
