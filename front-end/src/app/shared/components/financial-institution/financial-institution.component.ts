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
