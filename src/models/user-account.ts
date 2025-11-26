/**
 * Represents all information about the platform.
 */
export interface UserAccount{
  /** The global unique ID for this user. */
  readonly id: string;

  /** The user's first name. */
  firstName: string;

  /** The user's last name. */
  lastName: string;

  /** The user's new password. */
  password: string;

  /** The user's password to confirm. */
  confirmPassword: string;

  /** The email address registered to the user. */
  readonly email: string;

  /** The user's role. */
  role: string | null;

  /** The user's number of mobile. */
  mobile: string;

  /** The date at which this user was created. */
  readonly createdDate: string;
}
