import { Scene } from 'phaser';
import {
  FONT_ASSET_KEYS,
  GAME_PAD_DIRECTIONS,
  MONKEY_ASSET_KEYS,
  OBJECTS_ASSET_KEYS,
  SCENE_KEYS,
} from '../constants';
import { Background, DropItems, GamePad, HealthBar, Monkey } from '.';

export class MainScene extends Scene {
  gameOverText!: Phaser.GameObjects.BitmapText;

  #background!: Background;
  #gamePad!: GamePad;
  #healthBar!: HealthBar;
  #monkey!: Monkey;
  #dropItems!: DropItems;

  constructor() {
    super({ key: SCENE_KEYS.MAIN_SCENE });
  }

  initValues() {
    this.#background = new Background(this);
    this.#background.showBackground();

    this.#healthBar = new HealthBar(this);

    this.#monkey = new Monkey(this);

    this.#gamePad = new GamePad(this);

    this.#dropItems = new DropItems(this);
    this.#dropItems.createDropItems();
  }

  playerAndStars() {
    // Adds overlap between player and stars
    this.physics.add.overlap(
      this.#monkey.monkey,
      this.#dropItems.stars,
      (object1: any, object2: any) => {
        const star = object1.key === 'player' ? object1 : object2;
        star.destroy();
        this.#healthBar.updateScoreValue(50);
        this.updateLevel();
      },
      undefined,
      this
    );
  }

  playerAndMushroomRed() {
    // Adds overlap between player and stars
    this.physics.add.overlap(
      this.#monkey.monkey,
      this.#dropItems.mushroomRed,
      (object1: any, object2: any) => {
        const mushroomRed = object1.key === 'player' ? object1 : object2;
        mushroomRed.destroy();
        this.#healthBar.updateScoreValue(10);
        this.#monkey.increaseMonkeyScale(0.1);
        this.updateLevel();
      },
      undefined,
      this
    );
  }

  updateLevel() {
    this.#healthBar.handledScaleMeter({
      duration: 1500,
      callback: (res: any) => {
        const roundedScale = Math.round(res * 10) / 10;
        if (roundedScale >= 148.1 && roundedScale <= 150.1) {
          this.#monkey.monkey.scale = 1;
          this.#healthBar.updateLevelValue();
          this.#background.updateBackground();
          this.#healthBar.resetScaleMeter();
        }
      },
    });
  }

  playerAndBooms() {
    // Adds overlap between player and bombs
    this.physics.add.overlap(
      this.#monkey.monkey,
      this.#dropItems.bombs,
      (object1: any, object2: any) => {
        const bomb =
          object1.key === MONKEY_ASSET_KEYS.MONKEY ? object1 : object2;
        bomb.destroy();

        if (this.#healthBar.health !== 0) {
          this.#healthBar.handleLoseHearts();
          this.#monkey.reduceMonkeyScale(0.1);
          this.updateLevel();
          return;
        }

        this.time.removeAllEvents();
        this.physics.pause();

        this.gameOverText = this.add
          .bitmapText(
            50,
            this.scale.height / 2,
            FONT_ASSET_KEYS.GOTHIC,
            `GAME OVER`,
            45
          )
          .setOrigin(0)
          .setCenterAlign()
          .setLetterSpacing(10)
          .setLineSpacing(20)
          .setTint(0xff0000)
          .setDropShadow(2, 4, 0xffffff)
          .setDepth(1);

        this.input.on('pointerup', () => {
          this.#healthBar.updateScoreValue(0);
          this.#healthBar.updateLevelValue(true);
          this.game.destroy(true, false);
        });
      },
      undefined,
      this
    );
  }

  create() {
    this.initValues();

    // adds collider between player and platforms
    this.physics.add.collider(this.#monkey.monkey, this.#background.platform);

    // Adds colliders between stars and bombs with platform
    this.physics.add.collider(
      this.#dropItems.stars,
      this.#background.platform,
      (object1: any, object2: any) => {
        const star =
          object1.texture.key === OBJECTS_ASSET_KEYS.STAR ? object1 : object2;
        star.destroy();
      }
    );

    this.physics.add.collider(
      this.#dropItems.mushroomRed,
      this.#background.platform,
      (object1: any, object2: any) => {
        const mushroomRed =
          object1.texture.key === OBJECTS_ASSET_KEYS.MUSHROOM_RED
            ? object1
            : object2;
        mushroomRed.destroy();
      }
    );

    this.physics.add.collider(
      this.#dropItems.bombs,
      this.#background.platform,
      (object1: any, object2: any) => {
        const bomb =
          object1.key === OBJECTS_ASSET_KEYS.BOMB ? object1 : object2;
        bomb.destroy();
      }
    );

    this.playerAndMushroomRed();
    this.playerAndStars();
    this.playerAndBooms();
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
