import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {
  NavigationEnd,
  Router
} from '@angular/router';
import {
  filter,
  map
} from 'rxjs/operators';

@Component({
  selector: 'sp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public renderMenu: boolean;

  constructor(private cdRef: ChangeDetectorRef, private router: Router) {}

  public ngOnInit() {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map((e: NavigationEnd) => e.url)
      )
      .subscribe((url: string) => {
        this.renderMenu = url !== '/login';
        this.cdRef.markForCheck();
      });
  }
}