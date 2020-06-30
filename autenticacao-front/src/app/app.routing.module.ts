import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserLoginComponent } from './pages/user/user-login/user-login.component';
import { RecoverAccountComponent } from './pages/user/recover-account/recover-account.component';
import { ConfirmRecoverComponent } from './pages/user/recover-account/confirm-recover/confirm-recover.component';

import { UserCreateComponent } from './pages/user/user-create/user-create.component';
import { ConfirmAccountComponent } from './pages/user/user-create/confirm-account/confirm-account.component';

import { DashboardUserComponent } from './pages/user/dashboard-user/dashboard-user.component';
import { UserGuard } from './shared/auth/user.guard';

import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'user/login', component: UserLoginComponent },
            { path: 'recover/account', component: RecoverAccountComponent },
            { path: 'confirm/recover', component: ConfirmRecoverComponent },
            { path: 'user/create', component: UserCreateComponent },
            { path: 'user/dashboard', component: DashboardUserComponent, canActivate: [UserGuard] },
            { path: 'confirm/account', component: ConfirmAccountComponent },
            { path: 'admin/login', component: AdminLoginComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}