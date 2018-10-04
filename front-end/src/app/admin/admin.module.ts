import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { UsersModule } from './users/users.module';

@NgModule({
  imports: [
    CommonModule,
    UsersModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
