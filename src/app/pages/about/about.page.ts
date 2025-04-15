import { Component, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonCard,
  IonTitle,
  IonList,
} from '@ionic/angular/standalone';
import { ItemCardComponent } from 'src/app/components/about';
import { AboutItemsList } from 'src/app/interfaces/about-item';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonTitle,
    IonList,
    IonCard,
    ItemCardComponent,
  ],
  template: ` <ion-header>
      <ion-toolbar>
        <ion-title> About </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      <ion-card
        [style]="{
          'background-image': 'url(' + backgroundImage + ')',
          'background-size': 'cover',
          'background-repeat': 'no-repeat'
        }"
      >
      </ion-card>

      <ion-list>
        @for (item of listAboutItems(); track $index) {
        <about-item-card [aboutItem]="item" />
        }
      </ion-list>
    </ion-content>`,
  styles: [
    `
      ion-toolbar {
        --opacity: 0.5;
      }

      ion-card {
        height: 39vh;
        border: solid 2px var(--ion-color-warning);
        border-radius: 10%;
        margin: 0 0 5vh 0;
        box-shadow: rgba(var(--ion-color-dark-rgb), 0.35) 0px 5px 15px;
      }

      ion-list {
        margin: 0 0 20vh 0;
        background: transparent;
      }
    `,
  ],
})
export class AboutPage {
  backgroundImage = 'assets/icon/boomelo.png';
  listAboutItems = signal<AboutItemsList>([
    {
      name: 'Player',
      image: 'assets/backgrounds/monkey.png',
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
