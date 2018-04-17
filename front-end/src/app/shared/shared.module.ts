import { NgModule } from '@angular/core';
import { CssClassNamePipe } from './pipes/enum-css-class/css-class-name-pipe';
import { ClickedOutsideDirective } from './directives/clicked-outside/clicked-outside.directive';

@NgModule({
  declarations: [CssClassNamePipe, ClickedOutsideDirective],
  exports: [CssClassNamePipe, ClickedOutsideDirective]
})
export class SharedModule { }
