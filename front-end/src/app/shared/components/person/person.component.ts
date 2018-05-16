import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { lettersUA_CharsDiapason } from '../../constants/char-diapason-ua';
import { MultifiedAutocompleteCommonComponent } from '../common/multifield-autocomplete/multified-autocomplete-common.component';
import { MultifieldAutocompleteComponent } from '../common/multifield-autocomplete/multifield-autocomplete.component';
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
