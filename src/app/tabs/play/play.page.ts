import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Platform } from '@ionic/angular';
import { MainScene } from 'src/app/game/MainScene';
import * as Phaser from 'phaser';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [],
  template: `<div id="phaser-main"></div>`,
  styles: [],
})
export class PlayPage implements OnInit, OnDestroy {
  readonly platform = inject(Platform);
  config: Phaser.Types.Core.GameConfig = {};
  game: Phaser.Game | undefined;
  startGame = signal(false);

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.config = {
      type: Phaser.CANVAS,
      pixelArt: false,
      scale: {
        parent: 'phaser-main',
        mode: Phaser.Scale.CENTER_BOTH,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: this.platform.width(),
        height: this.platform.height(),
      },
      scene: [MainScene],
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
  }

  ionViewWillLeave() {
    if (this.game) {
      this.game.destroy(true, false);
    }
  }

  ngOnDestroy(): void {
    if (this.game) {
      this.game.destroy(true, false);
    }
  }
}
