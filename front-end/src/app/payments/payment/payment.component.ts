import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { PersonAccounts } from '../../../../../api-contracts/person-accounts/person-accounts';
import { TabbedItemsService } from '../../layout/tabbed-items/tabbed-items.service';
import { UnsubscribableComponent } from '../../shared/components/common/unsubscribable-component';
import { FinancialInstitutionComponent } from '../../shared/components/financial-institution/financial-institution.component';
import { PersonAccountSelectedModel } from '../../shared/components/person-accounts/person-account-selected.model';
import { PersonAccountsService } from '../../shared/components/person-accounts/person-accounts.service';
import { PersonComponent } from '../../shared/components/person/person.component';
import { apiDateFormat } from '../../shared/constants/date-formats';
import { PaymentService } from './payment.service';
import { SelectPersonAccountDialogComponent } from './select-person-account-dialog/select-person-account-dialog.component';
import { SelectPersonAccountDialogService } from './select-person-account-dialog/select-person-account-dialog.service';
import { CodeKEKComponent } from '../../shared/components/code-kek/code-kek.component';
import { CodeKFKComponent } from '../../shared/components/code-kfk/code-kfk.component';
import { Payment } from '../../../../../api-contracts/payment/payment';
import { SpDialogType } from '../../shared/components/dialog/sp-dialog-type.enum';
import { filter, switchMap } from 'rxjs/operators';
import { SpDialogService } from '../../shared/components/dialog/sp-dialog.service';

@Component({
  selector: 'sp-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaymentService]
})
export class PaymentComponent extends UnsubscribableComponent implements OnInit, AfterViewInit {
  @Input() id: string;

  public readonly autocompleteClasses = 'sp-new-payment-autocomplete';

  public form: FormGroup;
  public financialInstitutionId: string;
  public editMode = false;

  @ViewChild('dateInput')
  private dateInputRef: any;
  @ViewChild('sumInput')
  private sumInput: any;
  @ViewChild(FinancialInstitutionComponent)
  private financialInstitutionComponent: FinancialInstitutionComponent;
  @ViewChild(PersonComponent)
  private personComponent: PersonComponent;
  @ViewChild(CodeKFKComponent)
  private codeKFKComponent: CodeKFKComponent;
  @ViewChild(CodeKEKComponent)
  private codeKEKComponent: CodeKEKComponent;

  private payment: Payment = {} as any;

  constructor(
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private personAccountsService: PersonAccountsService,
    private selectPersonAccountDialogService: SelectPersonAccountDialogService,
    private tabbedItemsService: TabbedItemsService,
    private spDialogService: SpDialogService
  ) {
    super();
    this.createForm();
  }

  public async ngOnInit() {
    this.componentSubscriptions.add(this.selectPersonAccountDialogService.accountSelected$
      .subscribe(this.onPersonAccountSelected.bind(this)));

    if (this.id) {
      this.payment = await this.paymentService.get(this.id).toPromise();
      this.editMode = true;
    }

    this.createForm(this.payment);
  }

  public ngAfterViewInit() {
    this.form.setControl('person', this.personComponent.form);
    this.form.setControl('financialInstitution', this.financialInstitutionComponent.form);
    this.form.setControl('codeKFK', this.codeKFKComponent.codeKFK);
    this.form.setControl('codeKEK', this.codeKEKComponent.codeKEK);
  }

  public onSaveClick() {
    this.paymentService.submit(this.form.value)
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

  public removePayment(): void {
    this.spDialogService.open({
      type: SpDialogType.Confirm,
      text: 'Ви справді бажаєте видалити платіж?'
    }).pipe(
      filter((confirmed: boolean) => confirmed),
      switchMap(() => this.paymentService.remove(this.id)),
    )
      .subscribe(() => {
        this.tabbedItemsService.closeActiveTab();

        this.spDialogService.open({
          type: SpDialogType.Alert,
          text: 'Платіж видалено'
        });
      });
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

  private createForm(payment: Payment = {} as any) {
    this.form = this.fb.group({
      date: [moment(payment.date || Date.now()).format(apiDateFormat), Validators.required],
      reportNumber: [payment.reportNumber || '', Validators.required],
      accountNumber: [payment.accountNumber || ''],
      codeKFK: [''],
      codeKEK: [''],
      sum: [payment.sum || '', [Validators.required, Validators.min(0.01)]],
      description: [payment.description || '', Validators.required],
      person: this.fb.group({}),
      financialInstitution: this.fb.group({})
    });
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
