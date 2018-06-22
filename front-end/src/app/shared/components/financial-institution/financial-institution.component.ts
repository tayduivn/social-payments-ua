import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/finally';
import { MultifiedAutocompleteCommonComponent } from '../common/multifield-autocomplete/multified-autocomplete-common.component';
import { FinancialInstitutionService } from './financial-institution.service';

@Component({
  selector: 'sp-financial-institution',
  templateUrl: './financial-institution.component.html',
  styleUrls: ['./financial-institution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialInstitutionComponent extends MultifiedAutocompleteCommonComponent {
  constructor(
    cdRef: ChangeDetectorRef,
    fb: FormBuilder,
    public financialInstitutionService: FinancialInstitutionService
  ) {
    super(cdRef, FinancialInstitutionComponent.createForm(fb));
  }

  protected updateFormOnIdChange() {
    const fiItem = this.financialInstitutionService.getById(this.id);

    if (fiItem) {
      this.form.patchValue(Object.assign({id: this.id}, fiItem), {emitEvent: false});
      this.allFieldsEmtpy = false;
    } else {
      this.reset();
    }
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
