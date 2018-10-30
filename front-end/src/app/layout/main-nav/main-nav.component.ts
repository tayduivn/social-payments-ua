import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { CurrentUserService } from '../../shared/services/current-user.service';

@Component({
  selector: 'sp-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainNavComponent {
  constructor(public currentUserService: CurrentUserService) {}
}
