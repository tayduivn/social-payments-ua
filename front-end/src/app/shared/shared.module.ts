import { NgModule } from '@angular/core';
import { InputFilterDirective } from './directives/input-filter/input-filter.directive';
import { CssClassNamePipe } from './pipes/enum-css-class/css-class-name-pipe';
import { ClickedOutsideDirective } from './directives/clicked-outside/clicked-outside.directive';

const declaredExports = [CssClassNamePipe, ClickedOutsideDirective, InputFilterDirective];

@NgModule({
  declarations: declaredExports,
  exports: declaredExports
})
export class SharedModule { }
