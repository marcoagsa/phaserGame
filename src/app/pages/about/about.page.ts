import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [IonicModule],
  template: ` <ion-header>
      <ion-toolbar>
        <ion-title>About</ion-title>
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
    <ion-content> </ion-content>`,
  styles: [``],
})
export class AboutPage {
  public utils = inject(UtilsService);

  async openTabs() {
    const data = await this.utils.openTabs();
    console.log(`MSA 🔊 data:`, data);
  }
}
