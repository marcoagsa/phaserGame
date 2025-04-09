import { Component } from '@angular/core';
import { IonContent, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [IonContent, IonTitle],
  template: `<ion-content>
    <ion-title>Scores</ion-title>
  </ion-content>`,
  styles: [],
})
export class ScoresPage {}
