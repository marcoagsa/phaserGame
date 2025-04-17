import { Component, OnInit, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonList,
} from '@ionic/angular/standalone';
import { ItemScoreComponent } from 'src/app/components/score/item-score/item-score.component';
import { ScoreItemsList } from 'src/app/interfaces/score-item';

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
  listScoreItems = signal<ScoreItemsList>(
    JSON.parse(localStorage.getItem('scores') || '[]')
  );

  ngOnInit(): void {
    this.listScoreItems.update((items) =>
      [...items].sort((a, b) => {
        if (b.points !== a.points) {
          return b.points - a.points;
        }

        if (b.level !== a.level) {
          return b.level - a.level;
        }

        return b.scale - a.scale;
      })
    );
  }
}
