import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

@Component({
  selector: 'sp-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainNavComponent {}
