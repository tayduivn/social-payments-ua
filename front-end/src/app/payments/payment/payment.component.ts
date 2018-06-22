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
  FormGroup
} from '@angular/forms';
import { FinancialInstitutionComponent } from '../../shared/components/financial-institution/financial-institution.component';
import { FinancialInstitutionModel } from '../../shared/components/financial-institution/financial-institution.model';
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

  public financialInstitutionId: string;

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
  }

  public onSaveClick() {
    // this.paymentService.submitPayment(this.form.value).subscribe();
    console.log(this.form.value);
  }

  public onPersonIdChange(id: string) {
    if (!id) {
      this.financialInstitutionId = id;
      this.form.patchValue({accountNumber: ''})
    } else {
      this.personAccountsService.getById(id).subscribe((personAccounts: PersonAccountsModel | undefined) => {
        if (personAccounts && personAccounts.financialInstitutions.length === 1
          && personAccounts.financialInstitutions[0].accounts.length === 1) {
          const fiItem = personAccounts.financialInstitutions[0];

          this.financialInstitutionId = fiItem.financialInstitution;
          this.form.patchValue({accountNumber: fiItem.accounts[0].account})
        }
      })
    }
  }

  private createForm() {
    this.form = this.fb.group({
      date: '',
      accountNumber: '',
      sum: 0,
      description: '',
      person: this.fb.group({}),
      financialInstitution: this.fb.group({})
    });
  }
}
