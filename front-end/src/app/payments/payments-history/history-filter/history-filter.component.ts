import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup
} from '@angular/forms';
import * as _ from 'lodash/fp';
import { PaymentsHistoryService } from '../payments-history.service';

@Component({
  selector: 'sp-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryFilterComponent {
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

  constructor(public paymentsHistoryService: PaymentsHistoryService) {}
}
