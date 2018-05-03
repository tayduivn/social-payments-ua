import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { FinancialInstitutionComponent } from './financial-institution.component';
import { FinancialInstitutionService } from './financial-institution.service';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    NgxMaskModule,
    PerfectScrollbarModule,
    ReactiveFormsModule
  ],
  declarations: [FinancialInstitutionComponent],
  providers: [FinancialInstitutionService],
  exports: [FinancialInstitutionComponent]
})
export class FinancialInstitutionModule { }
