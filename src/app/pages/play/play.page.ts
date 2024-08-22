import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
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
import { GameScene } from 'src/app/scenes/game-scene';
import { PreloadScene } from 'src/app/scenes/preload-scene';
import { UtilsService } from 'src/app/services';

const imports = [IonContent, IonCard, IonButton, IonImg, IonIcon];

const styles = [
  `#startGame {
  position: absolute;
  top: 55%;
  left: 35%;
  z-index: 100;
}
ion-img {
 position: absolute;
   top: 38vh;
  left: 46vw;
  scale: 5;
z-index: 100;
}
`,
];

@Component({
  selector: 'app-play',
  standalone: true,
  imports,
  styles,
  template: `
    <ion-content [fullscreen]="true">
      <div id="phaser-main"></div>
      @if (startButton()) {
      <ion-img [src]="'/assets/backgrounds/monkey.png'" />
      <ion-button
        id="startGame"
        expand="block"
        color="tertiary"
        (click)="startGame()"
        >Star Game</ion-button
      >
      }
    </ion-content>
  `,
})
export class PlayPage implements OnInit, OnDestroy {
  private readonly platform = inject(Platform);
  private readonly utils = inject(UtilsService);

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
    backgroundColor: '#000000',
    physics: {
      default: 'arcade',
    },
  };
  game = signal<Phaser.Game | undefined>(undefined);

  startButton = signal(true);

  constructor() {
    addIcons({ playOutline, caretBackOutline });
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.game()?.destroy(true, false);
  }

  async init() {
    await this.utils.openTabs();
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
