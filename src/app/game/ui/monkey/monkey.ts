import { GAME_PAD_DIRECTIONS, MONKEY_ASSET_KEYS } from 'src/app/constants';

export class Monkey {
  #scene: Phaser.Scene;
  #monkey!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  #controlsAreaHeight: number;
  #sceneHeight: number;
  #gameAreaHeight: number;

  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
    this.#sceneHeight = this.#scene.scale.height;
    this.#controlsAreaHeight = this.#sceneHeight * 0.2;
    this.#gameAreaHeight = this.#sceneHeight - this.#controlsAreaHeight;
    this.init();
    this.animation();
  }

  get monkey() {
    return this.#monkey;
  }

  /**
   * Function to init monkey
   * @private
   */
  private init() {
    this.#monkey = this.#scene.physics.add
      .sprite(
        this.#scene.scale.width / 2,
        this.#gameAreaHeight - 24,
        MONKEY_ASSET_KEYS.MONKEY
      )
      .setCollideWorldBounds(true)
      .setVelocityX(0)
      .setBounce(0)
      .setDepth(3);
  }

  /**
   * Function to add monkey animation
   * @private
   */
  private animation() {
    // adds animations for player

    if (!this.#scene.anims.exists(GAME_PAD_DIRECTIONS.LEFT)) {
      this.#scene.anims.create({
        key: GAME_PAD_DIRECTIONS.LEFT,
        frames: this.#scene.anims.generateFrameNumbers(
          MONKEY_ASSET_KEYS.MONKEY,
          {
            start: 0,
            end: 3,
          }
        ),
        frameRate: 10,
        repeat: -1,
      });
    }

    if (!this.#scene.anims.exists(GAME_PAD_DIRECTIONS.TURN)) {
      this.#scene.anims.create({
        key: GAME_PAD_DIRECTIONS.TURN,
        frames: [{ key: MONKEY_ASSET_KEYS.MONKEY, frame: 4 }],
      });
    }

    if (!this.#scene.anims.exists(GAME_PAD_DIRECTIONS.RIGHT)) {
      this.#scene.anims.create({
        key: GAME_PAD_DIRECTIONS.RIGHT,
        frames: this.#scene.anims.generateFrameNumbers(
          MONKEY_ASSET_KEYS.MONKEY,
          {
            start: 5,
            end: 8,
          }
        ),
        frameRate: 10,
        repeat: -1,
      });
    }

    // sets player physics
    this.monkey.body.setGravityY(300);
    this.monkey.setCollideWorldBounds(true).refreshBody();
  }

  /**
   * Monkey move
   * @param {number} velocityX velocity x for the monkey
   * @param {keyof typeof GAME_PAD_DIRECTIONS } keypress direction press
   * @param {(boolean | undefined)} ignoreIfPlaying
   */
  move(
    velocityX: number,
    keypress: string,
    ignoreIfPlaying: boolean | undefined
  ) {
    this.#monkey.setVelocityX(velocityX);

    this.#monkey.body.setDragX(500);

    this.#monkey.anims.play(keypress, ignoreIfPlaying);
  }

  /**
   * Increase monkey scale
   * @param {number} scale a number between 0 and 1
   */
  increaseMonkeyScale(scale: number) {
    this.#monkey.scale += scale;
    this.#monkey.refreshBody();
  }

  /**
   * Reduce monkey scale
   * @param {number} scale a number between 0 and 1
   */
  reduceMonkeyScale(scale: number) {
    if (this.#monkey.scale < 1) {
      return;
    }
    this.#monkey.scale -= scale;
    this.#monkey.refreshBody();
  }

  reset() {
    this.#scene.tweens.add({
      targets: this.#monkey,
      scaleX: 1.0,
      scaleY: 1.0,
      ease: 'Elastic',
      duration: 500,
      onComplete: () => {},
    });
  }
}
