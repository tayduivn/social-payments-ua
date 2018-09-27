import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { Payment } from '../../../../../../api-contracts/payment/payment';
import { UnsubscribableComponent } from '../../../shared/components/common/unsubscribable-component';
import { dateFormat } from '../../../shared/constants/date-format';
import { PaymentsHistoryService } from '../payments-history.service';

@Component({
  selector: 'sp-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryTableComponent extends UnsubscribableComponent implements OnInit {
  public readonly displayedColumns = [
    'date',
    'account',
    'bankName',
    'mfo',
    'edrpou',
    'sum',
    'fullName',
    'identityCode',
    'passport',
    'address',
    'description'
  ];

  public dataSource = new MatTableDataSource();

  @ViewChild(MatSort) private sort: MatSort;
  @ViewChild(MatPaginator) private paginator: MatPaginator;

  constructor(
    private cdRef: ChangeDetectorRef,
    private paymentsHistoryService: PaymentsHistoryService
  ) {
    super();
  }

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator= this.paginator;

    this.componentSubscriptions = this.paymentsHistoryService.getPayments()
      .pipe(
        map((payments: Payment[]) => payments.map((item) => Object.assign(
          {},
          item,
          {
            date: moment(item.date).format(dateFormat)
          }
        )))
      )
      .subscribe((payments: Payment[]) => {
        this.dataSource.data = payments;
        this.cdRef.markForCheck();
      });
  }

  public paymentsTrackFn(index: number, payment: Payment): string {
    return payment._id;
  }
}
