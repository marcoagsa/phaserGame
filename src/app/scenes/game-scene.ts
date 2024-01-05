import { Scene } from 'phaser';
import { SCENE_KEYS } from '../constants';
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

  initValues() {}

  create() {
    this.#background = new Background(this);

    this.#healthBar = new HealthBar(this);

    this.#gamePad = new GamePad(this);

    this.#monkey = new Monkey(this);
  }

  override update() {}
}
