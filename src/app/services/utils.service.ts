import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
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
    return modal.onDidDismiss();
  }

  async dismissTabs() {
    await this.modalCtrl.dismiss();
  }
}
