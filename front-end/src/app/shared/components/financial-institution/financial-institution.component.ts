import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/finally';
import { Observable } from 'rxjs/Observable';
import { MultifieldAutocompleteComponent } from '../common/multifield-autocomplete/multifield-autocomplete.component';
import { FinancialInstitutionModel } from './financial-institution.model';
import { FinancialInstitutionService } from './financial-institution.service';

@Component({
  selector: 'sp-financial-institution',
  templateUrl: './financial-institution.component.html',
  styleUrls: ['./financial-institution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialInstitutionComponent extends MultifieldAutocompleteComponent implements OnInit, AfterViewInit {
  public financialInstitutionsFiltered: Observable<FinancialInstitutionModel[]>;

  constructor(
    cdRef: ChangeDetectorRef,
    fb: FormBuilder,
    private financialInstitutionService: FinancialInstitutionService
  ) {
    super(FinancialInstitutionComponent.createForm(fb), cdRef);
  }

  public ngOnInit() {
    this.componentSubscriptions = this.financialInstitutionService.getList().subscribe((res: FinancialInstitutionModel[]) => {
      this.autocompleteItems = res;
    });

    this.initFiltering();
  }

  private static createForm(fb: FormBuilder) {
    return fb.group({
      id: null,
      name: '',
      mfo: '',
      edrpou: ''
    });
  }

  private initFiltering() {
    this.financialInstitutionsFiltered = this.form.valueChanges
      .pipe(this.autocompleteFiltering.bind(this));
  }
}
