import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserAccount } from '@models/user-account';
import {
  email,
  Field,
  form,
  minLength,
  required,
  submit,
  validate,
} from '@angular/forms/signals';
import { ErrorIcon } from '@app/shared/error-icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration-form',
  imports: [CommonModule, RouterLink, Field, ErrorIcon],
  templateUrl: './registration-form.html',
  styleUrl: './registration-form.css',
})
export class RegistrationForm {
  /** Signal holding the state of a user registration form, including user details and credentials. */
  userSignal = signal<UserAccount>({
    id: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
    role: null,
    mobile: '',
    createdDate: '',
  });

  /** Form group for the user registration form, including validation rules for each field. */
  userForm = form(this.userSignal, (path) => {
    required(path.firstName, { message: 'Name is required' });
    required(path.lastName, { message: 'Last name is required' });
    required(path.password, { message: 'Password is required' });
    //required(path.confirmPassword, { message: 'Password is required' });
    required(path.email, { message: 'Email is required' });
    required(path.mobile, { message: 'Mobile is required' });
    minLength(path.password, 8, { message: 'Password must be at least 8 characters long' });
    email(path.email, { message: 'Invalid email address' });
    validate(path.mobile, ({ value }) => {
      const v = value().toString().trim() ?? '';
      if (!v) return null; // required already enforces presence
      // Allow optional leading + and 7-15 digits (ignore spaces and dashes)
      const normalized = v.replace(/[\s-]/g, '');
      if (!/^\+?\d{7,15}$/.test(normalized)) {
        return {
          message: 'Invalid mobile number (expect 7–15 digits, optional +)',
          kind: 'error',
        };
      }
      return null;
    });
    validate(path.confirmPassword, ({ value }) => {
      const password = this.userSignal().password;
      if (password !== value()) {
        return {
          message: 'Passwords do not match',
          kind: 'error',
        };
      }
      return null;
    });
  });

  /**
   * Returns true if the field with the given name is invalid, false otherwise.
   * @param {keyof UserAccount} fieldName - the name of the field to check
   * @returns {boolean} true if the field is invalid, false otherwise
   */
  isFieldInvalid(fieldName: keyof UserAccount): boolean {
    const fieldSignal = this.userForm[fieldName];
    if (!fieldSignal) return false;

    const field = fieldSignal();
    return field && field.touched() && field.errors().length > 0;
  }

  /**
   * Submits the user registration form by marking all fields as touched and logging the form's state.
   * @param event The event that triggered the form submission.
   */
  onSubmit(event: Event): void {
    event.preventDefault();

    submit(this.userForm, async () => {
      console.log('The user was created successfully.');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.onReset();
    });

    this.userForm().markAsTouched();
    console.log({
      model: this.userForm(),
      form: this.userForm().value(),
      valid: this.userForm().valid(),
      invalid: this.userForm().invalid(),
    });
  }

  /** Resets the user form by clearing all fields and resetting form validation. */
  onReset() : void {
    this.userSignal.set({
      id: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      email: '',
      role: null,
      mobile: '',
      createdDate: '',
    });

    this.userForm().reset();
  }
}
