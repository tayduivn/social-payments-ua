import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit
} from '@angular/core';
import * as _ from 'lodash';
import { delay } from 'rxjs/operators';
import { MainProgressBarItemModel } from './main-progress-bar-item.model';
import { MainProgressBarService } from './main-progress-bar.service';

@Component({
  selector: 'sp-main-progress-bar',
  templateUrl: './main-progress-bar.component.html',
  styleUrls: ['./main-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainProgressBarComponent implements OnInit {
  public progressItems: MainProgressBarItemModel[] = [];

  public progress: number = 0;

  @HostBinding('class.sp-loading-completed')
  public completed: boolean = false;

  @HostBinding('style.display')
  public displayBinding: string = 'block';

  constructor(private cdRef: ChangeDetectorRef, private mainProgressBarService: MainProgressBarService) { }

  public ngOnInit() {
    this.mainProgressBarService.progressItems$
      .subscribe((items: MainProgressBarItemModel[]) => {
        if (!items.length) {
          this.completed = true;
          setTimeout(() => {
            this.displayBinding = 'none';
            this.cdRef.markForCheck();
          }, 1000);
          return;
        }

        this.displayBinding = 'block';
        this.completed = false;
        this.progressItems = items;
        this.progress= this.getProgressWidth();
        this.cdRef.markForCheck();
      });
  }

  private getProgressWidth(): number {
    const inProgressCount = _.filter(this.progressItems, {status: null}).length;
    const completedCount = this.progressItems.length - inProgressCount;

    return Math.max(Math.ceil((completedCount * 100) / this.progressItems.length), 1);
  }
}
