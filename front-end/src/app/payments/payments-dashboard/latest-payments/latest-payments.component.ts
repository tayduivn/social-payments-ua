import {
  Component,
  OnInit
} from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { displayDateFormat } from '../../../shared/constants/date-formats';
import { PersonHelper } from '../../../shared/utils/person.helper';
import { LatestPaymentsService } from './latest-payments.service';

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
    this.renderLoadingSubject.next(true);
    this.latestPaymentsService.queryNextFrame();
  }
}
