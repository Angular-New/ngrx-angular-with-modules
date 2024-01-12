import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthMapper, AuthService } from '@auth/services';
import {
  FetchUserEffect,
  LoginEffect,
  RegisterEffect,
} from '@auth/store/effects';
import { registerFeatureKey, registerReducer } from '@auth/store/reducers';
import { BackendErrorMessagesComponent } from '@shared/components/backend-error-messages/backend-error-messages.component';
import { PersistenceService } from '@shared/services';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature(registerFeatureKey, registerReducer),
    EffectsModule.forFeature([RegisterEffect, LoginEffect, FetchUserEffect]),
    BackendErrorMessagesComponent,
  ],
  providers: [AuthService, PersistenceService, AuthMapper],
})
export class AuthModule {}
