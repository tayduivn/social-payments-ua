import { NgModule } from '@angular/core';
import {
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

const importedExports = [
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatSidenavModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatToolbarModule
];

@NgModule({
  imports: importedExports,
  exports: importedExports
})
export class AngularMaterialModule { }
