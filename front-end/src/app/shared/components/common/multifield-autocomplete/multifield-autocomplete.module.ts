import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { MultifieldAutocompleteComponent } from './multifield-autocomplete.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    PerfectScrollbarModule
  ],
  declarations: [MultifieldAutocompleteComponent],
  exports: [MultifieldAutocompleteComponent]
})
export class MultifieldAutocompleteModule { }
