import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoffComponent } from './logoff/logoff.component';
import { NotificationsModule } from '../notifications/notifications.module';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent, LogoffComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NotificationsModule,
  ],
})
export class AuthModule {}
