import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [IonicModule],
  template: `<ion-tabs>
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="about" href="/tabs/about">
        <ion-icon aria-hidden="true" name="triangle"></ion-icon>
        <ion-label>About</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="play" href="/tabs/play">
        <ion-icon aria-hidden="true" name="ellipse"></ion-icon>
        <ion-label>Play</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="scores" href="/tabs/scores">
        <ion-icon aria-hidden="true" name="square"></ion-icon>
        <ion-label>Scores</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>`,
  styles: [],
})
export class TabsPage {}
