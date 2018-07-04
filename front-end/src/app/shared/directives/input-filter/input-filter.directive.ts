import {
  Directive,
  HostListener,
  Input
} from '@angular/core';

@Directive({
  selector: '[spInputFilter]'
})
export class InputFilterDirective {
  @Input() set spInputFilter(val: string) {
    this.filterRegexp = RegExp(val);
  }

  private filterRegexp: RegExp;

  @HostListener('keydown', ['$event'])
  private filterInput(event: KeyboardEvent) {
    const key = event.key;

    if (!key || !this.filterRegexp || !this.isCommandKeyPressed(key)) { return; }
    if (!this.filterRegexp.test(key)) {
      event.preventDefault();
    }
  }

  private isCommandKeyPressed(key: string): boolean {
    const excludeKeyNames = [
      'arrow',
      'backspace',
      'delete',
      'home',
      'end',
      'tab'
    ];

    return !excludeKeyNames.some(keyPhrase => key.toLowerCase().includes(keyPhrase));
  }
}
