import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import { lettersUA_CharsDiapason } from '../../constants/char-diapason-ua';
import { MultifiedAutocompleteCommonComponent } from '../common/multifield-autocomplete/multified-autocomplete-common.component';
import { PersonModel } from './person.model';
import { PersonService } from './person.service';

const passportNumberLetter = new RegExp(`[a-zA-Z${lettersUA_CharsDiapason}]`);

@Component({
  selector: 'sp-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent extends MultifiedAutocompleteCommonComponent {
  constructor(
    cdRef: ChangeDetectorRef,
    fb: FormBuilder,
    public personService: PersonService
  ) {
    super(cdRef, PersonComponent.createForm(fb));
  }

  protected updateFormOnIdChange() {
    console.log('Person id change cb called');
  }

  private static createForm(fb: FormBuilder) {
    return fb.group({
      id: null,
      fullName: '',
      passportNumber: '',
      identityCode: '',
      address: fb.group({
        street: '',
        house: '',
        houseSection: '',
        apartment: ''
      })
    });
  }
}
