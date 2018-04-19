import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from './layout/layout.module';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { PaymentsModule } from './payments/payments.module';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent
  }
];

@NgModule({
  imports: [
    LoginModule,
    LayoutModule,
    AdminModule,
    PaymentsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
