import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabbedItemsModule } from '../layout/tabbed-items/tabbed-items.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentsDashboardModule } from './payments-dashboard/payments-dashboard.module';
import { PaymentsComponent } from './payments.component';

@NgModule({
  imports: [
    CommonModule,
    PaymentModule,
    PaymentsDashboardModule,
    TabbedItemsModule
  ],
  declarations: [PaymentsComponent]
})
export class PaymentsModule { }
