import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { TabbedItemsComponent } from './tabbed-items.component';
import { TabbedItemsService } from './tabbed-items.service';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule
  ],
  providers: [TabbedItemsService],
  declarations: [TabbedItemsComponent],
  exports: [TabbedItemsComponent]
})
export class TabbedItemsModule { }
