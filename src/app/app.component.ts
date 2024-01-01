import { Component, inject, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UtilsService } from './services/utils.service';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-phaser-root',
  standalone: true,
  imports: [IonicModule, TitleCasePipe],
  template: `<ion-app>
    @if (title !== 'play') {
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title | titlecase }}</ion-title>
        <ion-buttons slot="primary">
          <ion-button (click)="openTabs()">
            <ion-icon
              slot="icon-only"
              ios="ellipsis-horizontal"
              md="ellipsis-vertical"
            />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    }
    <ion-router-outlet />
  </ion-app> `,
  styles: [],
})
export class AppComponent {
  private utils = inject(UtilsService);
  private route = inject(Router);

  get title() {
    const route = this.route?.url;
    return route?.slice(1, route?.length);
  }

  async openTabs() {
    await this.utils.openTabs();
  }
}
