import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsDashboardComponent } from './payments-dashboard.component';

@NgModule({
  imports: [
    CommonModule
  ],
  entryComponents: [PaymentsDashboardComponent],
  declarations: [PaymentsDashboardComponent]
})
export class PaymentsDashboardModule { }
