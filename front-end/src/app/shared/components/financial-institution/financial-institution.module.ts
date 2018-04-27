import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { FinancialInstitutionComponent } from './financial-institution.component';
import { FinancialInstitutionService } from './financial-institution.service';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  declarations: [FinancialInstitutionComponent],
  providers: [FinancialInstitutionService],
  exports: [FinancialInstitutionComponent]
})
export class FinancialInstitutionModule { }
