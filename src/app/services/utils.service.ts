import { Injectable, inject } from '@angular/core';
import {
  ModalController,
  AlertController,
  AlertOptions,
} from '@ionic/angular/standalone';
import { ScoreItem } from 'src/app/interfaces/score-item';
import { TabsComponent } from 'src/app/components';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private modalCtrl = inject(ModalController);
  private alertController = inject(AlertController);

  modal: HTMLIonModalElement | undefined;

  async openTabs() {
    this.modal = await this.modalCtrl.create({
      component: TabsComponent,
      initialBreakpoint: 0.1,
      breakpoints: [0.1],
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

  async showAlert(alertOptions: Partial<AlertOptions>) {
    const alert = await this.alertController.create({
      header: alertOptions.header,
      subHeader: alertOptions.subHeader ?? undefined,
      message: alertOptions.message,
      cssClass: alertOptions.cssClass ?? 'custom-alert',
      backdropDismiss: alertOptions.backdropDismiss ?? false,
      buttons: alertOptions.buttons ?? [{ text: 'OK' }],
      ...(alertOptions?.inputs && { inputs: alertOptions.inputs }),
    });

    await alert.present();

    return await alert.onDidDismiss();
  }

  saveScore(score: ScoreItem) {
    const existing = JSON.parse(localStorage.getItem('scores') || '[]');
    existing.push(score);
    localStorage.setItem('scores', JSON.stringify(existing));
  }

  saveUser(id: string) {
    localStorage.setItem('boomeloUserId', JSON.stringify(id));
  }

  saveToken(token: string) {
    localStorage.setItem('boomeloToken', token);
  }

  clearStorage() {
    localStorage.removeItem('boomeloToken');
  }
}
