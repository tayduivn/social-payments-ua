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
  @Output() public personSelected = new EventEmitter<PersonModel>();

  constructor(
    cdRef: ChangeDetectorRef,
    fb: FormBuilder,
    public personService: PersonService
  ) {
    super(cdRef, PersonComponent.createForm(fb));

    this.form.valueChanges.subscribe(i => {
      console.log('PersonComponent valueChanges', i);
    });
  }

  public onAutocompleteItemSelected(item: PersonModel) {
    console.log('onAutocompleteItemSelected', item);
    this.personSelected.emit(item);
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
