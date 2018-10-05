import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Output
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup
} from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Moment } from 'moment';
import { PaymentsFilter } from '../../../../../../api-contracts/payment/payments-filter';

@Component({
  selector: 'sp-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryFilterComponent {
  @Output() public filterChange = new EventEmitter<PaymentsFilter>();

  public toggleExpanded: boolean = true;

  public readonly searchForm = new FormGroup({
    dateFrom: new FormControl(),
    dateTo: new FormControl(),
    sumFrom: new FormControl(),
    sumTo: new FormControl(),
    searchPhrase: new FormControl()
  }, [
    (form: AbstractControl): {[key: string]: any} | null => {
      const searchFormEmpty = _.compact(Object.values(form.value)).length === 0;

      return searchFormEmpty ? {searchFormEmpty} : null;
    }
  ]);

  @HostListener('keyup.enter') private onEnter() {
    if (this.searchForm.valid) {
      this.onSearchClick();
    }
  }

  constructor() {}

  public onSearchClick() {
    this.filterChange.emit(
      _.mapValues(this.searchForm.value, (val: Moment) => moment.isMoment(val) ? val.toISOString() : val)
    );
  }
}
