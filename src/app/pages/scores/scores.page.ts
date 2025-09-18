import { Component, inject, OnInit, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonList,
  IonRow,
  IonText,
  IonSpinner,
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
    IonSpinner,
    IonRow,
    IonText,
    ItemScoreComponent,
  ],
  template: ` <ion-header>
      <ion-toolbar>
        <ion-title color="warning">Melhores Pontuações</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      @if (loading()) {
      <ion-spinner name="bubbles" />
      } @else {

      <ion-row class="row--title">
        <ion-text> 🍄 Minhas Pontuações 💣 </ion-text>
      </ion-row>

      <ion-list>
        @for (item of listScoreItems(); track $index) {
        <score-item-score [scoreItem]="item" [index]="$index" />
        }@empty {
        <score-item-score [scoreItem]="scoreItemExample" [index]="0" />
        }
      </ion-list>

      <ion-row class="row--title">
        <ion-text> 🍄 Ranking Boomelo 💣 </ion-text>
      </ion-row>

      <ion-list>
        @for (item of listBestResults(); track $index) {
        <score-item-score [scoreItem]="item" [index]="$index" />
        }@empty {
        <score-item-score [scoreItem]="scoreItemExample" [index]="0" />
        }
      </ion-list>
      }
    </ion-content>`,
  styles: [
    `
      ion-toolbar {
        --opacity: 0.5;
      }

      ion-row.row--title {
        justify-content: center;
        margin: 2em 0 2em 0;
      }

      ion-text {
        font-size: 1.2em;
        font-weight: bold;
        text-align: center;
        color: var(--ion-color-medium);
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
  listBestResults = signal<ScoreItemsList>([]);
  userId = signal<string | null>(localStorage.getItem('boomeloUserId'));

  ngOnInit(): void {
    this.loading.update((v) => !v);
    Promise.all([
      this.userId()
        ? (this.getScores(), this.getBestScores())
        : this.getBestScores(),
    ]);
    this.loading.update((v) => !v);
  }

  async getScores() {
    try {
      const { result } = await this.scoreService.scores(this.userId() ?? '');
      this.listScoreItems.set(result);
    } catch (error: any) {
      console.log(`MSA 🔊 error:`, error);
      await this.utils.showAlert({
        header: 'Error read scores',
        message: error.error.message,
      });
    }
  }

  async getBestScores() {
    try {
      const { result } = await this.scoreService.bestScores();

      this.listBestResults.set(result);
    } catch (error: any) {
      await this.utils.showAlert({
        header: 'Error read scores',
        message: error.error.message,
      });
    }
  }
}
