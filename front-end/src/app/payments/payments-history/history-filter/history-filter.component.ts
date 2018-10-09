import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Output,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup
} from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment';
import { FinancialInstitutionComponent } from '../../../shared/components/financial-institution/financial-institution.component';
import { PersonComponent } from '../../../shared/components/person/person.component';
import { HistoryFilterModel } from '../shared/history-filter.model';

@Component({
  selector: 'sp-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryFilterComponent implements AfterViewInit {
  @Output() public filterChange = new EventEmitter<HistoryFilterModel>();

  @ViewChild(FinancialInstitutionComponent)
  private financialInstitutionComponent: FinancialInstitutionComponent;
  @ViewChild(PersonComponent)
  private personComponent: PersonComponent;

  public toggleExpanded: boolean = true;

  public readonly searchForm = new FormGroup({
    datesRange: new FormGroup({
      dateFrom: new FormControl(),
      dateTo: new FormControl(),
    }),
    sumRange: new FormGroup({
      sumFrom: new FormControl(),
      sumTo: new FormControl(),
    }),
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

  public ngAfterViewInit() {
    this.searchForm.setControl('person', this.personComponent.form);
    this.searchForm.setControl('financialInstitution', this.financialInstitutionComponent.form);
  }

  public onSearchClick() {
    const normalizedInputs = _.mapValues(
      this.searchForm.value,
      (val: any) => moment.isMoment(val) ? val.toISOString() : val
    );

    // as any since failed to assert correct type for lodash mapValues
    this.filterChange.emit(normalizedInputs as any);
  }
}
