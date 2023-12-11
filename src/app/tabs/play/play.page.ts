import { Component, OnInit, inject, signal } from '@angular/core';
import { Platform } from '@ionic/angular';
import { MainScene } from 'src/app/game/MainScene';
import * as Phaser from 'phaser';
import { SCENE_KEYS } from 'src/app/constants';
import { PreloadScene } from 'src/app/scenes/preload-scene';

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

  async init() {
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

    this.game.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
    this.game.scene.add(SCENE_KEYS.MAIN_SCENE, MainScene);
    this.game.scene.start(SCENE_KEYS.PRELOAD_SCENE);
  }
}
