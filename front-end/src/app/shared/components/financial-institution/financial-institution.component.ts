import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
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
  public name: FormControl;
  public mfo: FormControl;
  public edrpou: FormControl;

  constructor(
    cdRef: ChangeDetectorRef,
    fb: FormBuilder,
    public financialInstitutionService: FinancialInstitutionService
  ) {
    super(cdRef, FinancialInstitutionComponent.createForm(fb));

    this.initControls();
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
      name: ['', Validators.required],
      mfo: ['', Validators.required],
      edrpou: ['', Validators.required]
    });
  }

  private initControls() {
    this.name = <FormControl> this.form.get('name');
    this.mfo = <FormControl> this.form.get('mfo');
    this.edrpou = <FormControl> this.form.get('edrpou');
  }
}
