import {
  ChangeDetectorRef,
  Component
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { lettersUA_CharsDiapason } from '../../constants/char-diapason-ua';
import { MultifiedAutocompleteCommonComponent } from '../common/multifield-autocomplete/multified-autocomplete-common.component';
import { PersonService } from './person.service';

@Component({
  selector: 'sp-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent extends MultifiedAutocompleteCommonComponent {
  public readonly passportNumberLetter = new RegExp(`[0-9a-zA-Z${lettersUA_CharsDiapason}]`);

  public fullName: FormControl;
  public passportNumber: FormControl;
  public identityCode: FormControl;
  public street: FormControl;
  public house: FormControl;

  constructor(
    cdRef: ChangeDetectorRef,
    fb: FormBuilder,
    public personService: PersonService
  ) {
    super(cdRef, PersonComponent.createForm(fb));

    this.initControls();
  }

  protected updateFormOnIdChange() {
    console.log('Person id change cb called');
  }

  private static createForm(fb: FormBuilder) {
    return fb.group({
      _id: null,
      fullName: ['', Validators.required],
      passportNumber: ['', Validators.required],
      identityCode: ['', Validators.required],
      address: fb.group({
        street: ['', Validators.required],
        house: ['', Validators.required],
        houseSection: '',
        apartment: ''
      })
    });
  }

  private initControls() {
    this.fullName = <FormControl> this.form.get('fullName');
    this.passportNumber = <FormControl> this.form.get('passportNumber');
    this.identityCode = <FormControl> this.form.get('identityCode');
    this.street = <FormControl> this.form.get('address.street');
    this.house = <FormControl> this.form.get('address.house');
  }
}
