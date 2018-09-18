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
    this.currId = val;
    this.updateFormOnIdChange();
  }

  public get id(): string {
    return this.currId;
  }

  @Output() public idChange = new EventEmitter<string>();

  public allFieldsEmtpy: boolean = true;

  private currId: string;

  protected constructor(private cdRef: ChangeDetectorRef, public form: FormGroup) {
    this.initReset();

    this.form.valueChanges.subscribe(i => {
      this.consolidateId(null);
      this.form.patchValue({_id: this.id}, {emitEvent: false});
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
    this.currId = id;
    this.idChange.next(id);
  }

  private initReset() {
    this.form.valueChanges.subscribe((filter: FinancialInstitution) => {
      this.allFieldsEmtpy = FilterUtils.isEmpty(filter);
      this.cdRef.markForCheck();
    });
  }
}
