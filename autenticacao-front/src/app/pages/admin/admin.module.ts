import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { UserManagerComponent } from './dashboard-admin/user-manager/user-manager.component';
import { UserAccessComponent } from './dashboard-admin/user-access/user-access.component';

import { UserAccessService } from 'src/app/shared/services/user-access.service';

@NgModule({
  declarations: [
    AdminLoginComponent,
    DashboardAdminComponent,
    UserManagerComponent,
    UserAccessComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [UserAccessService]
})
export class AdminModule { }