import { Component, OnInit, inject } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SCENE_KEYS } from 'src/app/constants';
import { GameScene } from 'src/app/scenes/game-scene';
import { PreloadScene } from 'src/app/scenes/preload-scene';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
})
export class ScoresPage implements OnInit {
  platform = inject(Platform);

  ngOnInit(): void {
    const game = new Phaser.Game({
      type: Phaser.CANVAS,
      pixelArt: false,
      scale: {
        parent: 'game-container',
        width: this.platform.width(),
        height: this.platform.height(),
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      backgroundColor: '#201726',
      physics: {
        default: 'arcade',
      },
    });
    game.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
    game.scene.add(SCENE_KEYS.GAME_SCENE, GameScene);
    game.scene.start(SCENE_KEYS.PRELOAD_SCENE);
  }
}
