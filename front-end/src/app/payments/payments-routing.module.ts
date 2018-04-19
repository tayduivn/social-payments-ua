import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { PaymentsComponent } from './payments.component';

const routes: Routes = [
  {
    path: 'payments',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: PaymentsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
