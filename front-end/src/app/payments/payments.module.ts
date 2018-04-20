import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabbedItemsModule } from '../layout/tabbed-items/tabbed-items.module';
import { PaymentsComponent } from './payments.component';

@NgModule({
  imports: [
    CommonModule,
    TabbedItemsModule
  ],
  declarations: [PaymentsComponent]
})
export class PaymentsModule { }
