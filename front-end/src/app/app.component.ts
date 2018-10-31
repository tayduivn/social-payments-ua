import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router
} from '@angular/router';
import {
  filter,
  map,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'sp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public renderMenu: boolean;
  public mainSpinnerHidden = true;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}

  public ngOnInit() {
    this.router.events
      .pipe(
        tap((e) => {
          if (e instanceof NavigationStart) {
            // first time do nut show it until first route ends
            // this.mainSpinnerHidden = false && this.mainSpinnerHidden !== null;
          } else if (e instanceof NavigationEnd) {
            // setTimeout(() => {
            //   this.mainSpinnerHidden = true;
            //   this.cdRef.markForCheck();
            // }, 500)
          }
       }),
        filter(e => e instanceof NavigationEnd),
        map((e: NavigationEnd) => e.url)
      )
      .subscribe((url: string) => {
        this.renderMenu = url !== '/login';
        this.cdRef.markForCheck();
      });
  }
}
