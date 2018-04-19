import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { ApiLayerModule } from './api-layer.module';
import { WINDOW, windowFactory } from './window';
import { AuthService } from './auth.service';

@NgModule({
  imports: [ApiLayerModule],
  providers: [
    AuthService,
    AuthGuard,
    {provide: WINDOW, useFactory: windowFactory}
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
