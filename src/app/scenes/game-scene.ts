import { Scene } from 'phaser';
import { SCENE_KEYS } from '../constants';
import { Background } from '../game/ui/background/background';
import { HealthBar } from '../game/ui/health-bar/health-bar';

export class GameScene extends Scene {
  #background: any;
  #healthBar: any;

  constructor() {
    super({
      key: SCENE_KEYS.GAME_SCENE,
    });
  }

  initValues() {}

  create() {
    this.#background = new Background(this);

    this.#healthBar = new HealthBar(this);
  }

  override update() {}
}
