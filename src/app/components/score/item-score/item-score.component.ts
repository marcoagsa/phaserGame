import { Component, input } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  analyticsOutline,
  medalOutline,
  ribbonOutline,
  trophyOutline,
} from 'ionicons/icons';
import { IonItem, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { ScoreItem } from 'src/app/interfaces/score-item';

@Component({
  selector: 'score-item-score',
  templateUrl: './item-score.component.html',
  styleUrls: ['./item-score.component.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonIcon],
})
export class ItemScoreComponent {
  index = input.required<number>();
  scoreItem = input.required<ScoreItem>();

  constructor() {
    addIcons({ trophyOutline, medalOutline, ribbonOutline, analyticsOutline });
  }

  trophyColor(index: number): string {
    const colors: Record<number, string> = {
      0: 'warning',
      1: 'medium',
      2: 'bronze',
    };
    return colors[index] ?? 'dark';
  }

  trophyIcon(index: number): string {
    const trophyIcon: Record<number, string> = {
      0: 'trophy-outline',
      1: 'medal-outline',
      2: 'medal-outline',
    };

    return trophyIcon[index] ?? 'ribbon-outline';
  }
}
