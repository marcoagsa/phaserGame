import * as Phaser from 'phaser';
import {
  ASSETS_PATH,
  BACKGROUND_ASSET_KEYS,
  FONT_ASSET_KEYS,
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
    this.load.bitmapFont(
      FONT_ASSET_KEYS.GOTHIC,
      `${ASSETS_PATH.FONTS}gothic.png`,
      `${ASSETS_PATH.FONTS}gothic.xml`
    );

    this.load.image(
      BACKGROUND_ASSET_KEYS.BACKGROUND,
      `${ASSETS_PATH.BACKGROUNDS}bg.jpg`
    );
    this.load.image(
      PLATFORM_ASSET_KEYS.BASE,
      `${ASSETS_PATH.ITEMS}platform.png`
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
      `${ASSETS_PATH.ITEMS}leftarrow.png`
    );
    this.load.image(
      GAME_PAD_ASSET_KEYS.RIGHT,
      `${ASSETS_PATH.ITEMS}rightarrow.png`
    );
    this.load.spritesheet('heart', `${ASSETS_PATH.SPRITES}heart.png`, {
      frameWidth: 7,
      frameHeight: 7,
    });
    this.load.image(OBJECTS_ASSET_KEYS.STAR, `${ASSETS_PATH.ITEMS}star.png`);

    this.load.image(
      OBJECTS_ASSET_KEYS.MUSHROOM_RED,
      `${ASSETS_PATH.ITEMS}mushroomred.webp`
    );

    this.load.image(OBJECTS_ASSET_KEYS.BOMB, `${ASSETS_PATH.ITEMS}bomb.png`);
  }

  create() {
    // this.scene.start(SCENE_KEYS.GAME_SCENE);
    this.scene.start(SCENE_KEYS.MAIN_SCENE);
  }
}
