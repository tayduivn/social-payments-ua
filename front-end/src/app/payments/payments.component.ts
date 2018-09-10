import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { paymentsConfig } from './payments.config';

@Component({
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsComponent {
  public paymentComponentItems = paymentsConfig;

  constructor() {}
}
