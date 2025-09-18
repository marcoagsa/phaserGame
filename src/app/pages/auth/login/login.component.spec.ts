import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService, UtilsService } from 'src/app/services';
import { Router } from '@angular/router';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mocks
const authServiceMock = {
  signIn: vi.fn(),
  signUp: vi.fn(),
  isLoggedIn: { set: vi.fn() },
};

const utilsServiceMock = {
  saveToken: vi.fn(),
  saveUser: vi.fn(),
  showAlert: vi.fn(),
  openTabs: vi.fn(),
};

const routerMock = {
  navigate: vi.fn(),
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), ReactiveFormsModule, LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: UtilsService, useValue: utilsServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when inputs are correct', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'Password123!',
    });

    expect(component.loginForm.valid).toBe(true);
  });

  it('should have an invalid form with empty values', () => {
    component.loginForm.setValue({
      email: '',
      password: '',
    });

    expect(component.loginForm.invalid).toBe(true);
  });

  it('should call signIn and navigate on success', async () => {
    authServiceMock.signIn.mockResolvedValueOnce({ token: '123' });

    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'Password123!',
    });

    await component.signIn();

    expect(authServiceMock.signIn).toHaveBeenCalled();
    expect(utilsServiceMock.saveToken).toHaveBeenCalledWith('123');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    expect(utilsServiceMock.openTabs).toHaveBeenCalled();
    expect(authServiceMock.isLoggedIn.set).toHaveBeenCalledWith(true);
  });

  it('should show alert on signIn error', async () => {
    authServiceMock.signIn.mockRejectedValueOnce({
      error: { message: 'Invalid credentials' },
    });

    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'WrongPass1!',
    });

    await component.signIn();

    expect(utilsServiceMock.showAlert).toHaveBeenCalledWith({
      header: 'Erro no login',
      message: 'Invalid credentials',
    });
  });

  it('should call signUp and show success alert', async () => {
    authServiceMock.signUp.mockResolvedValueOnce({
      message: 'User created',
      userId: 'abc123',
    });

    localStorage.setItem('boomeloUserId', 'abc123');

    component.loginForm.setValue({
      email: 'newuser@example.com',
      password: 'Password123!',
    });

    await component.singUp();

    expect(authServiceMock.signUp).toHaveBeenCalled();
    expect(utilsServiceMock.saveUser).toHaveBeenCalledWith('abc123');
    expect(utilsServiceMock.showAlert).toHaveBeenCalledWith({
      header: 'Sucesso',
      message: 'User created',
    });
  });

  it('should call router.navigate on goTo()', () => {
    component.goTo();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/resetpassword']);
  });
});
