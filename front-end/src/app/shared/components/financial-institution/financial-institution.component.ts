import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import 'rxjs/add/operator/finally';
import { tap } from 'rxjs/operators';
import { FinancialInstitutionService } from './financial-institution.service';

@Component({
  selector: 'sp-financial-institution',
  templateUrl: './financial-institution.component.html',
  styleUrls: ['./financial-institution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialInstitutionComponent implements OnInit {
  // public autocompleteItems: Observable<FinancialInstitutionModel[]>;

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public financialInstitutionService: FinancialInstitutionService
  ) {
    this.createForm();
  }

  public ngOnInit() {
    // this.componentSubscriptions = this.financialInstitutionService.getList().subscribe((res: FinancialInstitutionModel[]) => {
    //   this.autocompleteItems = res;
    // });
    //
    // this.initFiltering();
    // console.log('oninit');
  }

  private createForm() {
    this.form = this.fb.group({
      id: null,
      name: '',
      mfo: '',
      edrpou: ''
    });
  }
}
