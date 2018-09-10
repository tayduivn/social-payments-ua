import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'sp-payments-history',
  templateUrl: './payments-history.component.html',
  styleUrls: ['./payments-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('adsf');
  }

}
