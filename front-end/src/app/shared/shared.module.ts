import { NgModule } from '@angular/core';
import { InputFilterDirective } from './directives/input-filter/input-filter.directive';
import { CssClassNamePipe } from './pipes/enum-css-class/css-class-name-pipe';
import { ClickedOutsideDirective } from './directives/clicked-outside/clicked-outside.directive';
import { WindowProvider } from './providers/window-provider';
import { WebsocketConnectionService } from './services/websocket-connection/websocket-connection.service';

const declaredExports = [CssClassNamePipe, ClickedOutsideDirective, InputFilterDirective];

@NgModule({
  providers: [
    {
      provide: WindowProvider,
      useValue: window
    },
    WebsocketConnectionService
  ],
  declarations: declaredExports,
  exports: declaredExports
})
export class SharedModule { }
