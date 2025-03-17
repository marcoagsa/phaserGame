import { Scene } from 'phaser';
import {
  AUDIO_STATE,
  GAME_PAD_DIRECTIONS,
  SCENE_KEYS,
} from 'src/app/constants';
import {
  Background,
  Colliders,
  DropItems,
  GamePad,
  HealthBar,
  Monkey,
  Overlaps,
} from 'src/app/game';
import { App } from '@capacitor/app';

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
    this.#healthBar = new HealthBar(this);
    this.#background = new Background(this);
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
    this.toggleAudio();
    this.handleAppState();
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

  /**
   * Function to handle the app state and pause or resume scene
   *
   * @private
   */
  private handleAppState() {
    App.addListener('appStateChange', (state) => {
      if (!state.isActive) {
        this.scene.scene.sound.mute = true;
        this.scene.pause();
      } else {
        this.scene.scene.sound.mute = false;
        this.scene.resume();
      }
    });
  }

  /**
   * Function to toggle audio music
   */
  private toggleAudio() {
    this.#healthBar.audioIcon.on('pointerdown', () => {
      this.scene.scene.sound.mute = !this.scene.scene.sound.mute;
      this.#healthBar.audioIcon.setTexture(
        this.scene.scene.sound.mute === true
          ? AUDIO_STATE.AUDIO_ON
          : AUDIO_STATE.AUDIO_OFF
      );
    });
  }
}
