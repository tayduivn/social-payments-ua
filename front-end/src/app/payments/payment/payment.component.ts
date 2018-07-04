import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import * as moment from 'moment';
import { FinancialInstitutionComponent } from '../../shared/components/financial-institution/financial-institution.component';
import { PersonAccountsModel } from '../../shared/components/person-accounts/person-accounts.model';
import { PersonAccountsService } from '../../shared/components/person-accounts/person-accounts.service';
import { PersonComponent } from '../../shared/components/person/person.component';
import { PaymentService } from './payment.service';

@Component({
  selector: 'sp-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaymentService]
})
export class PaymentComponent implements OnInit, AfterViewInit {
  public form: FormGroup;

  public date: FormControl;
  public accountNumber: FormControl;
  public sum: FormControl;
  public description: FormControl;

  public financialInstitutionId: string;

  public saveButtonDisabled = true;

  @ViewChild('dateInput')
  private dateInputRef: any;
  @ViewChild(FinancialInstitutionComponent)
  private financialInstitutionComponent: FinancialInstitutionComponent;
  @ViewChild(PersonComponent)
  private personComponent: PersonComponent;

  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private personAccountsService: PersonAccountsService
  ) {
    this.createForm();
  }

  public ngOnInit() {}

  public ngAfterViewInit() {
    this.form.setControl('person', this.personComponent.form);
    this.form.setControl('financialInstitution', this.financialInstitutionComponent.form);

    this.form.statusChanges
      .subscribe(() => {
        this.saveButtonDisabled = this.form.invalid;
      });

    this.dateInputRef.nativeElement.focus();
  }

  public onSaveClick() {
    // this.paymentService.submitPayment(this.form.value).subscribe();
    console.log(this.form.value);
  }

  public onPersonIdChange(id: string) {
    if (!id) {
      this.financialInstitutionId = id;
      this.form.patchValue({accountNumber: ''});
    } else {
      this.personAccountsService.getById(id).subscribe((personAccounts: PersonAccountsModel | undefined) => {
        if (personAccounts && personAccounts.financialInstitutions.length === 1
          && personAccounts.financialInstitutions[0].accounts.length === 1) {
          const fiItem = personAccounts.financialInstitutions[0];

          this.financialInstitutionId = fiItem.financialInstitution;
          this.form.patchValue({accountNumber: fiItem.accounts[0].account});
        }
      });
    }
  }

  public onFinancialInstitutionIdChange(id: string) {
    this.form.patchValue({accountNumber: ''});
  }

  private createForm() {
    this.form = this.fb.group({
      date: [moment(Date.now()), Validators.required],
      accountNumber: ['', Validators.required],
      sum: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.required],
      person: this.fb.group({}),
      financialInstitution: this.fb.group({})
    });
    this.initControls();
  }

  private initControls() {
    this.date = <FormControl> this.form.get('date');
    this.accountNumber = <FormControl> this.form.get('accountNumber');
    this.sum = <FormControl> this.form.get('sum');
    this.description = <FormControl> this.form.get('description');
  }
}
