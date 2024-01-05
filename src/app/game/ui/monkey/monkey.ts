import { GAME_PAD_ASSET_KEYS, MONKEY_ASSET_KEYS } from 'src/app/constants';

export class Monkey {
  #scene: Phaser.Scene;
  monkey!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
    this.initMonkey();
    this.addPlayerAnimation();
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

  addPlayerAnimation() {
    // adds animations for player
    if (!this.#scene.anims.exists(GAME_PAD_ASSET_KEYS.LEFT)) {
      this.#scene.anims.create({
        key: GAME_PAD_ASSET_KEYS.LEFT,
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

    if (!this.#scene.anims.exists(GAME_PAD_ASSET_KEYS.TURN)) {
      this.#scene.anims.create({
        key: GAME_PAD_ASSET_KEYS.TURN,
        frames: [{ key: MONKEY_ASSET_KEYS.MONKEY, frame: 4 }],
      });
    }

    if (!this.#scene.anims.exists(GAME_PAD_ASSET_KEYS.RIGHT)) {
      this.#scene.anims.create({
        key: GAME_PAD_ASSET_KEYS.RIGHT,
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
    this.monkey.setCollideWorldBounds(true);
  }
}
