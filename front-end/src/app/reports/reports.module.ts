import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabbedItemsModule } from '../layout/tabbed-items/tabbed-items.module';
import { PeriodReportModule } from './period-report/period-report.module';
import { ReportsComponent } from './reports.component';

@NgModule({
  imports: [
    CommonModule,
    PeriodReportModule,
    TabbedItemsModule
  ],
  declarations: [ReportsComponent]
})
export class ReportsModule { }
