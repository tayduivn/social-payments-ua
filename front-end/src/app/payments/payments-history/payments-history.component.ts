import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { UnsubscribableComponent } from '../../shared/components/common/unsubscribable-component';
import { dateFormat } from '../../shared/constants/date-format';
import { PaymentModel } from '../shared/payment.model';
import { PaymentsHistoryService } from './payments-history.service';

@Component({
  selector: 'sp-payments-history',
  templateUrl: './payments-history.component.html',
  styleUrls: ['./payments-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsHistoryComponent extends UnsubscribableComponent implements OnInit {
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

  public paymentsDataSource = new MatTableDataSource();

  constructor(
    private cdRef: ChangeDetectorRef,
    private paymentsHistoryService: PaymentsHistoryService
  ) {
    super();
  }

  ngOnInit() {
    this.componentSubscriptions = this.paymentsHistoryService.getPayments()
      .pipe(
        map((payments: PaymentModel[]) => payments.map((item) => Object.assign(
          {},
          item,
          {
            date: moment(item.date).format(dateFormat)
          }
        )))
      )
      .subscribe((payments: PaymentModel[]) => {
        this.paymentsDataSource.data = payments;
        this.cdRef.markForCheck();
      });
  }

  public paymentsTrackFn(index: number, payment: PaymentModel): string {
    return payment.id;
  }
}
