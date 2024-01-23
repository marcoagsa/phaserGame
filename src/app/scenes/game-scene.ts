import { Scene } from 'phaser';
import { GAME_PAD_DIRECTIONS, SCENE_KEYS } from '../constants';
import { Background, DropItems, GamePad, HealthBar, Monkey } from '../game';

export class GameScene extends Scene {
  #background!: Background;
  #gamePad!: GamePad;
  #healthBar!: HealthBar;
  #monkey!: Monkey;
  #dropItems!: DropItems;

  constructor() {
    super({
      key: SCENE_KEYS.GAME_SCENE,
    });
  }

  create() {
    this.#background = new Background(this);
    this.#background.showBackground();

    this.#healthBar = new HealthBar(this);

    this.#monkey = new Monkey(this);

    this.#gamePad = new GamePad(this);

    this.#dropItems = new DropItems(this);
    this.#dropItems.createDropItems();
  }

  override update() {
    if (this.#gamePad.moveLeft && !this.#gamePad.moveRight) {
      this.#monkey.move(0 - 200, GAME_PAD_DIRECTIONS.LEFT, true);
    } else if (this.#gamePad.moveRight && !this.#gamePad.moveLeft) {
      this.#monkey.move(200, GAME_PAD_DIRECTIONS.RIGHT, true);
    } else {
      this.#monkey.move(0, GAME_PAD_DIRECTIONS.TURN, undefined);
    }
  }
}
