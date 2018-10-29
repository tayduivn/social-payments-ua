import {
  Component,
  OnInit
} from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { merge } from 'rxjs/internal/observable/merge';
import { Observable } from 'rxjs/Observable';
import {
  map,
  tap
} from 'rxjs/operators';
import { displayDateFormat } from '../../../shared/constants/date-formats';
import { LatestPaymentsService } from './latest-payments.service';
import { PersonHelper } from '../../../shared/utils/person.helper';

@Component({
  selector: 'sp-latest-payments',
  templateUrl: './latest-payments.component.html',
  styleUrls: ['./latest-payments.component.scss']
})
export class LatestPaymentsComponent implements OnInit {
  public readonly moment = moment;
  public readonly displayDateFormat = displayDateFormat;
  public readonly PersonHelper = PersonHelper;

  public renderLoading$: Observable<boolean>;

  private renderLoadingSubject = new BehaviorSubject(true);

  constructor(public latestPaymentsService: LatestPaymentsService) {
    this.renderLoading$ = this.renderLoadingSubject.asObservable();
  }

  public ngOnInit() {
    this.latestPaymentsService.items$
      .pipe(
        map((items) => !items.length)
      )
      .subscribe(
        (renderLoading) => this.renderLoadingSubject.next(renderLoading)
      );

    this.latestPaymentsService.sourceExhausted$
      .subscribe((exhausted) => {
        if (exhausted) {
          this.renderLoadingSubject.next(false);
          this.renderLoadingSubject.complete();
        }
      })
  }

  public onScrollBottom(): void {
    console.log('onScrollBottom');
    this.renderLoadingSubject.next(true);
    this.latestPaymentsService.queryNextFrame();
  }
}
