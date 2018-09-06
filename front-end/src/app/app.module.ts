import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppStartupModulesModule } from './app-startup-modules.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainNavModule } from './layout/main-nav/main-nav.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    AppStartupModulesModule,
    NgxMaskModule.forRoot(),
    MainNavModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
