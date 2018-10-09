import {
  Component,
  HostListener,
  Input
} from '@angular/core';
import { FilterType } from '../shared/filter-type.enum';

@Component({
  selector: 'sp-filter-chip',
  template: '{{text}}<mat-icon class="sp-small-icon">cancel</mat-icon>',
  styleUrls: ['./filter-chip.component.scss']
})
export class FilterChipComponent {
  @Input() public text: string;
  @Input() public filterType: FilterType;

  constructor() { }

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
