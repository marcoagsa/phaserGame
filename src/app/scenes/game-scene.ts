import * as Phaser from 'phaser';
import {
  BACKGROUND_ASSET_KEYS,
  GAME_PAD_ASSET_KEYS,
  HEALTH_BAR_ASSET_KEYS,
  MONKEY_ASSET_KEYS,
  PLATFORM_ASSET_KEYS,
  SCENE_KEYS,
} from '../constants';

export class GameScene extends Phaser.Scene {
  moveLeft!: boolean;
  moveRight!: boolean;
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor() {
    super({
      key: SCENE_KEYS.GAME_SCENE,
      // active: true,
    });
  }

  create() {
    // const screenWidth = this.scale.width;
    // const screenHeight = this.scale.height;
    // const screenCenterX = screenWidth / 2;
    // const controlsAreaHeight = screenHeight * 0.2;
    // const gameAreaHeight = screenHeight - controlsAreaHeight;

    // add main background
    this.add.image(0, 0, BACKGROUND_ASSET_KEYS.BACKGROUND).setOrigin(0);

    const score = 0;
    this.add.container(0, 50, [
      this.add
        .image(5, 5, HEALTH_BAR_ASSET_KEYS.HEALTH_BACKGROUND)
        .setOrigin(0)
        .setScale(0.5, 0.5),
      this.add
        .text(50, 50, `Score: ${score}`, {
          fontSize: '15px',
          color: 'black',
        })
        .setOrigin(0.5, 0.5),
    ]);
  }

  override update() {}
}
