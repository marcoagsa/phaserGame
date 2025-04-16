import { Component, input } from '@angular/core';
import {
  IonCard,
  IonRow,
  IonLabel,
  IonImg,
  IonThumbnail,
  IonNote,
  IonCol,
} from '@ionic/angular/standalone';
import { AboutItem } from 'src/app/interfaces/about-item';

@Component({
  selector: 'about-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonNote,
    IonImg,
    IonLabel,
    IonRow,
    IonCard,
    IonThumbnail,
    IonNote,
  ],
})
export class ItemCardComponent {
  aboutItem = input.required<AboutItem>();
}
