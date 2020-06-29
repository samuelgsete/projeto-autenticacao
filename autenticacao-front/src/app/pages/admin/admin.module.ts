import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [

  AdminLoginComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AdminModule { }