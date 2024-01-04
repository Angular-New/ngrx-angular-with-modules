import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@auth/services';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { RegisterEffect } from '@auth/store/effects';
import { StoreModule } from '@ngrx/store';
import { registerFeatureKey, registerReducer } from '@auth/store/reducers';
import { BackendErrorMessagesComponent } from '@shared/components/backend-error-messages/backend-error-messages.component';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature(registerFeatureKey, registerReducer),
    EffectsModule.forFeature([RegisterEffect]),
    BackendErrorMessagesComponent,
  ],
  providers: [AuthService],
})
export class AuthModule {}
