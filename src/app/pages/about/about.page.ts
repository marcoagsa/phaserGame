import { Component, signal } from '@angular/core';
import { IonContent, IonTitle, IonList } from '@ionic/angular/standalone';
import { ItemCardComponent } from 'src/app/components/about';
import { AboutItemsList } from 'src/app/interfaces/about-item';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [IonContent, IonTitle, IonList, ItemCardComponent],
  template: `<ion-content>
    <ion-title>About</ion-title>
    <ion-list>
      @for (item of listAboutItems(); track $index) {
      <about-item-card [aboutItem]="item" />
      }
    </ion-list>
  </ion-content>`,
  styles: [``],
})
export class AboutPage {
  listAboutItems = signal<AboutItemsList>([
    {
      name: 'Player',
      image: 'assets/sprites/player.png',
      description: '',
      value: 10,
    },
    {
      name: '',
      image: 'assets/sprites/heart.png',
      description: '',
      value: 0,
    },
    {
      name: 'Boom',
      image: 'assets/items/bomb.png',
      description: '',
      value: 0,
    },
    {
      name: 'Star',
      image: 'assets/items/star.png',
      description: '',
      value: 50,
    },
    {
      name: 'Melo',
      image: 'assets/items/mushroomred.webp',
      description: '',
      value: 50,
    },
  ]);
}
