import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import 'rxjs/add/operator/finally';
import { FinancialInstitution } from '../../../../../../api-contracts/financial-institution/financial.institution';
import { MultifiedAutocompleteCommonComponent } from '../common/multifield-autocomplete/multified-autocomplete-common.component';
import { FinancialInstitutionService } from './financial-institution.service';

@Component({
  selector: 'sp-financial-institution',
  templateUrl: './financial-institution.component.html',
  styleUrls: ['./financial-institution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialInstitutionComponent extends MultifiedAutocompleteCommonComponent implements OnInit {
  public name: FormControl;
  public mfo: FormControl;
  public edrpou: FormControl;

  constructor(
    cdRef: ChangeDetectorRef,
    fb: FormBuilder,
    public financialInstitutionService: FinancialInstitutionService
  ) {
    super(cdRef, fb);
  }

  public ngOnInit() {
    super.ngOnInit();
  }

  protected updateFormOnIdChange() {
    this.financialInstitutionService.getById(this.id).subscribe((fiItem: FinancialInstitution) => {
      if (fiItem) {
        this.form.patchValue(Object.assign({id: this.id}, fiItem), {emitEvent: false});
        this.allFieldsEmtpy = false;
      } else {
        this.reset();
      }
    });
  }

  protected createForm(): void {
    this.form = this.fb.group({
      _id: null,
      name: ['', this.getConditionalValidator()],
      mfo: ['', this.getConditionalValidator()],
      edrpou: ['', this.getConditionalValidator()]
    });
  }

  protected initControls(): void {
    this.name = <FormControl> this.form.get('name');
    this.mfo = <FormControl> this.form.get('mfo');
    this.edrpou = <FormControl> this.form.get('edrpou');
  }
}
