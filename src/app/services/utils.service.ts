import { Injectable, inject } from '@angular/core';
import {
  ModalController,
  AlertController,
  AlertOptions,
} from '@ionic/angular/standalone';
import { GameScoreInfo, ScoreItem } from 'src/app/interfaces/score-item';
import { TabsComponent } from 'src/app/components';
import { ScoresService } from './scores.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private readonly modalCtrl = inject(ModalController);
  private readonly alertController = inject(AlertController);
  private readonly scoreService = inject(ScoresService);

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
      buttons: alertOptions.buttons ?? [{ text: 'OK', role: 'cancel' }],
      ...(alertOptions?.inputs && { inputs: alertOptions.inputs }),
    });

    await alert.present();

    return await alert.onDidDismiss();
  }

  async saveScore(gameScoreInfo: GameScoreInfo) {
    // const existing = JSON.parse(localStorage.getItem('scores') || '[]');
    // existing.push(score);
    // localStorage.setItem('scores', JSON.stringify(existing));

    try {
      const body: ScoreItem = {
        ...gameScoreInfo,
        _id: localStorage.getItem('boomeloUserId') || 'no user id',
        date: new Date(),
      };
      await this.scoreService.save(body);
    } catch (error: any) {
      await this.showAlert({
        header: 'Erro no guardar score',
        message: error.error.message,
      });
    }
  }

  saveUser(id: string) {
    localStorage.setItem('boomeloUserId', id);
  }

  saveToken(token: string) {
    localStorage.setItem('boomeloToken', token);
  }

  clearStorage() {
    localStorage.removeItem('boomeloToken');
  }
}
