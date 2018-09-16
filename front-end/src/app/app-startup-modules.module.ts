import { NgModule } from '@angular/core';
import { FinancialInstitutionService } from './shared/components/financial-institution/financial-institution.service';
import { PersonService } from './shared/components/person/person.service';

@NgModule({
})
export class AppStartupModulesModule {
  constructor(private fiService: FinancialInstitutionService, private personService: PersonService) {
    this.initCaches();
  }

  private initCaches() {
    this.fiService.getData().subscribe();
    this.personService.getData().subscribe()
  }
}
