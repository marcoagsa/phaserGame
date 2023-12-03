import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import * as Phaser from 'phaser';
import { MainScene } from 'src/app/game/MainScene';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [IonicModule],
  template: `<ion-content fullscreen="true">
    <div id="phaser-main"></div>
  </ion-content>`,
  styles: [
    `
      #phaser-main {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #201726;
      }
    `,
  ],
})
export class PlayPage implements OnInit, OnDestroy {
  readonly platform = inject(Platform);
  mainScene = inject(MainScene);
  config: Phaser.Types.Core.GameConfig = {};
  game: Phaser.Game | undefined;

  startGame = signal<boolean>(false);

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.config = {
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.FIT,
        width: this.platform.width(),
        autoCenter: Phaser.Scale.CENTER_BOTH,
        height: this.platform.height(),
      },
      parent: 'phaser-main',
      scene: [this.mainScene],
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
    // this.startGame.set(true);
  }

  ngOnDestroy(): void {
    if (this.game) {
      this.game.destroy(true, false);
    }
  }
}
