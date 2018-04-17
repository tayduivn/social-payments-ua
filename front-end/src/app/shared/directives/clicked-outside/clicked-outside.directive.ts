import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';

@Directive({
  selector: '[spClickedOutside]'
})
export class ClickedOutsideDirective {
  @Input() public spInsideExcludeSelector: string;
  @Output() public spClickedOutside = new EventEmitter<void>();

  constructor(private elRef: ElementRef) {
  }

  private static clickedIn(container: Element, clickTarget: Element): boolean {
    return container.contains(clickTarget);
  }

  @HostListener('document:click', ['$event.target'])
  private onClick(clickTarget: Element) {
    const el = this.elRef.nativeElement;
    const excludeElements = el.querySelectorAll(this.spInsideExcludeSelector);

    if (el.contains(clickTarget)) {
      for (let i = 0; i < excludeElements.length; i++) {
        if (ClickedOutsideDirective.clickedIn(excludeElements[i], clickTarget)) {
          this.dispatchEvent();
          return;
        }
      }
    } else {
      this.dispatchEvent();
    }
  }

  private dispatchEvent() {
    this.spClickedOutside.next();
  }
}
