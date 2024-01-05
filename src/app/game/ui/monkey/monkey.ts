import { MONKEY_ASSET_KEYS } from 'src/app/constants';

export class Monkey {
  #scene: Phaser.Scene;
  monkey!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
    this.initMonkey();
  }

  initMonkey() {
    const controlsAreaHeight = this.#scene.scale.height * 0.2;
    const gameAreaHeight = this.#scene.scale.height - controlsAreaHeight;
    this.monkey = this.#scene.physics.add.sprite(
      this.#scene.scale.width / 2,
      gameAreaHeight - 24,
      MONKEY_ASSET_KEYS.MONKEY
    );
  }
}
