import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { FinancialInstitutionComponent } from './financial-institution.component';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [FinancialInstitutionComponent],
  exports: [FinancialInstitutionComponent]
})
export class FinancialInstitutionModule { }
