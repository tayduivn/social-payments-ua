import { NgModule } from '@angular/core';
import { CssClassNamePipe } from './enum-css-class/css-class-name-pipe';

@NgModule({
  declarations: [CssClassNamePipe],
  exports: [CssClassNamePipe]
})
export class SharedModule { }
