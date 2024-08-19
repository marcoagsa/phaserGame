import * as Phaser from 'phaser';
import { ASSETS_PATH, FONT_ASSET_KEYS, SCENE_KEYS } from 'src/app/constants';

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

    // Load Json file with all assets we need for the game
    this.load.pack('assets_pack', '/assets/data/assets.json');
  }

  create() {
    this.scene.start(SCENE_KEYS.GAME_SCENE);
  }
}
