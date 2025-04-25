import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonBackButton, IonButtons],
})
export class ResetPasswordComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
