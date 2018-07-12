import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { PeriodReportRange } from './period-report-range.enum';

@Component({
  selector: 'sp-period-report',
  templateUrl: './period-report.component.html',
  styleUrls: ['./period-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodReportComponent {
  public PeriodReportRange = PeriodReportRange;

  public datePeriodDisabled: boolean = true;

  constructor() { }

  public selectedRangeChange(val: {value: PeriodReportRange}) {
    console.log('asdfasdfasdf');
    this.datePeriodDisabled = val.value !== PeriodReportRange.Range;
  }
}
