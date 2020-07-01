import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';

@NgModule({
  declarations: [

  AdminLoginComponent,

  DashboardAdminComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AdminModule { }