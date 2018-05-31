import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PersonAccountsService } from './person-accounts.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [PersonAccountsService],
  declarations: []
})
export class PersonAccountsModule {
  constructor(personAccountsService: PersonAccountsService) {
    personAccountsService.getPersonAccounts().subscribe();
  }
}
