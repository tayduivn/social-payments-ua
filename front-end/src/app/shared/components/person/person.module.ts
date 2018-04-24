import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { PersonComponent } from './person.component';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule
  ],
  declarations: [PersonComponent],
  exports: [PersonComponent]
})
export class PersonModule { }
