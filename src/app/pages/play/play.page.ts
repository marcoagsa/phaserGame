import { Component, OnInit, inject, signal } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SCENE_KEYS } from 'src/app/constants';
import { MainScene } from 'src/app/game/MainScene';
import { PreloadScene } from 'src/app/scenes/preload-scene';
import * as Phaser from 'phaser';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [],
  template: `<div id="phaser-main"></div>`,
  styles: [],
})
export class PlayPage implements OnInit {
  readonly platform = inject(Platform);
  config: Phaser.Types.Core.GameConfig = {};
  game: Phaser.Game | undefined;
  startGame = signal(false);

  ngOnInit(): void {
    this.init();
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

    this.addScenes();
    this.startScene(SCENE_KEYS.PRELOAD_SCENE);
  }

  addScenes() {
    this.game?.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
    this.game?.scene.add(SCENE_KEYS.MAIN_SCENE, MainScene);
  }

  startScene(scene: string) {
    this.game?.scene.start(scene);
  }
}
