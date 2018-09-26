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
  MatPaginatorIntl,
  MatPaginatorModule,
  MatRadioModule,
  MatSidenavModule,
  MatSortModule,
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
  MatPaginatorModule,
  MatRadioModule,
  MatSidenavModule,
  MatSortModule,
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
    },
    MatPaginatorIntl
  ]
})
export class AngularMaterialModule {
  constructor(private matPaginatorIntl: MatPaginatorIntl) {
    this.initPaginatorLabels();
  }

  private initPaginatorLabels() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Записів на сторінку';

    this.matPaginatorIntl.firstPageLabel = 'Перша сторінка';
    this.matPaginatorIntl.lastPageLabel = 'Остання сторінка';
    this.matPaginatorIntl.nextPageLabel = 'Наступна сторінка';
    this.matPaginatorIntl.lastPageLabel = 'Попередня сторінка';

    // copied from lib documentation
    this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length == 0 || pageSize == 0) {
        return `0 із ${length}`;
      }

      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} із ${length}`;
    };
  }
}
