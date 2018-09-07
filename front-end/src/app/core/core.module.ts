import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { ApiLayerModule } from './api-layer.module';
import { AuthService } from './auth.service';
import * as moment from 'moment';

@NgModule({
  imports: [ApiLayerModule],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');

    this.setUpMomentLocale();
  }

  private setUpMomentLocale() {
    moment.updateLocale('uk', {
      longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY р.',
        LLL: 'D MMMM YYYY р., HH:mm',
        LLLL: 'dddd, D MMMM YYYY р., HH:mm'
      }
    });

    moment.locale('uk');
  }
}
