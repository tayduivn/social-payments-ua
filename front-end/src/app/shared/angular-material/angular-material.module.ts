import { NgModule } from '@angular/core';
import {
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatListModule,
  MatRadioModule,
  MatSidenavModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

const importedExports = [
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatMomentDateModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatRadioModule,
  MatSidenavModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
];

@NgModule({
  imports: importedExports,
  exports: importedExports,
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'uk'
    }
  ]
})
export class AngularMaterialModule { }
