import { Scene } from 'phaser';
import { GAME_PAD_ASSET_KEYS, SCENE_KEYS } from '../constants';
import { Background, GamePad, HealthBar, Monkey } from '../game';

export class GameScene extends Scene {
  #background: any;
  #healthBar: any;
  #gamePad: any;
  #monkey: any;

  constructor() {
    super({
      key: SCENE_KEYS.GAME_SCENE,
    });
  }

  create() {
    this.#background = new Background(this);

    this.#healthBar = new HealthBar(this);

    this.#gamePad = new GamePad(this);

    this.#monkey = new Monkey(this);
  }

  override update() {
    if (this.#gamePad.moveLeft && !this.#gamePad.moveRight) {
      this.#monkey.monkey.setVelocityX(0 - 200);
      this.#monkey.monkey.anims.play(GAME_PAD_ASSET_KEYS.LEFT, true);
    } else if (this.#gamePad.moveRight && !this.#gamePad.moveLeft) {
      this.#monkey.monkey.setVelocityX(200);
      this.#monkey.monkey.anims.play(GAME_PAD_ASSET_KEYS.RIGHT, true);
    } else {
      this.#monkey.monkey.setVelocityX(0);
      this.#monkey.monkey.anims.play(GAME_PAD_ASSET_KEYS.TURN);
    }
  }
}
