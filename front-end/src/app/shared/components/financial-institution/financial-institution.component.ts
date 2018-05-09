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
import { UnsubscribableComponent } from '../common/unsubscribable-component';
import { FinancialInstitutionModel } from './financial-institution.model';
import { FinancialInstitutionService } from './financial-institution.service';

@Component({
  selector: 'sp-financial-institution',
  templateUrl: './financial-institution.component.html',
  styleUrls: ['./financial-institution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialInstitutionComponent extends UnsubscribableComponent implements OnInit, AfterViewInit {
  public form: FormGroup;

  public financialInstitutionsFiltered: Observable<FinancialInstitutionModel[]>;

  public clearButtonDisabled: boolean = true;

  private financialInstitutions: FinancialInstitutionModel[];

  @ViewChild(MatAutocomplete) private autocomplete: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) private autocompleteTrigger: MatAutocompleteTrigger;

  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private financialInstitutionService: FinancialInstitutionService) {
      super();
      this.createForm();
  }

  public ngOnInit() {
    this.componentSubscriptions = this.financialInstitutionService.getList().subscribe((res: FinancialInstitutionModel[]) => {
      this.financialInstitutions = res;
    });
  }

  public ngAfterViewInit() {
    this.autocompleteTrigger.autocomplete = this.autocomplete;
  }

  public onAutocompleteItemSelected(selectedItem: MatAutocompleteSelectedEvent) {
    this.form.patchValue(selectedItem.option.value, {emitEvent: false});
  }

  public onResetClick() {
    this.form.reset();
    this.clearButtonDisabled = true;
  }

  private createForm() {
    this.form = this.fb.group({
      id: null,
      name: '',
      mfo: '',
      edrpou: ''
    });

    this.initAutocompleteFiltering();
  }

  private initAutocompleteFiltering() {
    this.financialInstitutionsFiltered = this.form.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged((prev, curr) => {
          return Object.keys(prev).every(key => prev[key] === curr[key]);
        }),
        filter((filter: FinancialInstitutionModel) => {
          // if all fields are clear and button clear is disabled - stop process
          const stopProcessing = Object.values(filter).every(field => !field);
          this.clearButtonDisabled = stopProcessing;

          if (stopProcessing) {
            this.autocompleteTrigger.closePanel();
            this.cdRef.markForCheck();
          }

          return !stopProcessing;
        }),
        map((filter: FinancialInstitutionModel) => {
          return (this.financialInstitutions.filter((listItem: FinancialInstitutionModel) => {
            return Object.keys(filter).every((key) => {
              return listItem[key] && filter[key] ? (listItem[key]).toLowerCase().includes(filter[key].toLowerCase()) : true;
            });
          }));
        }),
        tap(() => {
          if (!this.autocomplete.isOpen) {
            this.autocompleteTrigger.openPanel();
          }
        })
      );
  }
}
