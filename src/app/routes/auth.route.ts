import { Routes } from '@angular/router';
import { RegisterComponent } from '@auth/components/register/register.component';
import { LoginComponent } from '@auth/components/login/login.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
