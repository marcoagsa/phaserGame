import { Component, OnDestroy, inject, signal } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonImg,
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
  imports: [IonContent, IonButton, IonImg, IonCard],
  styles: [
    `
      ion-card {
        display: grid;
        height: 50vh;
        align-content: center;
        padding: 24px;
        margin: 20vh 24px 0 24px;
      }

      ion-img {
        width: 10vh;
        display: flex;
        justify-self: center;
        padding-bottom: 5vh;
      }
    `,
  ],
  template: `
    <ion-content fullscreen="true">
      <div id="phaser-main"></div>
      @if (startButton()) {

      <ion-card>
        <ion-img [src]="'assets/backgrounds/monkey.png'" alt="monkey" />

        <ion-button
          id="startGame"
          expand="block"
          color="tertiary"
          (click)="startGame()"
        >
          Star Game
        </ion-button>
      </ion-card>
      }
    </ion-content>
  `,
})
export class PlayPage implements OnDestroy {
  private readonly platform = inject(Platform);
  private readonly utils = inject(UtilsService);

  config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    pixelArt: false,
    parent: 'phaser-main',
    width: this.platform.width(),
    height: this.platform.height(),
    scale: {
      width: this.platform.width(),
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

  game = signal<Phaser.Game | undefined>(undefined);
  startButton = signal(true);

  constructor() {
    addIcons({ playOutline, caretBackOutline });
  }

  ngOnDestroy(): void {
    this.game()?.destroy(true, false);
  }

  async startGame() {
    await this.utils.dismissTabs();
    this.startButton.update((v) => !v);
    this.game.set(new Phaser.Game(this.config));
    this.game()?.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
    this.game()?.scene.add(SCENE_KEYS.GAME_SCENE, GameScene);
    this.game()?.scene.start(SCENE_KEYS.PRELOAD_SCENE);
  }

  gameOver() {
    this.game()?.destroy(true, false);
    this.startButton.update((v) => !v);
  }
}
