import { Scene } from 'phaser';
import {
  FONT_ASSET_KEYS,
  GAME_PAD_ASSET_KEYS,
  MONKEY_ASSET_KEYS,
  OBJECTS_ASSET_KEYS,
  SCENE_KEYS,
} from '../constants';
import { Background, GamePad, HealthBar, Monkey } from '.';

export class MainScene extends Scene {
  stars!: Phaser.Physics.Arcade.Group;
  bombs!: Phaser.Physics.Arcade.Group;
  mushroomRed!: Phaser.Physics.Arcade.Group;
  mushroomGreen!: Phaser.Physics.Arcade.Group;
  mushroomBlue!: Phaser.Physics.Arcade.Group;
  gameOverText!: Phaser.GameObjects.BitmapText;

  #background: any;
  #healthBar: any;
  #gamePad: any;
  #monkey: any;

  constructor() {
    super({ key: SCENE_KEYS.MAIN_SCENE });
  }

  initValues() {
    this.#background = new Background(this);

    this.#healthBar = new HealthBar(this);

    this.#monkey = new Monkey(this);

    this.#gamePad = new GamePad(this);
  }

  async addMushroomRed() {
    // Adds generated stars
    this.mushroomRed = this.physics.add.group({
      gravityY: 200,
    });

    this.createMushroomRed();
    this.createMushroomRedLoop();
  }

  createMushroomRed() {
    const x = Math.random() * this.scale.width;
    const mushroomRed = this.mushroomRed.create(x, 0, 'mushroomRed');
    mushroomRed.setScale(0.1);
  }

  createMushroomRedLoop() {
    const delay = Math.floor(Math.random() * (1300 - 1000 + 1)) + 1000;

    const event = this.time.addEvent({
      delay: delay,
      callback: this.createMushroomRed,
      callbackScope: this,
      loop: true,
    });
  }

  addStars() {
    // Adds generated stars
    this.stars = this.physics.add.group({
      gravityY: 300,
    });

    this.createStar();
    this.createStarLoop();
  }

  createStar() {
    const x = Math.random() * this.scale.width;
    const star = this.stars.create(x, 0, 'star');
  }

  createStarLoop() {
    const delay = Math.floor(Math.random() * (5000 - 4500 + 1)) + 4500;

    const event = this.time.addEvent({
      delay: delay,
      callback: this.createStar,
      callbackScope: this,
      loop: true,
    });
  }

  addBooms() {
    // Adds generated bombs
    this.bombs = this.physics.add.group({
      gravityY: 900,
    });

    this.createBomb();
    this.createBombLoop();
  }

  createBomb() {
    const x = Math.random() * this.scale.width;
    const bomb = this.bombs.create(x, 0, 'bomb');
    bomb.setScale(2).refreshBody();
  }

  createBombLoop() {
    const calc = 4500 - this.#healthBar.score * 100;
    const delay = Math.floor(Math.random() * (5000 - 4500 + 1)) + calc;

    const event = this.time.addEvent({
      // random number between 4.5 and 5 seconds
      delay: delay,
      callback: this.createBomb,
      callbackScope: this,
      loop: true,
    });
  }

  playerAndStars() {
    // Adds overlap between player and stars
    this.physics.add.overlap(
      this.#monkey.monkey,
      this.stars,
      (object1: any, object2: any) => {
        const star = object1.key === 'player' ? object1 : object2;
        star.destroy();
        this.#healthBar.score += 50;
        this.#monkey.monkey.scale += 0.1;
        this.#healthBar.scoreText.setText('Score: ' + this.#healthBar.score);
      },
      undefined,
      this
    );
  }

  playerAndMushroomRed() {
    // Adds overlap between player and stars
    this.physics.add.overlap(
      this.#monkey.monkey,
      this.mushroomRed,
      (object1: any, object2: any) => {
        const mushroomRed = object1.key === 'player' ? object1 : object2;
        mushroomRed.destroy();
        this.#healthBar.score += 10;
        this.#monkey.monkey.scale += 0.1;
        this.#healthBar.scoreText.setText('Score: ' + this.#healthBar.score);
      },
      undefined,
      this
    );
  }

  playerAndBooms() {
    // Adds overlap between player and bombs
    this.physics.add.overlap(
      this.#monkey.monkey,
      this.bombs,
      (object1: any, object2: any) => {
        const bomb =
          object1.key === MONKEY_ASSET_KEYS.MONKEY ? object1 : object2;
        bomb.destroy();

        if (this.#healthBar.health !== 0) {
          this.#healthBar.handleHearts();
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
          this.#healthBar.score = 0;
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

    this.addMushroomRed();
    this.addBooms();
    this.addStars();

    // Adds colliders between stars and bombs with platform
    this.physics.add.collider(
      this.stars,
      this.#background.platform,
      (object1: any, object2: any) => {
        const star =
          object1.texture.key === OBJECTS_ASSET_KEYS.STAR ? object1 : object2;
        star.destroy();
      }
    );

    this.physics.add.collider(
      this.mushroomRed,
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
      this.bombs,
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
