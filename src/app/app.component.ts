import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-phaser-root',
  standalone: true,
  imports: [IonicModule],
  template: `<ion-app>
    <ion-router-outlet />
  </ion-app> `,
  styles: [],
})
export class AppComponent implements OnInit {
  private utils = inject(UtilsService);

  // constructor() {
  //   this.openTabs();
  // }

  ngOnInit(): void {
    this.openTabs();
  }

  async openTabs() {
    await this.utils.openTabs();
  }
}
