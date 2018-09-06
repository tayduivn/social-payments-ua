import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { PeriodReportComponent } from './period-report.component';
import { PeriodReportService } from './period-report.service';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule
  ],
  entryComponents: [PeriodReportComponent],
  declarations: [PeriodReportComponent],
  providers: [PeriodReportService]
})
export class PeriodReportModule { }
