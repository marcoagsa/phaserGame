import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTab,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  informationCircleOutline,
  gameControllerOutline,
  trophyOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    NgClass,
    IonTab,
  ],
  styles: [
    `
      ion-tabs {
        background: var(--ion-toolbar-background);
        display: block;
        margin-top: 20px;
        ion-tab-bar {
          background: var(--ion-toolbar-background);
        }
        ion-tab-button {
          background: var(--ion-toolbar-background);
          --color-focused: red;
        }
      }
      .active {
        color: var(--ion-color-warning);
      }
    `,
  ],
  template: `
    <ion-tabs>
      <ion-tab> </ion-tab>

      <ion-tab-bar>
        <ion-tab-button
          (click)="navigateTo('about')"
          [ngClass]="{ active: active('about') }"
        >
          <ion-icon aria-hidden="true" name="information-circle-outline" />
          <ion-label>About</ion-label>
        </ion-tab-button>

        <ion-tab-button
          (click)="navigateTo('play')"
          [ngClass]="{ active: active('play') }"
        >
          <ion-icon aria-hidden="true" name="game-controller-outline" />
          <ion-label>Play</ion-label>
        </ion-tab-button>

        <ion-tab-button
          (click)="navigateTo('scores')"
          [ngClass]="{ active: active('scores') }"
        >
          <ion-icon aria-hidden="true" name="trophy-outline" />
          <ion-label>Scores</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
})
export class TabsComponent {
  private readonly route = inject(Router);
  constructor() {
    addIcons({
      informationCircleOutline,
      gameControllerOutline,
      trophyOutline,
    });
  }

  navigateTo(route: string) {
    this.route.navigate([route]);
  }

  active(page: string): boolean {
    return this.route.url.includes(page);
  }
}
