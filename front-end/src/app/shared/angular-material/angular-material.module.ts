import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

const importedExports = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatSidenavModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
];

@NgModule({
  imports: importedExports,
  exports: importedExports
})
export class AngularMaterialModule { }
