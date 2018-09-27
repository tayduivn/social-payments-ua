import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'sp-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryFilterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
