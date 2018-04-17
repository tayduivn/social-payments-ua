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
  public filterLoginInput(event: KeyboardEvent) {
    const key = event.key;

    if (!this.filterRegexp || !this.filterable(key)) { return; }
    if (!this.filterRegexp.test(key)) {
      event.preventDefault();
    }
  }

  private filterable(key: string): boolean {
    const excludeKeysPhrases = [
      'arrow',
      'backspace',
      'delete',
      'home',
      'end'
    ];

    return !excludeKeysPhrases.some(keyPhrase => key.toLowerCase().includes(keyPhrase));
  }
}
