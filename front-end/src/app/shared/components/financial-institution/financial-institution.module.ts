import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { SharedModule } from '../../shared.module';
import { MultifieldAutocompleteModule } from '../common/multifield-autocomplete/multifield-autocomplete.module';
import { FinancialInstitutionComponent } from './financial-institution.component';
import { FinancialInstitutionService } from './financial-institution.service';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    MultifieldAutocompleteModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [FinancialInstitutionComponent],
  providers: [FinancialInstitutionService],
  exports: [FinancialInstitutionComponent]
})
export class FinancialInstitutionModule { }
