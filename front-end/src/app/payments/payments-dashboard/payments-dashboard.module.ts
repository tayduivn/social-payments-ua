import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { PaymentsDashboardComponent } from './payments-dashboard.component';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule
  ],
  entryComponents: [PaymentsDashboardComponent],
  declarations: [PaymentsDashboardComponent]
})
export class PaymentsDashboardModule { }
