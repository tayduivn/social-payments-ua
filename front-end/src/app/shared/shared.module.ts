import { NgModule } from '@angular/core';
import { InputFilterDirective } from './directives/input-filter/input-filter.directive';
import { CssClassNamePipe } from './pipes/enum-css-class/css-class-name-pipe';
import { ClickedOutsideDirective } from './directives/clicked-outside/clicked-outside.directive';
import { providers } from './providers/providers';

const declaredExports = [CssClassNamePipe, ClickedOutsideDirective, InputFilterDirective];

@NgModule({
  providers: providers,
  declarations: declaredExports,
  exports: declaredExports
})
export class SharedModule { }
