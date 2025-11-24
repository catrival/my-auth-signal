import { Routes } from '@angular/router';
import { RegistrationForm } from './registration-form/registration-form';
import { SignIn } from './sign-in/sign-in';

export const routes: Routes = [
  {
    path: 'registration-form',
    component: RegistrationForm
  },
  {
    path: 'sign-in',
    component: SignIn,
  },
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full',
  },
];
