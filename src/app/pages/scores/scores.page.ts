import { Component, inject, OnInit, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonList,
} from '@ionic/angular/standalone';
import { ItemScoreComponent } from 'src/app/components/score/item-score/item-score.component';
import { ScoreItemsList } from 'src/app/interfaces/score-item';
import { UtilsService } from 'src/app/services';
import { ScoresService } from 'src/app/services/scores.service';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonTitle,
    IonList,
    ItemScoreComponent,
  ],
  template: ` <ion-header>
      <ion-toolbar>
        <ion-title color="warning">Melhores Pontuações</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      <ion-list>
        @for (item of listScoreItems(); track $index) {
        <score-item-score [scoreItem]="item" [index]="$index" />
        }@empty {
        <score-item-score [scoreItem]="scoreItemExample" [index]="0" />
        }
      </ion-list>
    </ion-content>`,
  styles: [
    `
      ion-toolbar {
        --opacity: 0.5;
      }
    `,
  ],
})
export class ScoresPage implements OnInit {
  private readonly scoreService = inject(ScoresService);
  private readonly utils = inject(UtilsService);

  loading = signal<boolean>(false);
  scoreItemExample = {
    userId: '0',
    name: '--',
    level: 0,
    points: 0,
    scale: 0,
    date: new Date(),
  };

  listScoreItems = signal<ScoreItemsList>([]);

  ngOnInit(): void {
    this.getScores();
  }

  async getScores() {
    this.loading.update((v) => !v);

    try {
      const userId = localStorage.getItem('boomeloUserId') ?? '';

      const { result } = await this.scoreService.scores(userId);

      this.listScoreItems.set(result);
    } catch (error: any) {
      await this.utils.showAlert({
        header: 'Error read scores',
        message: error.error.message,
      });
    } finally {
      this.loading.update((v) => !v);
    }
  }
}
