import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'sp-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('PaymentComponent created');
  }

}
