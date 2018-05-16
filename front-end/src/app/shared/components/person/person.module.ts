import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { MultifieldAutocompleteModule } from '../common/multifield-autocomplete/multifield-autocomplete.module';
import { PersonComponent } from './person.component';
import { PersonService } from './person.service';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    MultifieldAutocompleteModule,
    PerfectScrollbarModule,
    ReactiveFormsModule
  ],
  declarations: [PersonComponent],
  providers: [PersonService],
  exports: [PersonComponent]
})
export class PersonModule { }
