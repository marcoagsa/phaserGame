import { GAME_PAD_ASSET_KEYS } from 'src/app/constants';

export class GamePad {
  #scene: Phaser.Scene;
  leftArrow!: Phaser.GameObjects.Image;
  rightArrow!: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
    this.initGamePad();
  }

  initGamePad() {
    const controlsAreaHeight = this.#scene.scale.height * 0.2 - 20;
    const gameAreaHeight = this.#scene.scale.height - controlsAreaHeight;

    this.leftArrow = this.#scene.add
      .image(
        this.#scene.scale.width * 0.1,
        gameAreaHeight,
        GAME_PAD_ASSET_KEYS.LEFT
      )
      .setOrigin(0, 0)
      .setInteractive()
      .setDepth(2);
    this.rightArrow = this.#scene.add
      .image(
        this.#scene.scale.width * 0.7,
        gameAreaHeight,
        GAME_PAD_ASSET_KEYS.RIGHT
      )
      .setOrigin(0, 0)
      .setInteractive()
      .setDepth(2);
  }
}
