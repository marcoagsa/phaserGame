import { GAME_PAD_DIRECTIONS } from 'src/app/constants';

export class GamePad {
  moveLeft!: boolean;
  moveRight!: boolean;
  #scene: Phaser.Scene;
  #leftArrow!: Phaser.GameObjects.Image;
  #rightArrow!: Phaser.GameObjects.Image;
  #controlsAreaHeight: number;
  #sceneHeight: number;
  #sceneWidth: number;
  #gameAreaHeight: number;

  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
    this.#sceneHeight = this.#scene.scale.height;
    this.#sceneWidth = this.#scene.scale.width;
    this.#controlsAreaHeight = this.#sceneHeight * 0.2 - 20;
    this.#gameAreaHeight = this.#sceneHeight - this.#controlsAreaHeight;
    this.initGamePad();
    this.gamePadMoves();
  }

  /**
   * Function to init game pad
   * @private
   */
  private initGamePad() {
    this.#leftArrow = this.addPhaserImage(
      0.1,
      this.#gameAreaHeight,
      GAME_PAD_DIRECTIONS.LEFT
    );

    this.#rightArrow = this.addPhaserImage(
      0.7,
      this.#gameAreaHeight,
      GAME_PAD_DIRECTIONS.RIGHT
    );
  }

  /**
   * Function to add new Phaser image
   * @private
   * @param {number} x position of the image
   * @param {number} y position of the image
   * @param {(string | Phaser.Textures.Texture)} texture image to add
   * @return {*}  {Phaser.GameObjects.Image}
   */
  private addPhaserImage(
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture
  ): Phaser.GameObjects.Image {
    return this.#scene.add
      .image(this.#sceneWidth * x, y, texture)
      .setOrigin(0, 0)
      .setInteractive()
      .setDepth(2);
  }

  /**
   * Function to handle pointer Down and Up
   * @private
   */
  private gamePadMoves() {
    this.moveLeft = false;
    this.moveRight = false;

    this.#leftArrow.on('pointerdown', () => {
      this.moveLeft = true;
    });

    this.#leftArrow.on('pointerup', () => {
      this.moveLeft = false;
    });

    this.#rightArrow.on('pointerdown', () => {
      this.moveRight = true;
    });

    this.#rightArrow.on('pointerup', () => {
      this.moveRight = false;
    });
  }
}
