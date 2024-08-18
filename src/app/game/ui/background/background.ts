import {
  BACKGROUND_ASSET_KEYS,
  BACKGROUND_MUSIC_ASSET_KEYS,
  PLATFORM_ASSET_KEYS,
} from 'src/app/constants';

export class Background {
  platform!: Phaser.Types.Physics.Arcade.ImageWithStaticBody;
  #scene: Phaser.Scene;
  #background!: Phaser.GameObjects.Image;
  #controlsAreaHeight: number;
  #sceneHeight: number;
  #gameAreaHeight: number;
  #index: number = 0;

  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
    this.#sceneHeight = this.#scene.scale.height;
    this.#controlsAreaHeight = this.#sceneHeight * 0.2;
    this.#gameAreaHeight = this.#sceneHeight - this.#controlsAreaHeight;
    this.initBackground();
    this.initPlatform();
  }

  /**
   * Function to add background image
   * @private
   * @param {(Phaser.Textures.Texture
   *       | string)} [background=BACKGROUND_ASSET_KEYS.BG_FOREST]
   */
  private initBackground(
    background: Phaser.Textures.Texture | string = BACKGROUND_ASSET_KEYS.BG0
  ) {
    this.#background = this.#scene.physics.add
      .image(0, 0, background)
      .setDepth(0)
      .setAlpha(1);
    this.#background.displayHeight = this.#scene.scale.height * 2;
    this.#background.displayWidth = this.#scene.scale.width * 2;
    this.#background.x = 200;

    this.playBackgroundSound(BACKGROUND_MUSIC_ASSET_KEYS.BG0);
  }

  /**
   * Function to add platform for the monkey
   */
  private initPlatform() {
    this.platform = this.#scene.physics.add
      .staticImage(0, this.#gameAreaHeight, PLATFORM_ASSET_KEYS.BASE)
      .setOrigin(0, 0)
      .setDepth(3)
      .refreshBody();
  }

  /**
   * Function to stop playing the
   * current background
   * sound and star playing
   * the actual background sound
   *
   * @private
   * @param {string} background
   */
  private playBackgroundSound(background: string) {
    this.stopBackgroundSound();
    this.#scene.sound.play(background, {
      volume: 0.4,
      loop: true,
    });
  }

  /**
   * Function to stop background sound
   *
   * @private
   */
  private stopBackgroundSound() {
    const bgActual = `BG${this.#index - 1}`;

    this.#scene.sound.stopByKey(bgActual);
  }

  /**
   * Function to show background by index
   */
  public showBackground() {
    const bg = `BG${this.#index}`;
    this.#background.setTexture(bg).setAlpha(1);
    this.playBackgroundSound(bg);
  }

  /**
   * Function to update background index and
   * show the new background
   */
  public updateBackground() {
    this.#index += 1;

    if (this.#index > 5) {
      this.#index = 0;
    }
    this.showBackground();
  }
}
