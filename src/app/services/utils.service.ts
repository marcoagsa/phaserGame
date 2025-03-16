import { Injectable, inject } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { TabsComponent } from 'src/app/components';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private modalCtrl = inject(ModalController);

  modal: HTMLIonModalElement | undefined;

  async openTabs() {
    if (this.modal) {
      return;
    }

    this.modal = await this.modalCtrl.create({
      component: TabsComponent,
      initialBreakpoint: 0.1,
      breakpoints: [0, 0.1],
      backdropBreakpoint: 0.1,
      backdropDismiss: false,
      canDismiss: true,
      cssClass: 'tabsModal',
    });

    await this.modal.present();
  }

  async dismissTabs() {
    if (await this.modal?.getCurrentBreakpoint()) {
      await this.modalCtrl.dismiss();
    }
    return;
  }

  async tabsBreakPoint(breakpoint: number) {
    await this.modal?.setCurrentBreakpoint(breakpoint);
  }
}
