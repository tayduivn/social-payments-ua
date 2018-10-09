import {
  ChangeDetectorRef,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {
  skip,
  tap
} from 'rxjs/operators';
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

  @Input() public renderClearButton: boolean = true;
  @Input() public renderValidationErrors: boolean = true;

  @Output() public idChange = new EventEmitter<string>();

  public form: FormGroup;

  public allFieldsEmtpy: boolean = true;

  private currId: string = null;

  protected constructor(private cdRef: ChangeDetectorRef, protected fb: FormBuilder) {}

  protected getConditionalValidator(): ValidationErrors | null {
    return this.renderValidationErrors ? Validators.required : null;
  }

  public reset(): void {
    this.allFieldsEmtpy = true;
    this.consolidateId(null);
    this.form.reset();
    this.setFieldsValidationStatus();
  }

  public onAutocompleteItemSelected({option: {value}}): void {
    this.form.patchValue(value, {emitEvent: false});
    this.consolidateId(value._id);
  }

  protected abstract updateFormOnIdChange(): void;
  protected abstract createForm(): void;
  protected abstract initControls(): void;

  protected ngOnInit(): void {
    this.createForm();
    this.initControls();
    this.initReset();
  }

  protected initReset(): void {
    this.form.valueChanges
      .pipe(
        skip(1),
        tap(() => {
          this.consolidateId(null);
          this.form.patchValue({_id: this.id}, {emitEvent: false});
        })
      )
      .subscribe((filter: FinancialInstitution) => {
        this.allFieldsEmtpy = FilterUtils.isEmpty(filter);
        this.cdRef.markForCheck();
      });
  }

  private consolidateId(id: string): void {
    if (this.currId === id) {
      return;
    }

    this.currId = id;
    this.idChange.next(id);
  }

  private setFieldsValidationStatus(ctrl?: FormGroup) {
    if (this.currId === undefined) {
      return;
    }

    const controls = (ctrl || this.form).controls;

    Object.values(controls).forEach((ctrl: AbstractControl) => {
      if((ctrl as FormGroup).controls) {
        this.setFieldsValidationStatus(ctrl as FormGroup);
      } else {
        ctrl.markAsTouched();
      }
    });
  }
}
