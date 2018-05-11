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
import { MultifieldAutocompleteComponent } from '../common/multifield-autocomplete/multifield-autocomplete.component';
import { PersonModel } from './person.model';
import { PersonService } from './person.service';

const passportNumberLetter = new RegExp(`[a-zA-Z${lettersUA_CharsDiapason}]`);

@Component({
  selector: 'sp-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  // public personsFiltered: Observable<PersonModel[]>;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public personService: PersonService
  ) {
    this.createForm();
  }

  public ngOnInit() {
    // this.componentSubscriptions = this.personService.getList().subscribe((res: PersonModel[]) => {
    //   this.autocompleteItems = res;
    // });
    //
    // this.initFiltering();
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

  // private initFiltering() {
  //   this.personsFiltered = this.form.valueChanges
  //     .pipe(this.autocompleteFiltering.bind(this));
  // }
}
