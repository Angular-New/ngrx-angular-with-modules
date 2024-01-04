import { Routes } from '@angular/router';
import { RegisterComponent } from '@auth/components/register/register.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
];
