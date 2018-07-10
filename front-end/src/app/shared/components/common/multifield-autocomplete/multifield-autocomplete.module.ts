import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { MultifieldAutocompleteComponent } from './multifield-autocomplete.component';
import { ProxyAutocompleteCommandsDirective } from './proxy-autocomplete-commands.directive';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    PerfectScrollbarModule
  ],
  declarations: [MultifieldAutocompleteComponent, ProxyAutocompleteCommandsDirective],
  exports: [MultifieldAutocompleteComponent, ProxyAutocompleteCommandsDirective]
})
export class MultifieldAutocompleteModule { }
