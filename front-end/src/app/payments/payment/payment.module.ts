import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { PaymentComponent } from './payment.component';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule
  ],
  entryComponents: [PaymentComponent],
  declarations: [PaymentComponent]
})
export class PaymentModule { }
