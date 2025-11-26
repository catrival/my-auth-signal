import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SignIn } from './sign-in';
import { ActivatedRoute } from '@angular/router';

describe('SignIn', () => {
  let component: SignIn;
  let fixture: ComponentFixture<SignIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignIn],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: {} } } }, // Instancia mock de ActivatedRoute
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignIn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isFieldInvalid should return false for untouched fields and true after touched with invalid values', () => {
    expect(component.isFieldInvalid('email')).toBeFalse();
    expect(component.isFieldInvalid('password')).toBeFalse();

    component.userModel.set({ email: 'invalid-email', password: '123' });

    (['email', 'password'] as const).map((key) =>
      component.signInFormUser[key]?.().markAsTouched()
    );

    expect(component.isFieldInvalid('email')).toBeTrue();
    expect(component.isFieldInvalid('password')).toBeTrue();
  });

  it('onSubmit should call onReset after async submit callback', fakeAsync(() => {
    const fakeEvent = { preventDefault: jasmine.createSpy('preventDefault') } as unknown as Event;
    spyOn(component, 'onReset');

    component.userModel.set({ email: 'user@example.com', password: 'StrongPass1!' });
    fixture.detectChanges();

    component.onSubmit(fakeEvent);
    tick(1100);

    expect(component.onReset).toHaveBeenCalled();
  }));
});
