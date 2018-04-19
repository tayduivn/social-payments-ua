import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule // for outlet
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
