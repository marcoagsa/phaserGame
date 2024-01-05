import { GAME_PAD_ASSET_KEYS } from 'src/app/constants';

export class GamePad {
  #scene: Phaser.Scene;
  leftArrow!: Phaser.GameObjects.Image;
  rightArrow!: Phaser.GameObjects.Image;
  moveLeft!: boolean;
  moveRight!: boolean;

  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
    this.initGamePad();
    this.gamePadMoves();
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

  gamePadMoves() {
    this.moveLeft = false;
    this.moveRight = false;

    this.leftArrow.on('pointerdown', () => {
      this.moveLeft = true;
    });

    this.leftArrow.on('pointerup', () => {
      this.moveLeft = false;
    });

    this.rightArrow.on('pointerdown', () => {
      this.moveRight = true;
    });

    this.rightArrow.on('pointerup', () => {
      this.moveRight = false;
    });
  }
}
