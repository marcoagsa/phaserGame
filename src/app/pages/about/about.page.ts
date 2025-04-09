import { Component } from '@angular/core';
import { IonContent, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [IonContent, IonTitle],
  template: `<ion-content>
    <ion-title>About</ion-title>
  </ion-content>`,
  styles: [``],
})
export class AboutPage {}
