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
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { UnsubscribableComponent } from '../../shared/components/common/unsubscribable-component';
import { FinancialInstitutionComponent } from '../../shared/components/financial-institution/financial-institution.component';
import { PersonAccountSelectedModel } from '../../shared/components/person-accounts/person-account-selected.model';
import { PersonAccountsModel } from '../../shared/components/person-accounts/person-accounts.model';
import { PersonAccountsService } from '../../shared/components/person-accounts/person-accounts.service';
import { PersonFinancialInstitutionsModel } from '../../shared/components/person-accounts/person-financial-institutions.model';
import { PersonComponent } from '../../shared/components/person/person.component';
import { PaymentService } from './payment.service';
import { SelectPersonAccountDialogComponent } from './select-person-account-dialog/select-person-account-dialog.component';
import { SelectPersonAccountDialogService } from './select-person-account-dialog/select-person-account-dialog.service';

@Component({
  selector: 'sp-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaymentService]
})
export class PaymentComponent extends UnsubscribableComponent implements OnInit, AfterViewInit {
  public form: FormGroup;

  public date: FormControl;
  public accountNumber: FormControl;
  public sum: FormControl;
  public description: FormControl;

  public financialInstitutionId: string;

  public saveButtonDisabled = true;

  @ViewChild('dateInput')
  private dateInputRef: any;
  @ViewChild('sumInput')
  private sumInput: any;
  @ViewChild(FinancialInstitutionComponent)
  private financialInstitutionComponent: FinancialInstitutionComponent;
  @ViewChild(PersonComponent)
  private personComponent: PersonComponent;

  constructor(
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private personAccountsService: PersonAccountsService,
    private selectPersonAccountDialogService: SelectPersonAccountDialogService
  ) {
    super();
    this.createForm();
  }

  public ngOnInit() {
    this.componentSubscriptions = this.selectPersonAccountDialogService.accountSelected$
      .subscribe(this.onPersonAccountSelected.bind(this));
  }

  public ngAfterViewInit() {
    this.form.setControl('person', this.personComponent.form);
    this.form.setControl('financialInstitution', this.financialInstitutionComponent.form);

    this.form.statusChanges
      .subscribe(() => {
        this.saveButtonDisabled = this.form.invalid;
      });
  }

  public onSaveClick() {
    this.paymentService.submitPayment(this.form.value).subscribe();
  }

  public onPersonIdChange(id: string) {
    if (!id) {
      this.financialInstitutionId = id;
      this.updateAccountNumber('');
    } else {
      this.personAccountsService.getById(id).subscribe((personAccounts: PersonAccountsModel | undefined) => {
        if (personAccounts) {
          this.processPersonAccounts(personAccounts);
        }
      });
    }
  }

  public onFinancialInstitutionIdChange(id: string) {
    this.updateAccountNumber('');
  }

  private processPersonAccounts(personAccounts: PersonAccountsModel) {
    const fiInfo = personAccounts.financialInstitutions;
    const fiItem = fiInfo[0];

    if (fiInfo.length === 1 && fiItem.accounts.length === 1) {
      this.setFinancialInstitutionAndAccount(fiItem.financialInstitution, fiItem.accounts[0].account);
    } else if (fiInfo.length > 1 && fiItem.accounts.length > 1) {
      this.selectPersonAccountDialogService.setDialogRef(this.dialog.open(SelectPersonAccountDialogComponent, {
        data: personAccounts
      }));
    }
  }

  private updateAccountNumber(accountNumber: string) {
    this.form.patchValue({accountNumber});
  }

  private updateFinancialInstitutionId(id: string) {
    this.financialInstitutionId = id;
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

  private onPersonAccountSelected(accountSelected: PersonAccountSelectedModel) {
    this.setFinancialInstitutionAndAccount(accountSelected.financialInstitution.financialInstitution, accountSelected.account.account);
  }

  private setFinancialInstitutionAndAccount(fiId: string, account: string) {
    this.updateFinancialInstitutionId(fiId);
    this.updateAccountNumber(account);
    this.focusSumInput();
  }

  private focusSumInput() {
    this.sumInput.nativeElement.focus();
    this.cdRef.markForCheck();
  }
}