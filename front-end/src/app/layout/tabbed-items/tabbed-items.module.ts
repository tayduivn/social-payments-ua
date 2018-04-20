import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { TabbedItemsComponent } from './tabbed-items.component';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule
  ],
  declarations: [TabbedItemsComponent],
  exports: [TabbedItemsComponent]
})
export class TabbedItemsModule { }
