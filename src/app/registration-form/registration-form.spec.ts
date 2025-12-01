import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RegistrationForm } from './registration-form';
import { ActivatedRoute } from '@angular/router';
import { UserAccount } from '@models/user-account';

describe('RegistrationForm', () => {
  let component: RegistrationForm;
  let fixture: ComponentFixture<RegistrationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationForm],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: {} } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('userForm', () => {
    let user: UserAccount;

    beforeEach(() => {
      user = {
        id: '111-aaa-xyz',
        firstName: 'Edd',
        lastName: 'Ford',
        password: '',
        confirmPassword: '123345678',
        email: '',
        role: null,
        mobile: '333-222-1111',
        createdDate: '',
      };
    });

    it('isFieldInvalid should return false for untouched fields and true after touched with invalid values', () => {
      expect(component.isFieldInvalid('email')).toBeFalse();
      expect(component.isFieldInvalid('password')).toBeFalse();

      component.userSignal.set(user);

      (['email', 'password'] as const).map((key) => component.userForm[key]?.().markAsTouched());

      expect(component.isFieldInvalid('email')).toBeTrue();
      expect(component.isFieldInvalid('password')).toBeTrue();
    });

    it('onSubmit should call onReset after async submit callback', fakeAsync(() => {
      const fakeEvent = { preventDefault: jasmine.createSpy('preventDefault') } as unknown as Event;
      spyOn(component, 'onReset');
      component.userSignal.set({
        ...user,
        email: 'eddFord@gmail.com',
        password: 'StrongPass1!',
        confirmPassword: 'StrongPass1!',
      });
      fixture.detectChanges();

      component.onSubmit(fakeEvent);
      tick(1100);

      expect(component.onReset).toHaveBeenCalled();
    }));
  });
});
