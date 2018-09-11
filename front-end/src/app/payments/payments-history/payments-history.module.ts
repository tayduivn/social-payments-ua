import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { PaymentsHistoryComponent } from './payments-history.component';
import { PaymentsHistoryService } from './payments-history.service';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    PerfectScrollbarModule
  ],
  entryComponents: [PaymentsHistoryComponent],
  declarations: [PaymentsHistoryComponent],
  providers: [PaymentsHistoryService]
})
export class PaymentsHistoryModule { }
