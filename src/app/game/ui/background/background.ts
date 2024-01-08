import { BACKGROUND_ASSET_KEYS, PLATFORM_ASSET_KEYS } from 'src/app/constants';

export class Background {
  #scene: Phaser.Scene;
  #background!: Phaser.Physics.Arcade.Image;
  platform!: Phaser.Types.Physics.Arcade.ImageWithStaticBody;

  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
    this.#initBackground();
    this.#initPlatform();
  }

  #initBackground() {
    this.#background = this.#scene.physics.add
      .image(0, 0, BACKGROUND_ASSET_KEYS.BG_FOREST)
      .setAlpha(0);
    this.#background.displayHeight = this.#scene.scale.height;
    this.#background.scaleX = this.#background.scaleY;

    this.#background.y = this.#scene.scale.height / 2;
    this.#background.x = this.#scene.scale.width / 2;

    this.#background.x = this.#background.displayHeight * 0.5;
  }

  showBackground() {
    this.#background.setAlpha(1);
  }

  updateBackground() {
    this.#background = this.#scene.physics.add.image(
      0,
      0,
      BACKGROUND_ASSET_KEYS.BG_TOXIC
    );
  }

  #initPlatform() {
    const controlsAreaHeight = this.#scene.scale.height * 0.2;
    const gameAreaHeight = this.#scene.scale.height - controlsAreaHeight;
    this.platform = this.#scene.physics.add
      .staticImage(0, gameAreaHeight, PLATFORM_ASSET_KEYS.BASE)
      .setOrigin(0, 0)
      .refreshBody();
  }
}
