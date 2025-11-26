import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationForm } from './registration-form';
import { ActivatedRoute } from '@angular/router';

describe('RegistrationForm', () => {
  let component: RegistrationForm;
  let fixture: ComponentFixture<RegistrationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationForm],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: {} } } } // Instancia mock de ActivatedRoute
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
