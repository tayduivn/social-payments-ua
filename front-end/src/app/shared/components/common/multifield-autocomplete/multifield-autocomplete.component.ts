import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger
} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  tap
} from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import { FilterUtils } from '../../../utils/filter-utils';
import { ProxyAutocompleteCommands } from './proxy-autocomplete-commands.enum';

@Component({
  selector: 'sp-multifield-autocomplete',
  templateUrl: './multifield-autocomplete.component.html',
  styleUrls: ['./multifield-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MultifieldAutocompleteComponent implements OnInit, AfterViewInit {
  @Input() public items: Object[];
  @Input() public form: FormGroup;

  @ViewChild(MatAutocomplete) protected autocomplete: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) protected autocompleteTrigger: MatAutocompleteTrigger;

  @ContentChild(TemplateRef) public template: TemplateRef<any>;

  @ViewChild('autocompleteTrigger', {
    read: ElementRef
  }) public triggerInput: ElementRef;

  public filteredItems: Observable<Object[]>;

  constructor(private cdRef: ChangeDetectorRef) {}

  public onAutocompleteItemSelected(selectedItem: MatAutocompleteSelectedEvent) {
    this.form.patchValue(selectedItem.option.value, {emitEvent: false});
  }

  public ngOnInit() {
    this.filteredItems = this.form.valueChanges
      .pipe(this.getAutocompleteFiltering());
  }

  public ngAfterViewInit() {
    this.autocompleteTrigger.autocomplete = this.autocomplete;
  }

  public triggerEvent(command: ProxyAutocompleteCommands) {
    this.triggerInput.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {
      keyCode: String(command)
    } as any));
  }

  private getAutocompleteFiltering() {
    return pipe(
      debounceTime(300),
      distinctUntilChanged(FilterUtils.equals),
      filter((filter: Object) => {
        // if all fields are clear and button clear is disabled - stop process
        const allFieldsEmtpy = FilterUtils.isEmpty(filter);

        if (allFieldsEmtpy) {
          this.autocompleteTrigger.closePanel();
          this.cdRef.markForCheck();
        }

        return !allFieldsEmtpy; // stop processing if all fields are empty
      }),
      tap(() => {
        if (!this.autocomplete.isOpen) {
          this.autocompleteTrigger.openPanel();
        }
      }),
      map((filter: Object[]) => {
        return this.items.filter((item: Object) => FilterUtils.includes(item, filter));
      })
    );
  }}
