import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { SpDialogComponent } from './sp-dialog.component';
import { SpDialogService } from './sp-dialog.service';
import {SharedModule} from '../../shared.module';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    SharedModule
  ],
  declarations: [SpDialogComponent],
  entryComponents: [SpDialogComponent],
  providers: [SpDialogService]
})
export class SpDialogModule { }
