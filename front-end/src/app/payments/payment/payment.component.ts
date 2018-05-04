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
import { FinancialInstitutionModel } from '../../shared/components/financial-institution/financial-institution.model';
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
  private a: any = {};
  constructor(private fb: FormBuilder, private paymentService: PaymentService) {
    this.createForm();
  }

  public ngOnInit() {
    console.log('PaymentComponent created');
  }

  public ngAfterViewInit() {
    this.form.setControl('person', this.personComponent.form);
    this.form.setControl('financialInstitution', this.financialInstitutionComponent.form);
  }

  public onSaveClick() {
    this.a = this.paymentService.submitPayment(this.form.value).subscribe((e) => {
      console.log('payment submitted result', e);
    });
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
