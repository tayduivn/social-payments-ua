import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { ApiLayerModule } from './api-layer/api-layer.module';
import { WINDOW, windowFactory } from './window';

@NgModule({
  imports: [ApiLayerModule],
  providers: [
    {provide: WINDOW, useFactory: windowFactory}
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
