import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { lettersUA_CharsDiapason } from '../../constants/char-diapason-ua';
import { conformToMask } from 'angular2-text-mask';

const passportNumberLetter = new RegExp(`[a-zA-Z${lettersUA_CharsDiapason}]`);

@Component({
  selector: 'sp-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  public form: FormGroup;

  public readonly identityCodeMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  public passportMask = (rawValue: string) => {
    console.log('passportMask raw value', rawValue);
    if(!rawValue) { return []; }
    // compare with 10 since _ sign also passed in when user enters next symbol
    if (rawValue.length === 10 && rawValue.indexOf('_') < 0) {
      return [passportNumberLetter, passportNumberLetter, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    } else {
      return [passportNumberLetter, passportNumberLetter, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    }
  };

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  public ngOnInit() {
  }

  private createForm() {
    // for init need conformed value due to dynamic mask
    // conformToMask('ВС1231238', [passportNumberLetter, passportNumberLetter, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/])
    this.form = this.fb.group({
      fullName: '',
      passportNumber: 'ВС1 231238',
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
