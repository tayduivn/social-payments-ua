import { ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterUtils } from '../../../utils/filter-utils';
import { FinancialInstitutionModel } from '../../financial-institution/financial-institution.model';

export class MultifiedAutocompleteCommonComponent {
  public allFieldsEmtpy: boolean = true;

  constructor(private cdRef: ChangeDetectorRef, public form: FormGroup) {
    this.initReset();
  }

  public onResetClick() {
    this.allFieldsEmtpy = true;
    this.form.reset();
  }

  private initReset() {
    this.form.valueChanges.subscribe((filter: FinancialInstitutionModel) => {
      this.allFieldsEmtpy = FilterUtils.isEmpty(filter);
      this.cdRef.markForCheck();
    });
  }
}
