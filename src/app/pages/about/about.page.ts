import { AuthService, UtilsService } from 'src/app/services';
import { Component, inject, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonCard,
  IonTitle,
  IonList,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';
import { ItemCardComponent } from 'src/app/components/about';
import { AboutItemsList } from 'src/app/interfaces/about-item';
import { Router } from '@angular/router';

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
    IonButtons,
    IonButton,
    IonIcon,
  ],
  template: ` <ion-header>
      <ion-toolbar>
        <ion-title color="warning"> Sobre </ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="logout()">
            <ion-icon slot="icon-only" name="log-out-outline" color="danger" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      <ion-card class="about">
        <ion-label [innerHtml]="aboutTheGame()" />
      </ion-card>

      <ion-list>
        @for (item of listAboutItems(); track $index) {
        <about-item-card class="item-about" [aboutItem]="item" />
        }
      </ion-list>
    </ion-content>`,
  styles: [
    `
      ion-toolbar {
        --opacity: 0.5;
      }

      ion-card.about {
        border: solid 2px var(--ion-color-warning);
        box-shadow: rgba(var(--ion-color-dark-rgb), 0.35) 0px 5px 15px;
        padding: 4vw;
        text-align: center;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-left: auto;
        margin-right: auto;
        width: 90dvw;

        ion-label {
          letter-spacing: 2px;
          white-space: normal;
          font-family: monospace;
          font-size: 16px;
        }
      }

      ion-list {
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-left: auto;
        margin-right: auto;
      }

      .item-about {
        width: 90%;
      }

      /* ----------- Non-Retina Screens ----------- */
      @media screen and (min-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 1) {
        .item-about {
          width: 45%;
        }
      }

      /* ----------- Retina Screens ----------- */
      @media screen and (min-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
        .item-about {
          width: 45%;
        }
      }
    `,
  ],
})
export class AboutPage {
  private readonly utils = inject(UtilsService);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  backgroundImage = 'assets/icon/boomelo.png';

  aboutTheGame = signal(
    `Larga tudo e entra na selva do **Boomelo** com o Zozo, o macaquinho mais traquinas! <br><br>
     🍄 **Melo** = 10 pontos <br> ⭐ **Brilha** = 50 pontos (e fazem-te crescer!) <br><br>
     💣 **Boomba** = Perdes meia - **Bida**! Começas com 3 Bidões (corações). <br><br>
     🚀 Enche a barra de progresso para subir de nível: o Zozo fica mais resistente com **Bida extra**! <br><br>
     Consegues sobreviver às Boombas, apanhar Brilhas e tornar-te o maior macaco digital? **Vamos a isso!** 🐵💥`
  );

  listAboutItems = signal<AboutItemsList>([
    {
      name: 'Zozo', // ou Koko / Bambo
      image: 'assets/backgrounds/monkey.png',
      description:
        'O macaquinho mais rápido da selva! Apanha Melos e Brilhas para cresceres!',
      value: 10,
    },
    {
      name: 'Bida',
      image: 'assets/items/heart.png',
      description:
        'A tua força vital! Começas com 3 Bidões (6 metades). Cuidado com as Boombas!',
      value: 0,
    },
    {
      name: 'Boomba', // ou Bumelo / Kabum
      image: 'assets/items/bomb.png',
      description: 'Isto é para fugir! Se a apanhares, perdes meia-Bida. 💣',
      value: 0,
    },
    {
      name: 'Brilha',
      image: 'assets/items/star.png',
      description:
        'Cintilante e preciosa! Dá 50 pontos e faz o Zozo crescer num instante! ✨',
      value: 50,
    },
    {
      name: 'Melo',
      image: 'assets/items/mushroomred.webp',
      description:
        'O rei dos cogumelos! Dá 10 pontos e um mini-crescimento ao Zozo.',
      value: 10,
    },
  ]);

  constructor() {
    addIcons({ logOutOutline });
  }

  logout() {
    this.utils.dismissTabs();
    this.auth.isLoggedIn.set(false);
    this.router.navigateByUrl('/login');
    this.utils.clearStorage();
  }
}
