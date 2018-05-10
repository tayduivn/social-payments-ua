import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { lettersUA_CharsDiapason } from '../../constants/char-diapason-ua';
import { MultifieldAutocompleteComponent } from '../common/multifield-autocomplete/multifield-autocomplete.component';
import { PersonModel } from './person.model';
import { PersonService } from './person.service';

const passportNumberLetter = new RegExp(`[a-zA-Z${lettersUA_CharsDiapason}]`);

@Component({
  selector: 'sp-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent extends MultifieldAutocompleteComponent implements OnInit {
  public personsFiltered: Observable<PersonModel[]>;

  constructor(
    cdRef: ChangeDetectorRef,
    fb: FormBuilder,
    private personService: PersonService
  ) {
    super(PersonComponent.createForm(fb), cdRef);
  }

  public ngOnInit() {
    this.componentSubscriptions = this.personService.getList().subscribe((res: PersonModel[]) => {
      this.autocompleteItems = res;
    });

    this.initFiltering();
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

  private initFiltering() {
    this.personsFiltered = this.form.valueChanges
      .pipe(this.autocompleteFiltering.bind(this));
  }
}
