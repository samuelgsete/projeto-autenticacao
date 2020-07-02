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
import { DashboardAdminComponent } from './pages/admin/dashboard-admin/dashboard-admin.component';
import { AdminGuard } from './shared/auth/admin.guard';
import { UserManagerComponent } from './pages/admin/dashboard-admin/user-manager/user-manager.component';
import { UserAccessComponent } from './pages/admin/dashboard-admin/user-access/user-access.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'user/login', component: UserLoginComponent },
            { path: 'recover/account', component: RecoverAccountComponent },
            { path: 'confirm/recover', component: ConfirmRecoverComponent },
            { path: 'user/create', component: UserCreateComponent },
            { path: 'user/dashboard', component: DashboardUserComponent, canActivate: [UserGuard] },
            { path: 'confirm/account', component: ConfirmAccountComponent },
            { path: 'admin/login', component: AdminLoginComponent },
            { path: 'admin/dashboard', component: DashboardAdminComponent,  canActivate: [AdminGuard] },
            { path: 'admin/dashboard/user/manager', component: UserManagerComponent,  canActivate: [AdminGuard] },
            { path: 'admin/dashboard/user/access', component: UserAccessComponent,  canActivate: [AdminGuard] }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}