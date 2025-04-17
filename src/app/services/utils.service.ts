import { Injectable, inject } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular/standalone';
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
    if (this.modal) {
      return;
    }

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

  async getUserName() {
    const alert = await this.alertController.create({
      header: 'Novo Recorde!',
      message: 'Escreve o teu nome para guardar o score:',
      cssClass: 'custom-alert',
      backdropDismiss: false,
      inputs: [
        {
          name: 'playerName',
          type: 'text',
          placeholder: 'Nome (max 8 characters)',
          attributes: {
            maxlength: 8,
          },
        },
      ],
      buttons: [
        {
          text: 'Guardar',
        },
      ],
    });

    await alert.present();

    return await alert.onDidDismiss();
  }

  saveScore(score: ScoreItem) {
    const existing = JSON.parse(localStorage.getItem('scores') || '[]');
    existing.push(score);
    localStorage.setItem('scores', JSON.stringify(existing));
  }
}
