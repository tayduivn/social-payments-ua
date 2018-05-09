import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { lettersUA_CharsDiapason } from '../../constants/char-diapason-ua';

const passportNumberLetter = new RegExp(`[a-zA-Z${lettersUA_CharsDiapason}]`);

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
      id: null,
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
