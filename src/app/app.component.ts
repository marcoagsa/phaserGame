import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { UtilsService } from './services';

@Component({
  selector: 'app-phaser-root',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  template: `<ion-app>
    <ion-router-outlet />
  </ion-app> `,
})
export class AppComponent implements OnInit {
  public readonly utils = inject(UtilsService);

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.utils.openTabs();
  }
}
