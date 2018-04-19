import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersModule } from './users/users.module';

@NgModule({
  imports: [
    CommonModule,
    UsersModule,
    AdminRoutingModule
  ],
  declarations: []
})
export class AdminModule { }
