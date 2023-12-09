import * as Phaser from 'phaser';
import {
  BACKGROUND_ASSET_KEYS,
  GAME_PAD_ASSET_KEYS,
  HEALTH_BAR_ASSET_KEYS,
  MONKEY_ASSET_KEYS,
  OBJECTS_ASSET_KEYS,
  PLATFORM_ASSET_KEYS,
  SCENE_KEYS,
} from '../constants';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENE_KEYS.PRELOAD_SCENE,
      // active: true,
    });
  }

  preload() {
    this.load.image(BACKGROUND_ASSET_KEYS.BACKGROUND, 'assets/bg.jpg');
    this.load.image(OBJECTS_ASSET_KEYS.STAR, 'assets/star.png');
    this.load.image(OBJECTS_ASSET_KEYS.RED_MUSHROOM, 'assets/mushroomred.webp');
    this.load.image(OBJECTS_ASSET_KEYS.BOMB, 'assets/bomb.png');
    this.load.image(PLATFORM_ASSET_KEYS.BASE, 'assets/platform.png');
    this.load.image(
      HEALTH_BAR_ASSET_KEYS.HEALTH_BACKGROUND,
      'assets/custom-ui.png'
    );
    this.load.spritesheet(MONKEY_ASSET_KEYS.MONKEY, 'assets/player.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image(GAME_PAD_ASSET_KEYS.LEFT, 'assets/leftarrow.png');
    this.load.image(GAME_PAD_ASSET_KEYS.RIGHT, 'assets/rightarrow.png');
  }

  create() {
    this.scene.start(SCENE_KEYS.GAME_SCENE);
  }
}
