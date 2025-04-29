import { Component, inject } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { Login } from 'src/app/interfaces';
import { AuthService, UtilsService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
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

  async login() {
    try {
      const login = await this.authService.login(this.loginForm.value as Login);
      this.utils.saveLogin(login);
      this.router.navigate(['/']);
      await this.authService.isLoggedIn.set(true);
      await this.utils.openTabs();
    } catch (error) {
      console.log(`MSA 🔊 error:`, error);
    }
  }

  goTo() {
    this.router.navigate(['/resetpassword']);
  }
}
