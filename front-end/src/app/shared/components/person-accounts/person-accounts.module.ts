import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { PersonAccountsComponent } from './person-accounts.component';
import { PersonAccountsService } from './person-accounts.service';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule
  ],
  providers: [PersonAccountsService],
  declarations: [PersonAccountsComponent],
  exports: [PersonAccountsComponent]
})
export class PersonAccountsModule {
  constructor() {}
}
