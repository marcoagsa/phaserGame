import { Component, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonCard,
  IonTitle,
  IonList,
  IonLabel,
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
    IonLabel,
  ],
  template: ` <ion-header>
      <ion-toolbar>
        <ion-title color="warning"> Sobre </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      <ion-card
        class="logo"
        [style]="{
          'background-image': 'url(' + backgroundImage + ')',
          'background-size': 'cover',
          'background-repeat': 'no-repeat'
        }"
      >
      </ion-card>

      <ion-card class="about">
        <ion-label [innerHtml]="aboutTheGame()" />
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

      ion-card.logo {
        height: 39vh;
        border: solid 2px var(--ion-color-warning);
        border-radius: 10%;
        margin: 0 0 5vh 0;
        box-shadow: rgba(var(--ion-color-dark-rgb), 0.35) 0px 5px 15px;
      }

      ion-card.about {
        border: solid 2px var(--ion-color-warning);
        margin: 0 0 5vh 0;
        box-shadow: rgba(var(--ion-color-dark-rgb), 0.35) 0px 5px 15px;
        padding: 3vw;
        text-align: justify;

        ion-label {
          color: rgba(var(--ion-color-warning-rgb), 0.5);
          letter-spacing: 2px;
          white-space: normal;
          font-family: monospace;
          font-size: 16px;
        }
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

  aboutTheGame = signal(
    `Prepara-te para a aventura do Koko, o macaquinho mais rápido da selva digital! <br> <br> Corre de um lado para o outro a apanhar Melos 🍄 e Zings ⭐ que caem do céu. <br> <br> Cada Melo dá-te 10 pontos e cada Zing 50 pontos — e ambos fazem o Koko crescer! <br> <br> Mas cuidado com as perigosas Boomz 💣! Se apanhares uma, perdes meia ♥ Vita. Começas com 3 Vitas completas (ou seja, 6 metades) <br> <br> — se perderes todas… game over! <br> <br> À medida que apanhas itens, vais enchendo uma barra de progresso. <br> <br> Quando fica cheia, sobes de nível: o Koko volta ao tamanho inicial e ganha meia ♥ Vita extra para continuar mais forte do que nunca! <br> <br> Será que consegues manter o Koko vivo, crescer sem explodir, e subir o máximo de níveis possível? 🎮🐵`
  );

  listAboutItems = signal<AboutItemsList>([
    {
      name: 'Koko',
      image: 'assets/backgrounds/monkey.png',
      description:
        'O macaquinho saltitão que és tu! Apanha itens, cresce e sobe de nível!',
      value: 10,
    },
    {
      name: 'Vita',
      image: 'assets/items/heart.png',
      description:
        'Representa a tua vida. Começas com 3 e podes ganhar ou perder aos bocadinhos.',
      value: 0,
    },
    {
      name: 'Boomz',
      image: 'assets/items/bomb.png',
      description:
        'Explosiva e traiçoeira! Se a apanhares, perdes meia vida. Fujaaa!',
      value: 0,
    },
    {
      name: 'Zing',
      image: 'assets/items/star.png',
      description:
        'Brilhante e poderosa! Dá 50 pontos e faz-te crescer num instante.',
      value: 50,
    },
    {
      name: 'Melo',
      image: 'assets/items/mushroomred.webp',
      description:
        'Delicioso e pontuador! Dá 10 pontos e aumenta o teu tamanho.',
      value: 10,
    },
  ]);
}
