import { Scene } from 'phaser';
import { GAME_PAD_DIRECTIONS, SCENE_KEYS } from '../constants';
import {
  Background,
  Colliders,
  DropItems,
  GamePad,
  HealthBar,
  Monkey,
  Overlaps,
} from 'src/app/game';

export class GameScene extends Scene {
  #background!: Background;
  #gamePad!: GamePad;
  #healthBar!: HealthBar;
  #monkey!: Monkey;
  #dropItems!: DropItems;
  #colliders!: Colliders;
  #overlaps!: Overlaps;

  constructor() {
    super({
      key: SCENE_KEYS.GAME_SCENE,
    });
  }

  create() {
    this.#background = new Background(this);
    this.#healthBar = new HealthBar(this);
    this.#monkey = new Monkey(this);
    this.#gamePad = new GamePad(this);
    this.#dropItems = new DropItems(this);
    this.#dropItems.createDropItems();

    this.#colliders = new Colliders(
      this,
      this.#background,
      this.#monkey,
      this.#dropItems
    );
    this.#colliders.initColliders();

    this.#overlaps = new Overlaps(
      this,
      this.#background,
      this.#monkey,
      this.#healthBar,
      this.#dropItems
    );

    this.#overlaps.initOverlaps();
  }

  override update() {
    if (this.#gamePad.moveLeft && !this.#gamePad.moveRight) {
      this.#monkey.move(-200, GAME_PAD_DIRECTIONS.LEFT, true);
    } else if (this.#gamePad.moveRight && !this.#gamePad.moveLeft) {
      this.#monkey.move(200, GAME_PAD_DIRECTIONS.RIGHT, true);
    } else {
      this.#monkey.move(0, GAME_PAD_DIRECTIONS.TURN, undefined);
    }
  }
}
