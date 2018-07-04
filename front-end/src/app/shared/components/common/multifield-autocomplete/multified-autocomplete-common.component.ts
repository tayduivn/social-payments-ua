import {
  ChangeDetectorRef,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterUtils } from '../../../utils/filter-utils';
import { FinancialInstitutionModel } from '../../financial-institution/financial-institution.model';
import { PersonModel } from '../../person/person.model';

export abstract class MultifiedAutocompleteCommonComponent {
  @Input()
  public set id(val: string) {
    this._id = val;
    this.updateFormOnIdChange();
  }

  public get id(): string {
    return this._id;
  }

  @Output() public idChange = new EventEmitter<string>();

  public allFieldsEmtpy: boolean = true;

  private _id: string;

  protected constructor(private cdRef: ChangeDetectorRef, public form: FormGroup) {
    this.initReset();

    this.form.valueChanges.subscribe(i => {
      this.consolidateId(null);
      this.form.patchValue({id: this.id}, {emitEvent: false});
    });
  }

  public reset() {
    this.allFieldsEmtpy = true;
    this.consolidateId(null);
    this.form.reset();
  }

  public onAutocompleteItemSelected({option: {value}}) {
    this.form.patchValue(value, {emitEvent: false});
    this.consolidateId(value.id);
  }

  protected abstract updateFormOnIdChange(): void;

  private consolidateId(id: string) {
    this._id = id;
    this.idChange.next(id);
  }

  private initReset() {
    this.form.valueChanges.subscribe((filter: FinancialInstitutionModel) => {
      this.allFieldsEmtpy = FilterUtils.isEmpty(filter);
      this.cdRef.markForCheck();
    });
  }
}
