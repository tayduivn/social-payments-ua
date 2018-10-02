import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import * as moment from 'moment';
import { Payment } from '../../../../../../api-contracts/payment/payment';
import { dateFormat } from '../../../shared/constants/date-format';

@Component({
  selector: 'sp-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryTableComponent implements OnInit {
  @Input() public set payments(payments: Payment[]) {
    // transform date to correct format
    this.dataSource.data = payments.map((item) => Object.assign(
      {},
      item,
      {
        date: moment(item.date).format(dateFormat)
      }
    ));
  }

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

  constructor() {}

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator= this.paginator;
  }

  public paymentsTrackFn(index: number, payment: Payment): string {
    return payment._id;
  }
}
