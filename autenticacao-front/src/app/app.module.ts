
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app.routing.module';
import { UserModule } from './pages/user/user.module';
import { AdminModule } from './pages/admin/admin.module';
import { AuthService } from './shared/services/auth.service';
import { UserGuard } from './shared/auth/user.guard';
import { AdminGuard } from './shared/auth/admin.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    UserModule,
    AdminModule
  ],
  providers: [
    AuthService,
    UserGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }