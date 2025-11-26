import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { email, Field, form, minLength, required, submit } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { ErrorIcon } from '@app/shared/error-icon';

export interface UserFormData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, RouterLink, Field, ErrorIcon],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  /** Signal holding the state of the sign-in form, including email and password. */
  userModel = signal<UserFormData>({
    email: '',
    password: '',
  });

  /** Form group for the sign-in form, including validation rules for each field. */
  signInFormUser = form(this.userModel, (path) => {
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Invalid email address' });
    required(path.password, { message: 'Password is required' });
    minLength(path.password, 8, { message: 'Password must be at least 8 characters long' });
  });


  /**
   * Returns true if the field with the given name is invalid, false otherwise.
   * @param {keyof UserFormData} fieldName - the name of the field to check
   * @returns {boolean} true if the field is invalid, false otherwise
   */
  isFieldInvalid(fieldName: keyof UserFormData): boolean {
    const fieldSignal = this.signInFormUser[fieldName];
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

    submit(this.signInFormUser, async () => {
      console.log('Logged-in user');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.onReset();
    });

    this.signInFormUser().markAsTouched();
    console.log({
      model: this.signInFormUser(),
      form: this.signInFormUser().value(),
      valid: this.signInFormUser().valid(),
      invalid: this.signInFormUser().invalid(),
    });
  }

  /** Resets the user form by clearing all fields. */
  onReset(): void {
    this.userModel.set({
      password: '',
      email: '',
    });

    this.signInFormUser().reset();
  }
}
