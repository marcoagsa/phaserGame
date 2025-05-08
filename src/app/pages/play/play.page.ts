import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonCard,
  Platform,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { caretBackOutline, playOutline } from 'ionicons/icons';
import { SCENE_KEYS } from 'src/app/constants';
import { GameScene } from 'src/app/scenes/game-scene';
import { PreloadScene } from 'src/app/scenes/preload-scene';
import { UtilsService } from 'src/app/services';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [IonContent, IonButton, IonCard],
  styles: [
    `
      ion-card {
        padding: 24px;
        border: solid 2px var(--ion-color-warning);
        border-radius: 16px;
        margin-bottom: 5vh;
        box-shadow: rgba(var(--ion-color-dark-rgb), 0.35) 0px 5px 15px;
        margin-top: 20vh;
        margin-left: auto;
        margin-right: auto;
        height: 45vh;
        width: 90vw;
        align-items: center;
      }

      ion-button {
        margin-top: 34vh;
      }

      /* ----------- Telas médias (ex: tablets e telas entre 768px e 1439px) ----------- */
      @media screen and (min-width: 768px) and (max-width: 1439px) {
        ion-card {
          height: 55vh;
          width: 60vw;
        }

        ion-button {
          margin-top: 45vh;
        }
      }

      /* ----------- Telas grandes (ex: desktops ≥1440px) ----------- */
      @media screen and (min-width: 1440px) {
        ion-card {
          height: 60vh;
          width: 30vw;
        }

        ion-button {
          margin-top: 50vh;
        }
      }
    `,
  ],
  template: `
    <ion-content fullscreen="true">
      <div id="phaser-main"></div>

      @if (startButton()) {

      <ion-card
        [style]="{
          'background-image': 'url(' + backgroundImage + ')',
          'background-size': 'cover',
          'background-repeat': 'no-repeat',
          'background-position': 'center',
        }"
      >
        <ion-button
          id="startGame"
          expand="block"
          color="warning"
          (click)="startGame()"
        >
          Iniciar Jogo
        </ion-button>
      </ion-card>
      }
    </ion-content>
  `,
})
export class PlayPage implements OnInit, OnDestroy {
  private readonly platform = inject(Platform);
  private readonly utils = inject(UtilsService);

  config!: Phaser.Types.Core.GameConfig;

  game = signal<Phaser.Game | undefined>(undefined);
  startButton = signal(true);
  backgroundImage = 'assets/icon/boomelo.png';

  constructor() {
    addIcons({ playOutline, caretBackOutline });
  }

  ngOnInit(): void {
    this.config = {
      type: Phaser.AUTO,
      pixelArt: false,
      parent: 'phaser-main',
      width: this.getAdjustedWidth(),
      height: this.platform.height(),
      scale: {
        width: this.getAdjustedWidth(),
        height: this.platform.height(),
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      fps: {
        forceSetTimeOut: true,
      },
      render: {
        transparent: false,
      },
      backgroundColor: '#000000',
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
    };
    console.log('PlayPage initialized');
  }

  ngOnDestroy(): void {
    this.game()?.destroy(true, false);
  }

  async startGame() {
    (window as any).gameOver = this.gameOver.bind(this);
    await this.utils.dismissTabs();
    this.startButton.update((v) => !v);
    this.game.set(new Phaser.Game(this.config));
    this.game()?.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
    this.game()?.scene.add(SCENE_KEYS.GAME_SCENE, GameScene, false, {
      utils: this.utils,
    });
    this.game()?.scene.start(SCENE_KEYS.PRELOAD_SCENE);
  }

  gameOver() {
    this.game()?.destroy(true, false);
    window.location.reload();
    this.startButton.update((v) => !v);
  }

  getAdjustedWidth(): number {
    const isWeb =
      this.platform.is('desktop') ||
      this.platform.is('mobileweb') ||
      this.platform.is('mobile');

    const fullWidth = this.platform.width();
    return isWeb ? Math.min(fullWidth, 400) : fullWidth;
  }
}
