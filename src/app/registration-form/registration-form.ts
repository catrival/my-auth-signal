import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserAccount } from '@models/user-account';

@Component({
  selector: 'app-registration-form',
  imports: [RouterLink],
  templateUrl: './registration-form.html',
  styleUrl: './registration-form.css',
})
export class RegistrationForm {
  userSignal = signal<UserAccount>({
    id: '',
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    role: null,
    mobile: '',
    createdDate: ''
  });
}
