import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth/auth.module';
import { environment } from '@environments/environment';
import { API_URL } from '@shared/tokens';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { registerFeatureKey, registerReducer } from '@auth/store/reducers';
import { RegisterEffect } from '@auth/store/effects/register.effect';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    StoreModule.forRoot({ [registerFeatureKey]: registerReducer }, {}),
    EffectsModule.forRoot([RegisterEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [{ provide: API_URL, useValue: environment.api_url }],
  bootstrap: [AppComponent],
})
export class AppModule {}
