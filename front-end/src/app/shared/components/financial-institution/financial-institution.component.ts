import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger
} from '@angular/material';
import 'rxjs/add/operator/finally';
import { Observable } from 'rxjs/Observable';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  tap
} from 'rxjs/operators';
import { MultifieldAutocompleteComponent } from '../common/multifield-autocomplete/multifield-autocomplete.component';
import { FinancialInstitutionModel } from './financial-institution.model';
import { FinancialInstitutionService } from './financial-institution.service';

@Component({
  selector: 'sp-financial-institution',
  templateUrl: './financial-institution.component.html',
  styleUrls: ['./financial-institution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialInstitutionComponent extends MultifieldAutocompleteComponent implements OnInit, AfterViewInit {
  public financialInstitutionsFiltered: Observable<FinancialInstitutionModel[]>;

  private financialInstitutions: FinancialInstitutionModel[];

  constructor(
    cdRef: ChangeDetectorRef,
    fb: FormBuilder,
    private financialInstitutionService: FinancialInstitutionService) {
      super(FinancialInstitutionComponent.createForm(fb), cdRef);
  }

  public ngOnInit() {
    this.componentSubscriptions = this.financialInstitutionService.getList().subscribe((res: FinancialInstitutionModel[]) => {
      this.financialInstitutions = res;
    });

    this.initFiltering();
  }

  private initFiltering() {
    this.financialInstitutionsFiltered = this.form.valueChanges
      .pipe(this.autocompleteFiltering.bind(this))
      .pipe(map(this.financialInstitutionsFilter.bind(this)));
  }

  private financialInstitutionsFilter(filter: FinancialInstitutionModel) {
    return this.financialInstitutions.filter((listItem: FinancialInstitutionModel) => {
      return Object.keys(filter).every((key) => {
        return listItem[key] && filter[key] ? (listItem[key]).toLowerCase().includes(filter[key].toLowerCase()) : true;
      });
    });
  }

  private static createForm(fb: FormBuilder) {
    return fb.group({
      id: null,
      name: '',
      mfo: '',
      edrpou: ''
    });
  }
}
