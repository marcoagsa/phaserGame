import { Component, inject, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  private readonly router = inject(Router);

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

  constructor() {}

  ngOnInit() {}

  login() {
    console.log('Login form submitted:', this.loginForm.value);
  }

  goTo() {
    this.router.navigate(['/resetpassword']);
  }
}
