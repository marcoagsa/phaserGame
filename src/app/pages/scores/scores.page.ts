import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonContent, IonTitle],
  template: ` <ion-header>
      <ion-toolbar>
        <ion-title color="warning">Melhores Pontuações</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding"> </ion-content>`,
  styles: [
    `
      ion-toolbar {
        --opacity: 0.5;
      }
    `,
  ],
})
export class ScoresPage {}
