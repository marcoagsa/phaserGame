import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { UtilsService } from 'src/app/services';
import { AuthService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-phaser-root',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  template: `<ion-app>
    <ion-router-outlet />
  </ion-app> `,
})
export class AppComponent implements OnInit {
  private readonly utils = inject(UtilsService);
  private readonly auth = inject(AuthService);

  ngOnInit(): void {
    this.init();
  }

  async init() {
    if (!this.auth.isLoggedIn()) return;
    await this.utils.openTabs();
  }
}
