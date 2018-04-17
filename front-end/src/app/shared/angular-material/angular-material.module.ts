import { NgModule } from '@angular/core';
import {
  MatDialogModule,
  MatIconModule,
  MatTableModule
} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

const importedExports = [
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatIconModule,
  MatTableModule
];

@NgModule({
  imports: importedExports,
  exports: importedExports
})
export class AngularMaterialModule { }
