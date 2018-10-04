import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import {
  filter,
  map,
  startWith
} from 'rxjs/operators';
import { Person } from '../../../../../../api-contracts/person/person';
import { Street } from '../../../../../../api-contracts/street/street';
import { lettersUA_CharsDiapason } from '../../constants/char-diapason-ua';
import { FilterUtils } from '../../utils/filter-utils';
import { MultifiedAutocompleteCommonComponent } from '../common/multifield-autocomplete/multified-autocomplete-common.component';
import { PersonService } from './person.service';
import { StreetService } from './street.service';

@Component({
  selector: 'sp-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent extends MultifiedAutocompleteCommonComponent implements OnInit {
  public readonly passportNumberLetter = new RegExp(`[0-9a-zA-Z${lettersUA_CharsDiapason}]`);

  public fullName: FormControl;
  public passportNumber: FormControl;
  public identityCode: FormControl;
  public street: FormControl;
  public house: FormControl;

  public personAutocompleteFilter$: Observable<Person>;
  public steetsFiltered$: Observable<Street[]>;

  private streets: Street[] = [];

  constructor(
    cdRef: ChangeDetectorRef,
    fb: FormBuilder,
    public personService: PersonService,
    private streetService: StreetService
  ) {
    super(cdRef, PersonComponent.createForm(fb));
  }

  public ngOnInit() {
    this.initControls();
    this.initPersonAutocompleteFilter();
    this.initStreetAutocompleteFilter();
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

  private initPersonAutocompleteFilter() {
    this.personAutocompleteFilter$ = this.form.valueChanges
      .pipe(
        // disable person autocomplete for address section inputs
        filter((person: Person) => FilterUtils.isEmpty(person.address))
      )
  }

  private initStreetAutocompleteFilter() {
    this.streetService.getData()
      .subscribe((streets: Street[]) => this.streets = streets);

    this.steetsFiltered$ = this.street.valueChanges
      .pipe(
        startWith(''),
        map((streetInput: string) => this.streets.filter((street: Street) => street.name.toLowerCase().includes(streetInput.toLowerCase())))
      );
  }
}
