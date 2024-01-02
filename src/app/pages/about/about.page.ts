import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [IonicModule],
  template: `<ion-content>
    <ion-title>About</ion-title>
  </ion-content>`,
  styles: [``],
})
export class AboutPage {
  public utils = inject(UtilsService);

  async openTabs() {
    const data = await this.utils.openTabs();
    console.log(`MSA 🔊 data:`, data);
  }
}
