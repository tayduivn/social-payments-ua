import { map } from 'rxjs/operators';
import * as FileSaver from 'file-saver';
import { TabbedItemsService } from '../../layout/tabbed-items/tabbed-items.service';
import { HttpClient } from '@angular/common/http';

export class ReportCommon {
  constructor(
    protected tabbedItemsService: TabbedItemsService,
    protected http: HttpClient
  ) {}

  protected saveReport(url: string): void {
    this.http.get(url, {responseType: 'blob'})
      .pipe(
        map((response) => {
          return {
            data: new Blob([response], {type: 'application/vnd.ms-excel;charset=utf-8'}),
            filename : 'test.xlsx'
          };
        })
      )
      .subscribe(
        (res) => {
          this.tabbedItemsService.closeActiveTab();
          FileSaver.saveAs(res.data, res.filename);
        }
      )
  }

}
