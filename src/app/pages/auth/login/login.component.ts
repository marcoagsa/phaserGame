import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonInput,
  IonInputPasswordToggle,
  IonContent,
  IonGrid,
  IonLabel,
  IonItem,
  IonSpinner,
} from '@ionic/angular/standalone';
import { Login } from 'src/app/interfaces';
import { AuthService, UtilsService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    IonSpinner,
    IonItem,
    IonLabel,
    IonGrid,
    IonContent,
    IonButton,
    IonInput,
    IonInputPasswordToggle,
    ReactiveFormsModule,
  ],
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly utils = inject(UtilsService);

  user = signal<boolean>(!!localStorage.getItem('boomeloUserId'));

  existsUser = computed<boolean>(() => {
    return this.user();
  });

  loading = signal<boolean>(false);

  loginForm = new FormBuilder().group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$%\\^&\\*\\-_\\.])[A-Za-z\\d!@#\\$%\\^&\\*\\-_\\.]{8,}$'
        ),
      ],
    ],
  });

  async signIn() {
    this.loading.update((v) => !v);

    try {
      const { token } = await this.authService.signIn(
        this.loginForm.value as Login
      );

      this.utils.saveToken(token);

      this.router.navigate(['/']);

      await this.authService.isLoggedIn.set(true);

      await this.utils.openTabs();
    } catch (error: any) {
      await this.utils.showAlert({
        header: 'Erro no login',
        message: error.error.message,
      });
    } finally {
      this.loading.update((v) => !v);
    }
  }

  async singUp() {
    this.loading.update((v) => !v);

    try {
      const { message, userId } = await this.authService.signUp(
        this.loginForm.value as Login
      );

      this.utils.saveUser(userId);
      this.user.set(!!localStorage.getItem('boomeloUserId'));

      this.utils.showAlert({ header: 'Sucesso', message });
    } catch (error: any) {
      if (error.status === 409) {
        this.user.set(true);
      }

      await this.utils.showAlert({
        header: 'Erro no login',
        message: error.error.message,
      });
    } finally {
      this.loading.update((v) => !v);
    }
  }

  goTo() {
    this.router.navigate(['/resetpassword']);
  }
}
