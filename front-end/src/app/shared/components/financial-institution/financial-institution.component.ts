import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'sp-financial-institution',
  templateUrl: './financial-institution.component.html',
  styleUrls: ['./financial-institution.component.scss']
})
export class FinancialInstitutionComponent implements OnInit {
  public form: FormGroup;

  public readonly mfoMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  public readonly edrpouMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  public ngOnInit() {
  }

  private createForm() {
    this.form = this.fb.group({
      name: '',
      mfo: '',
      edrpou: ''
    });
  }
}
