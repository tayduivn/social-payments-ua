import {
  Component,
  OnInit
} from '@angular/core';
import { PaymentsConfig } from './payments.config';

@Component({
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  public paymentComponentItems = PaymentsConfig;

  constructor() {}

  ngOnInit() {
  }
}
