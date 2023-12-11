import * as Phaser from 'phaser';
import {
  ASSETS_PATH,
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
    this.load.image(
      BACKGROUND_ASSET_KEYS.BACKGROUND,
      `${ASSETS_PATH.BACKGROUNDS}bg.jpg`
    );
    this.load.image(OBJECTS_ASSET_KEYS.STAR, `${ASSETS_PATH.ITEM}star.png`);
    this.load.image(
      OBJECTS_ASSET_KEYS.RED_MUSHROOM,
      `${ASSETS_PATH.ITEM}mushroomred.webp`
    );
    this.load.image(OBJECTS_ASSET_KEYS.BOMB, `${ASSETS_PATH.ITEM}bomb.png`);
    this.load.image(
      PLATFORM_ASSET_KEYS.BASE,
      `${ASSETS_PATH.ITEM}platform.png`
    );
    this.load.image(
      HEALTH_BAR_ASSET_KEYS.HEALTH_BACKGROUND,
      `${ASSETS_PATH.UI}custom-ui.png`
    );
    this.load.spritesheet(
      MONKEY_ASSET_KEYS.MONKEY,
      `${ASSETS_PATH.SPRITES}player.png`,
      {
        frameWidth: 32,
        frameHeight: 48,
      }
    );
    this.load.image(
      GAME_PAD_ASSET_KEYS.LEFT,
      `${ASSETS_PATH.ITEM}leftarrow.png`
    );
    this.load.image(
      GAME_PAD_ASSET_KEYS.RIGHT,
      `${ASSETS_PATH.ITEM}rightarrow.png`
    );
  }

  create() {
    this.scene.start(SCENE_KEYS.GAME_SCENE);
  }
}
