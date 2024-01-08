import { BACKGROUND_ASSET_KEYS, PLATFORM_ASSET_KEYS } from 'src/app/constants';

export class Background {
  platform!: Phaser.Types.Physics.Arcade.ImageWithStaticBody;
  #scene: Phaser.Scene;
  #background!: Phaser.Physics.Arcade.Image;
  #controlsAreaHeight: number;
  #sceneHeight: number;
  #gameAreaHeight: number;

  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
    this.#sceneHeight = this.#scene.scale.height;
    this.#controlsAreaHeight = this.#sceneHeight * 0.2;
    this.#gameAreaHeight = this.#sceneHeight - this.#controlsAreaHeight;
    this.initBackground();
    this.initPlatform();
  }

  /**
   * Function to show background on the game
   */
  showBackground() {
    this.#background.setAlpha(1);
  }

  /**
   * Function to update the background
   */
  updateBackground() {
    this.#background = this.#scene.physics.add.image(
      0,
      0,
      BACKGROUND_ASSET_KEYS.BG_TOXIC
    );
  }

  /**
   * Function to init the game background
   * @private
   */
  private initBackground() {
    this.#background = this.#scene.physics.add
      .image(0, 0, BACKGROUND_ASSET_KEYS.BG_FOREST)
      .setAlpha(0);
    this.#background.displayHeight = this.#scene.scale.height;
    this.#background.scaleX = this.#background.scaleY;

    this.#background.y = this.#scene.scale.height / 2;
    this.#background.x = this.#scene.scale.width / 2;

    this.#background.x = this.#background.displayHeight * 0.5;
  }

  /**
   * Function to add platform for the monkey
   * @private
   */
  private initPlatform() {
    this.platform = this.#scene.physics.add
      .staticImage(0, this.#gameAreaHeight, PLATFORM_ASSET_KEYS.BASE)
      .setOrigin(0, 0)
      .refreshBody();
  }
}
