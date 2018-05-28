import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { FinancialInstitutionComponent } from '../../shared/components/financial-institution/financial-institution.component';
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

  @ViewChild(FinancialInstitutionComponent)
  private financialInstitutionComponent: FinancialInstitutionComponent;

  @ViewChild(PersonComponent)
  private personComponent: PersonComponent;
  constructor(private fb: FormBuilder, private paymentService: PaymentService) {
    this.createForm();
  }

  public ngOnInit() {
    this.paymentService.getPersonAccounts().subscribe(() => {
      console.log('QUYER');
    });
  }

  public ngAfterViewInit() {
    this.form.setControl('person', this.personComponent.form);
    this.form.setControl('financialInstitution', this.financialInstitutionComponent.form);
  }

  public onSaveClick() {
    this.paymentService.submitPayment(this.form.value).subscribe();
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
