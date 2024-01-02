import { Component, OnInit, inject, signal } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { SCENE_KEYS } from 'src/app/constants';
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
      <ion-item>
        <ion-button
          (click)="init()"
          expand="block"
          shape="round"
          color="primary"
        >
          Start Game {{ toggleStart() }}
        </ion-button>
      </ion-item>
    </ion-content>
    }`,
  styles: [],
})
export class PlayPage implements OnInit {
  private platform = inject(Platform);
  private utils = inject(UtilsService);

  toggleStart = signal(false);
  config: Phaser.Types.Core.GameConfig = {};
  game: Phaser.Game | undefined;

  async ngOnInit() {
    console.log('xupa');
  }

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

    this.game?.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
    this.game?.scene.add(SCENE_KEYS.MAIN_SCENE, MainScene);
    this.game?.scene.start(SCENE_KEYS.PRELOAD_SCENE);
    this.startGame();
  }

  addScenes() {
    this.game?.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
    this.game?.scene.add(SCENE_KEYS.MAIN_SCENE, MainScene);
  }

  startScene(scene: string) {
    this.game?.scene.start(scene);
  }

  startGame() {
    this.toggleStart.set(true);
  }
}
