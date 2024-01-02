import { Injectable, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TabsComponent } from '../components';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private modalCtrl = inject(ModalController);

  async openTabs() {
    const modal = await this.modalCtrl.create({
      component: TabsComponent,
      initialBreakpoint: 0.1,
      breakpoints: [0.1],
      backdropDismiss: false,
    });

    await modal.present();
  }

  async dismissTabs() {
    await this.modalCtrl.dismiss();
  }

  async changeTabPosition() {
    await this.modalCtrl.getTop();
  }
}
