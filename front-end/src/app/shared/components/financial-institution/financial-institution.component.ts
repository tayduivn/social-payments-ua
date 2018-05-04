import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
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
import { Observable } from 'rxjs/Observable';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  tap
} from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { FinancialInstitutionModel } from './financial-institution.model';
import { FinancialInstitutionService } from './financial-institution.service';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'sp-financial-institution',
  templateUrl: './financial-institution.component.html',
  styleUrls: ['./financial-institution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialInstitutionComponent implements OnInit, AfterViewInit, OnDestroy {
  public form: FormGroup;

  public readonly mfoMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  public readonly edrpouMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

  public financialInstitutionsFiltered: Observable<FinancialInstitutionModel[]>;

  public clearButtonDisabled: boolean = true;

  private financialInstitutions: FinancialInstitutionModel[];

  private componentSubscriptions: Subscription;

  @ViewChild(MatAutocomplete) private autocomplete: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) private autocompleteTrigger: MatAutocompleteTrigger;

  @ViewChild('autocompleteContainer', {
    read: ElementRef
  }) private autocompleteContainer: ElementRef;

  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private financialInstitutionService: FinancialInstitutionService) {
      this.createForm();
  }

  public ngOnInit() {
    this.componentSubscriptions = this.financialInstitutionService.getList().subscribe((res: FinancialInstitutionModel[]) => {
      this.financialInstitutions = res;
    });
  }

  public ngAfterViewInit() {
    this.autocomplete.panel = this.autocompleteContainer;
    this.autocompleteTrigger.autocomplete = this.autocomplete;
  }

  public ngOnDestroy() {
    if (this.componentSubscriptions) {
      this.componentSubscriptions.unsubscribe();
    }
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
          const stopProcessing = Object.keys(filter).every(key => !filter[key]);
          this.clearButtonDisabled = stopProcessing;

          if (stopProcessing) {
            this.autocompleteTrigger.closePanel();
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
        tap((a) => {
          // debugger;
          if (!this.autocomplete.isOpen) {
            this.autocompleteTrigger.openPanel();
          }
        })
      );
  }
}
