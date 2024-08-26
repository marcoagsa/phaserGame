import { GAME_PAD_DIRECTIONS } from 'src/app/constants';

export class GamePad {
  moveLeft!: boolean;
  moveRight!: boolean;
  private scene: Phaser.Scene;
  private leftArrow!: Phaser.GameObjects.Image;
  private rightArrow!: Phaser.GameObjects.Image;
  private controlsAreaHeight: number;
  private sceneHeight: number;
  private sceneWidth: number;
  private gameAreaHeight: number;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.sceneHeight = this.scene.scale.height;
    this.sceneWidth = this.scene.scale.width;
    this.controlsAreaHeight = this.sceneHeight * 0.2 - 20;
    this.gameAreaHeight = this.sceneHeight - this.controlsAreaHeight;
    this.initGamePad();
    this.gamePadMoves();
  }

  private initGamePad() {
    this.leftArrow = this.addPhaserImage(
      0.05,
      this.gameAreaHeight,
      GAME_PAD_DIRECTIONS.LEFT
    );

    this.rightArrow = this.addPhaserImage(
      0.69,
      this.gameAreaHeight,
      GAME_PAD_DIRECTIONS.RIGHT
    );
  }

  private addPhaserImage(
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture
  ): Phaser.GameObjects.Image {
    return this.scene.add
      .image(this.sceneWidth * x, y, texture)
      .setOrigin(0, 0)
      .setDepth(2)
      .setDisplaySize(100, 100)
      .setInteractive();
  }

  private setMoveLeft(isMoving: boolean) {
    this.moveLeft = isMoving;
  }

  private setMoveRight(isMoving: boolean) {
    this.moveRight = isMoving;
  }

  private addPointerEvents(arrow: Phaser.GameObjects.Image, direction: string) {
    arrow.on('pointerdown', () => {
      if (direction === GAME_PAD_DIRECTIONS.LEFT) this.setMoveLeft(true);
      else this.setMoveRight(true);
    });

    arrow.on('pointerup', () => {
      if (direction === GAME_PAD_DIRECTIONS.LEFT) this.setMoveLeft(false);
      else this.setMoveRight(false);
    });
  }

  private gamePadMoves() {
    this.addPointerEvents(this.leftArrow, GAME_PAD_DIRECTIONS.LEFT);
    this.addPointerEvents(this.rightArrow, GAME_PAD_DIRECTIONS.RIGHT);
  }
}
