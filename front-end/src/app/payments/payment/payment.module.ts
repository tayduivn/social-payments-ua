import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { FinancialInstitutionModule } from '../../shared/components/financial-institution/financial-institution.module';
import { PersonModule } from '../../shared/components/person/person.module';
import { PaymentComponent } from './payment.component';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    FinancialInstitutionModule,
    PersonModule
  ],
  entryComponents: [PaymentComponent],
  declarations: [PaymentComponent]
})
export class PaymentModule { }
