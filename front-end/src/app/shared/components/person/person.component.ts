import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'sp-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  public ngOnInit() {
  }

  private createForm() {
    this.form = this.fb.group({
      fullName: '',
      passportNumber: '',
      identityCode: '',
      address: this.fb.group({
        street: '',
        house: '',
        houseSection: '',
        apartment: ''
      })
    });
  }
}
