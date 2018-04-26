import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { PersonComponent } from './person.component';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    TextMaskModule,
    ReactiveFormsModule
  ],
  declarations: [PersonComponent],
  exports: [PersonComponent]
})
export class PersonModule { }
