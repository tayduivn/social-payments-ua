import {
  Component,
  HostListener,
  Input
} from '@angular/core';

@Component({
  selector: 'sp-filter-chip',
  template: '{{text}}<mat-icon class="sp-small-icon">cancel</mat-icon>',
  styleUrls: ['./filter-chip.component.scss']
})
export class FilterChipComponent {
  @Input() public text: string;

  constructor() { }

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
