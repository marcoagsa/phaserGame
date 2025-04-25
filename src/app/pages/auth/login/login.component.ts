import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonInput,
  IonInputPasswordToggle,
  IonContent,
  IonGrid,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    IonGrid,
    IonContent,
    IonButton,
    IonInput,
    IonInputPasswordToggle,
    ReactiveFormsModule,
  ],
})
export class LoginComponent implements OnInit {
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
}
