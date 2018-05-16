import {
  Directive,
  HostListener,
  Input
} from '@angular/core';
import { MultifieldAutocompleteComponent } from './multifield-autocomplete.component';
import { ProxyAutocompleteCommands } from './proxy-autocomplete-commands.enum';

@Directive({
  selector: '[spProxyAutocompleteCommands]'
})
export class ProxyAutocompleteCommandsDirective {
  @Input('spProxyAutocompleteCommands') autocompleteTarget: MultifieldAutocompleteComponent;

  constructor() { }

  @HostListener('keydown', ['$event'])
  public onKeydown($event: KeyboardEvent) {
    for (let proxyAutocompleteCommandsKey in ProxyAutocompleteCommands) {
      if (Number(proxyAutocompleteCommandsKey) === $event.keyCode) {
        $event.preventDefault();
        this.autocompleteTarget.triggerEvent($event.keyCode);
      }
    }
  }
}
