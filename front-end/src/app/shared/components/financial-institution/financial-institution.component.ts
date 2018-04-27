import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteTrigger
} from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { FinancialInstitutionModel } from './financial-institution.model';
import { FinancialInstitutionService } from './financial-institution.service';

@Component({
  selector: 'sp-financial-institution',
  templateUrl: './financial-institution.component.html',
  styleUrls: ['./financial-institution.component.scss']
})
export class FinancialInstitutionComponent implements OnInit, AfterViewInit, OnDestroy {
  public form: FormGroup;

  public readonly mfoMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  public readonly edrpouMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

  public financialInstitutions: FinancialInstitutionModel[];

  private componentSubscriptions: Subscription;

  @ViewChild(MatAutocomplete) private autocomplete: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) private autocompleteTrigger: MatAutocompleteTrigger;

  @ViewChild('autocompleteContainer', {
    read: ElementRef
  }) private autocompleteContainer: ElementRef;

  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private financialInstitutionService: FinancialInstitutionService) {
      this.createForm();
  }

  public ngOnInit() {
    this.componentSubscriptions = this.financialInstitutionService.getList().subscribe((res: FinancialInstitutionModel[]) => {
      this.financialInstitutions = res;
      this.autocompleteTrigger.openPanel();
      // this.cdRef.detectChanges();
    })
  }

  public ngAfterViewInit() {
    this.autocomplete.panel = this.autocompleteContainer;
    this.autocompleteTrigger.autocomplete = this.autocomplete;
  }

  public ngOnDestroy() {
    if (this.componentSubscriptions) {
      this.componentSubscriptions.unsubscribe();
    }
  }

  private createForm() {
    this.form = this.fb.group({
      name: '',
      mfo: '',
      edrpou: ''
    });
  }
}
