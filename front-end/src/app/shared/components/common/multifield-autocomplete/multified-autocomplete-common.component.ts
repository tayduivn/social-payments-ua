import {
  ChangeDetectorRef,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FinancialInstitution } from '../../../../../../../api-contracts/financial-institution/financial.institution';
import { FilterUtils } from '../../../utils/filter-utils';

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
    this.consolidateId(value._id);
  }

  protected abstract updateFormOnIdChange(): void;

  private consolidateId(id: string) {
    this._id = id;
    this.idChange.next(id);
  }

  private initReset() {
    this.form.valueChanges.subscribe((filter: FinancialInstitution) => {
      this.allFieldsEmtpy = FilterUtils.isEmpty(filter);
      this.cdRef.markForCheck();
    });
  }
}
