import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonGrid,
  IonInput,
  IonButton,
  IonSpinner,
  IonInputPasswordToggle,
  IonText,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
import { iif } from 'rxjs';
import { RenewPassword } from 'src/app/interfaces';
import { AuthService, UtilsService } from 'src/app/services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonText,
    IonSpinner,
    IonButton,
    IonInput,
    IonGrid,
    IonContent,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonInputPasswordToggle,
    ReactiveFormsModule,
  ],
})
export class ResetPasswordComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly utils = inject(UtilsService);

  loading = signal<boolean>(false);

  get password() {
    return this.renewPasswordForm.get('password');
  }

  renewPasswordForm = new FormBuilder().group({
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

  constructor() {
    addIcons({
      closeCircleOutline,
      checkmarkCircleOutline,
    });
  }

  inputErros(type: string) {
    return {
      required: 'Campo obrigatório',
      pattern:
        'letras maiúsculas e minúsculas, números e caracteres especiais.',
      minlength: 'A senha deve ter pelo menos 8 caracteres.',
    }[type];
  }

  async renewPassword() {
    this.loading.update((v) => !v);

    try {
      const resetPassword: RenewPassword = {
        id: localStorage.getItem('boomeloUserId') as string,
        password: this.renewPasswordForm.value.password as string,
      };
      const { message } = await this.authService.renewPassword(resetPassword);

      this.loading.update((v) => !v);

      const { role } = await this.utils.showAlert({
        header: 'Notificação',
        message: message,
      });

      if (role === 'cancel') {
        this.router.navigate(['/']);
      }
    } catch (error: any) {
      await this.utils.showAlert({
        header: 'Erro ao recuperar senha',
        message: error.error.message,
      });
    } finally {
      this.loading.update((v) => !v);
    }
  }
}
