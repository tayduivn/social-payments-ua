import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    PaymentsRoutingModule
  ],
  declarations: [PaymentsComponent]
})
export class PaymentsModule { }
