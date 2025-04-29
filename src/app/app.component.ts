import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService, UtilsService } from 'src/app/services';

@Component({
  selector: 'app-phaser-root',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  template: `<ion-app>
    <ion-router-outlet />
  </ion-app> `,
})
export class AppComponent {
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
