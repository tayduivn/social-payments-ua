import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { reportsConfig } from './reports.config';

@Component({
  selector: 'sp-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsComponent {
  public readonly reportComponentItems = reportsConfig;

  constructor() {}
}
