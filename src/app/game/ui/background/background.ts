import { BACKGROUND_ASSET_KEYS } from 'src/app/constants';

export class Background {
  #scene: Phaser.Scene;
  screenWidth!: number;
  screenHeight!: number;
  screenCenterX!: number;
  controlsAreaHeight!: number;
  gameAreaHeight!: number;
  background!: any;

  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
    this.initBackground();
  }

  initBackground() {
    this.screenWidth = this.#scene.scale.width;
    this.screenHeight = this.#scene.scale.height;
    this.screenCenterX = this.screenWidth / 2;
    this.controlsAreaHeight = this.screenHeight * 0.2;
    this.gameAreaHeight = this.screenHeight - this.controlsAreaHeight;

    this.background = this.#scene.physics.add.image(
      0,
      0,
      BACKGROUND_ASSET_KEYS.BACKGROUND
    );
    this.background.displayHeight = this.#scene.scale.height;
    this.background.scaleX = this.background.scaleY;

    this.background.y = this.#scene.scale.height / 2;
    this.background.x = this.#scene.scale.width / 2;

    this.background.x = this.background.displayHeight * 0.5;
  }
}
