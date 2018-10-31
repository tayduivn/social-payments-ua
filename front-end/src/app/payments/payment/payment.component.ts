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
import { PersonAccounts } from '../../../../../api-contracts/person-accounts/person-accounts';
import { TabbedItemsService } from '../../layout/tabbed-items/tabbed-items.service';
import { UnsubscribableComponent } from '../../shared/components/common/unsubscribable-component';
import { FinancialInstitutionComponent } from '../../shared/components/financial-institution/financial-institution.component';
import { PersonAccountSelectedModel } from '../../shared/components/person-accounts/person-account-selected.model';
import { PersonAccountsService } from '../../shared/components/person-accounts/person-accounts.service';
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
  public readonly autocompleteClasses = 'sp-new-payment-autocomplete';

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
    private selectPersonAccountDialogService: SelectPersonAccountDialogService,
    private tabbedItemsService: TabbedItemsService
  ) {
    super();
    this.createForm();
  }

  public ngOnInit() {
    this.componentSubscriptions.add(this.selectPersonAccountDialogService.accountSelected$
      .subscribe(this.onPersonAccountSelected.bind(this)));
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
    this.paymentService.submitPayment(this.form.value)
      .subscribe(() => {
        this.tabbedItemsService.closeActiveTab(0);
        this.cdRef.markForCheck();
      });
  }

  public onCancelClick() {
    this.tabbedItemsService.closeActiveTab();
  }

  public onPersonIdChange(id: string) {
    if (id) {
      this.personAccountsService.getByUserId(id).subscribe((personAccounts: PersonAccounts) => {
        if (personAccounts) {
          this.processPersonAccounts(personAccounts);
        }
      });
    } else {
      this.financialInstitutionId = null;
      this.updateAccountNumber('');
    }
  }

  public onFinancialInstitutionIdChange(id: string) {
    this.updateAccountNumber('');
  }

  private processPersonAccounts(personAccounts: PersonAccounts) {
    const fiInfo = personAccounts.financialInstitutions;
    const fiItem = fiInfo[0];

    if (fiInfo.length === 1 && fiItem.accounts.length === 1) {
      this.setFinancialInstitutionAndAccount(fiItem.financialInstitutionId, fiItem.accounts[0].account);
    } else {
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
      accountNumber: [''],
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
    this.setFinancialInstitutionAndAccount(accountSelected.financialInstitution.financialInstitutionId, accountSelected.account.account);
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
