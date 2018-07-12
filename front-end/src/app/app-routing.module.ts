import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentsModule } from './payments/payments.module';
import { ReportsComponent } from './reports/reports.component';
import { ReportsModule } from './reports/reports.module';

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
    path: 'reports',
    component: ReportsComponent
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
    ReportsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
