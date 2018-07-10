import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersModule } from './users/users.module';
import { AdminComponent } from './admin.component';

@NgModule({
  imports: [
    CommonModule,
    UsersModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
