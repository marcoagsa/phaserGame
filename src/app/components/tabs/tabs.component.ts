import { Component } from '@angular/core';
import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
  template: `
    <ion-tabs>
      <ion-tab-bar>
        <ion-tab-button [href]="'about'">
          <ion-icon aria-hidden="true" name="triangle" />
          <ion-label>About</ion-label>
        </ion-tab-button>

        <ion-tab-button [href]="'play'">
          <ion-icon aria-hidden="true" name="ellipse" />
          <ion-label>Play</ion-label>
        </ion-tab-button>

        <ion-tab-button [href]="'scores'">
          <ion-icon aria-hidden="true" name="square" />
          <ion-label>Scores</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
  styles: [
    `
      ion-tabs {
        background: var(--ion-toolbar-background);
        display: block;
        padding-top: 20px;
        ion-tab-bar {
          background: var(--ion-toolbar-background);
        }
        ion-tab-button {
          background: var(--ion-toolbar-background);
        }
      }
    `,
  ],
})
export class TabsComponent {
  constructor() {
    addIcons({ triangle, ellipse, square });
  }
}
