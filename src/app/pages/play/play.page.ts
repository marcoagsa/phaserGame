import { Component, inject, signal } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { ASSETS_PATH, SCENE_KEYS } from 'src/app/constants';
import { MainScene } from 'src/app/game/MainScene';
import { PreloadScene } from 'src/app/scenes/preload-scene';
import * as Phaser from 'phaser';
import { UtilsService } from 'src/app/services';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [IonicModule],
  template: ` @if(toggleStart()) {
    <div id="phaser-main"></div>
    }@else{
    <ion-content>
      <ion-card>
        <ion-img [src]="image" />

        <ion-button
          aria-label="Favorite"
          color="medium"
          size="large"
          fill="outline"
          shape="round"
          expand="block"
          (click)="init()"
        >
          Start Game
          <ion-icon name="play-outline" size="large" color="danger" />
        </ion-button>

        <ion-button
          aria-label="Favorite"
          color="medium"
          size="large"
          fill="outline"
          shape="round"
          expand="block"
          (click)="utils.openTabs()"
        >
          <ion-icon name="caret-back-outline" size="large" color="danger" />
          Go Back
        </ion-button>
      </ion-card>
    </ion-content>
    }`,
  styles: [
    `
      ion-card {
        margin-top: 30vh;
        display: grid;
        gap: 10px;
        padding: 20px;
      }

      ion-button {
        margin-top: 20px;
      }

      ion-img {
        height: 100px;
      }
    `,
  ],
})
export class PlayPage {
  private platform = inject(Platform);
  readonly utils = inject(UtilsService);

  toggleStart = signal(false);

  image = `${ASSETS_PATH.BACKGROUNDS}monkey.png`;
  config: Phaser.Types.Core.GameConfig = {};
  game: Phaser.Game | undefined;

  init() {
    this.config = {
      type: Phaser.AUTO,
      pixelArt: false,
      scale: {
        parent: 'phaser-main',
        width: this.platform.width(),
        height: this.platform.height(),
        mode: Phaser.Scale.CENTER_BOTH,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      // scene: [MainScene],
      plugins: {
        global: [],
        scene: [],
      },
      fps: {
        forceSetTimeOut: true,
      },
      render: {
        transparent: false,
      },
      backgroundColor: '#201726',
      physics: {
        default: 'arcade',
      },
    };
    this.game = new Phaser.Game(this.config);

    this.addScenes();
    this.startScene(SCENE_KEYS.PRELOAD_SCENE);
  }

  addScenes() {
    this.game?.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
    this.game?.scene.add(SCENE_KEYS.MAIN_SCENE, MainScene);
  }

  startScene(scene: string) {
    this.game?.scene.start(scene);
    this.playGame();
  }

  playGame() {
    this.toggleStart.set(true);
  }
}
