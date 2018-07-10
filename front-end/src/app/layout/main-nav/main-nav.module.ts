import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { MainNavComponent } from './main-nav.component';

@NgModule({
  imports: [
    RouterModule,
    AngularMaterialModule
  ],
  declarations: [MainNavComponent],
  exports: [MainNavComponent]
})
export class MainNavModule { }
