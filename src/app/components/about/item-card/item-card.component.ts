import { Component, input } from '@angular/core';
import {
  IonCard,
  IonItem,
  IonLabel,
  IonImg,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { AboutItem } from 'src/app/interfaces/about-item';

@Component({
  selector: 'about-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  standalone: true,
  imports: [IonImg, IonLabel, IonItem, IonCard, IonThumbnail],
})
export class ItemCardComponent {
  aboutItem = input.required<AboutItem>();
}
