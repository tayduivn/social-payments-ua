import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { PersonComponent } from './person.component';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [PersonComponent],
  exports: [PersonComponent]
})
export class PersonModule { }
