import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Platform } from '@ionic/angular/standalone';
import {
  IonButton,
  IonCard,
  IonContent,
  IonIcon,
  IonImg,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { caretBackOutline, playOutline } from 'ionicons/icons';
import { SCENE_KEYS } from 'src/app/constants';
import { MainScene } from 'src/app/game/MainScene';
import { GameScene } from 'src/app/scenes/game-scene';
import { PreloadScene } from 'src/app/scenes/preload-scene';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [IonContent, IonCard, IonButton, IonImg, IonIcon],
  template: `
    <ion-content [fullscreen]="true">
      <div id="phaser-main"></div>
    </ion-content>
  `,
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
export class PlayPage implements OnInit, OnDestroy {
  private platform = inject(Platform);

  config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    pixelArt: false,
    parent: 'phaser-main',
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
    backgroundColor: '#201726',
    physics: {
      default: 'arcade',
    },
  };
  game: Phaser.Game | undefined;

  constructor() {
    addIcons({ playOutline, caretBackOutline });
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.game?.destroy(true, false);
  }

  init() {
    this.game = new Phaser.Game(this.config);
    this.game?.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
    // this.game?.scene.add(SCENE_KEYS.GAME_SCENE, GameScene);
    this.game?.scene.add(SCENE_KEYS.MAIN_SCENE, MainScene);
    this.game?.scene.start(SCENE_KEYS.PRELOAD_SCENE);
  }
}
