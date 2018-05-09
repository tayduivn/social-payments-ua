import {
  AfterViewInit,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
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
import { UnaryFunction } from 'rxjs/src/interfaces';
import { pipe } from 'rxjs/util/pipe';
import { FinancialInstitutionModel } from '../../financial-institution/financial-institution.model';
import { UnsubscribableComponent } from '../unsubscribable-component';

export abstract class MultifieldAutocompleteComponent extends UnsubscribableComponent implements AfterViewInit {
  public allFieldsEmtpy: boolean = true;

  @ViewChild(MatAutocomplete) protected autocomplete: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) protected autocompleteTrigger: MatAutocompleteTrigger;

  protected readonly autocompleteFiltering: UnaryFunction<Object, Object>;

  protected constructor(
    public form: FormGroup,
    private cdRef: ChangeDetectorRef) {
      super();

      this.autocompleteFiltering = this.getAutocompleteFiltering();
  }

  public onAutocompleteItemSelected(selectedItem: MatAutocompleteSelectedEvent) {
    this.form.patchValue(selectedItem.option.value, {emitEvent: false});
  }

  public onResetClick() {
    this.form.reset();
    this.allFieldsEmtpy = true;
  }

  public ngAfterViewInit() {
    this.autocompleteTrigger.autocomplete = this.autocomplete;
  }

  private getAutocompleteFiltering() {
    return pipe(
      debounceTime(300),
      distinctUntilChanged((prev, curr) => {
        return Object.keys(prev).every(key => prev[key] === curr[key]);
      }),
      filter((filter: Object) => {
        // if all fields are clear and button clear is disabled - stop process
        this.allFieldsEmtpy = Object.values(filter).every(field => !field);

        if (this.allFieldsEmtpy) {
          this.autocompleteTrigger.closePanel();
          this.cdRef.markForCheck();
        }

        return !this.allFieldsEmtpy;
      }),
      tap(() => {
        if (!this.autocomplete.isOpen) {
          this.autocompleteTrigger.openPanel();
        }
      })
    );
  }}
