import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { PaymentsHistoryService } from './payments-history.service';

@Component({
  selector: 'sp-payments-history',
  templateUrl: './payments-history.component.html',
  styleUrls: ['./payments-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsHistoryComponent {
  constructor(public paymentsHistoryService: PaymentsHistoryService) {}
}
