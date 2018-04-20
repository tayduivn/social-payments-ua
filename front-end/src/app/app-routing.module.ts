import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';
import { MainNavComponent } from './layout/main-nav/main-nav.component';
import { MainNavModule } from './layout/main-nav/main-nav.module';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentsModule } from './payments/payments.module';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'payments',
    component: PaymentsComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: '',
    redirectTo: '/payments',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    LoginModule,
    AdminModule,
    PaymentsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
