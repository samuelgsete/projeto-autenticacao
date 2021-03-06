import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { ConfirmAccountComponent } from './user-create/confirm-account/confirm-account.component';
import { RecoverAccountComponent } from './recover-account/recover-account.component';
import { ConfirmRecoverComponent } from './recover-account/confirm-recover/confirm-recover.component';

import { UserService } from 'src/app/shared/services/user.service';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { UserProfileComponent } from './dashboard-user/user-profile/user-profile.component';

@NgModule({
  declarations: [
    UserLoginComponent,
    UserCreateComponent,
    ConfirmAccountComponent,
    RecoverAccountComponent,
    ConfirmRecoverComponent,
    DashboardUserComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [UserService]
})
export class UserModule { }
