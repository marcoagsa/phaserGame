import { Scene } from 'phaser';
import {
  FONT_ASSET_KEYS,
  GAME_PAD_ASSET_KEYS,
  HEALTH_ANIMATION,
  HEALTH_BAR_ASSET_KEYS,
  MONKEY_ASSET_KEYS,
  OBJECTS_ASSET_KEYS,
  PLATFORM_ASSET_KEYS,
  SCENE_KEYS,
} from '../constants';
import { HealthBar } from './ui/health-bar/health-bar';
import { Background } from './ui/background/background';

export class MainScene extends Scene {
  platform!: Phaser.Types.Physics.Arcade.ImageWithStaticBody;
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  leftArrow!: Phaser.GameObjects.Image;
  rightArrow!: Phaser.GameObjects.Image;
  moveLeft!: boolean;
  moveRight!: boolean;
  stars!: Phaser.Physics.Arcade.Group;
  bombs!: Phaser.Physics.Arcade.Group;
  mushroomRed!: Phaser.Physics.Arcade.Group;
  mushroomGreen!: Phaser.Physics.Arcade.Group;
  mushroomBlue!: Phaser.Physics.Arcade.Group;
  gameOverText!: Phaser.GameObjects.BitmapText;
  #background: any;
  #healthBar: any;

  constructor() {
    super({ key: SCENE_KEYS.MAIN_SCENE });
  }

  initValues() {
    this.#background = new Background(this);

    this.#healthBar = new HealthBar(this);

    // adds the player, platform, and controls
    this.platform = this.physics.add
      .staticImage(0, this.#background.gameAreaHeight, PLATFORM_ASSET_KEYS.BASE)
      .setOrigin(0, 0)
      .refreshBody();

    this.player = this.physics.add.sprite(
      this.#background.screenCenterX,
      this.#background.gameAreaHeight - 24,
      MONKEY_ASSET_KEYS.MONKEY
    );

    this.leftArrow = this.add
      .image(
        this.#background.screenWidth * 0.1,
        this.#background.gameAreaHeight,
        GAME_PAD_ASSET_KEYS.LEFT
      )
      .setOrigin(0, 0)
      .setInteractive()
      .setDepth(2);
    this.rightArrow = this.add
      .image(
        this.#background.screenWidth * 0.7,
        this.#background.gameAreaHeight,
        GAME_PAD_ASSET_KEYS.RIGHT
      )
      .setOrigin(0, 0)
      .setInteractive()
      .setDepth(2);
  }

  addHealthAnimation() {
    this.anims.create({
      key: HEALTH_ANIMATION.LOSE_FIRST_HALF,
      frames: this.anims.generateFrameNames(HEALTH_BAR_ASSET_KEYS.HEART, {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: HEALTH_ANIMATION.LOSE_SECOND_HALF,
      frames: this.anims.generateFrameNames(HEALTH_BAR_ASSET_KEYS.HEART, {
        start: 2,
        end: 4,
      }),
      frameRate: 10,
    });
  }

  addPlayerAnimation() {
    // adds animations for player
    if (!this.anims.exists(GAME_PAD_ASSET_KEYS.LEFT)) {
      this.anims.create({
        key: GAME_PAD_ASSET_KEYS.LEFT,
        frames: this.anims.generateFrameNumbers(MONKEY_ASSET_KEYS.MONKEY, {
          start: 0,
          end: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }

    if (!this.anims.exists(GAME_PAD_ASSET_KEYS.TURN)) {
      this.anims.create({
        key: GAME_PAD_ASSET_KEYS.TURN,
        frames: [{ key: MONKEY_ASSET_KEYS.MONKEY, frame: 4 }],
      });
    }

    if (!this.anims.exists(GAME_PAD_ASSET_KEYS.RIGHT)) {
      this.anims.create({
        key: GAME_PAD_ASSET_KEYS.RIGHT,
        frames: this.anims.generateFrameNumbers(MONKEY_ASSET_KEYS.MONKEY, {
          start: 5,
          end: 8,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }

    // sets player physics
    this.player.body.setGravityY(300);
    this.player.setCollideWorldBounds(true);
  }

  addPlayerMoves() {
    this.moveLeft = false;
    this.moveRight = false;

    this.leftArrow.on('pointerdown', () => {
      this.moveLeft = true;
    });

    this.leftArrow.on('pointerup', () => {
      this.moveLeft = false;
    });

    this.rightArrow.on('pointerdown', () => {
      this.moveRight = true;
    });

    this.rightArrow.on('pointerup', () => {
      this.moveRight = false;
    });
  }

  async addMushroomRed() {
    // Adds generated red mushroom
    this.mushroomRed = this.physics.add.group({
      gravityY: 200,
    });

    this.createMushroomRed();
    this.createMushroomRedLoop();
  }

  createMushroomRed() {
    const x = Math.random() * this.#background.screenWidth;
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
    const x = Math.random() * this.#background.screenWidth;
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
    const x = Math.random() * this.#background.screenWidth;
    const bomb = this.bombs.create(x, 0, 'bomb');
    bomb.setScale(2).refreshBody();
  }

  createBombLoop() {
    // const calc = 4500 - this.score * 100;
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
      this.player,
      this.stars,
      (object1: any, object2: any) => {
        const star = object1.key === 'player' ? object1 : object2;
        star.destroy();
        this.#healthBar.score += 50;
        // this.score += 50;
        this.player.scale += 0.1;
        // this.scoreText.setText('Score: ' + this.score);
        this.#healthBar.scoreText.setText('Score: ' + this.#healthBar.score);
      },
      undefined,
      this
    );
  }

  playerAndMushroomRed() {
    // Adds overlap between player and stars
    this.physics.add.overlap(
      this.player,
      this.mushroomRed,
      (object1: any, object2: any) => {
        const mushroomRed = object1.key === 'player' ? object1 : object2;
        mushroomRed.destroy();
        this.#healthBar.score += 10;
        this.player.scale += 0.1;
        this.#healthBar.scoreText.setText('Score: ' + this.#healthBar.score);
      },
      undefined,
      this
    );
  }

  playerAndBooms() {
    // Adds overlap between player and bombs
    this.physics.add.overlap(
      this.player,
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
            this.#background.screenHeight / 2,
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
    this.addHealthAnimation();
    this.addPlayerAnimation();

    // adds collider between player and platforms
    this.physics.add.collider(this.player, this.platform);

    this.addPlayerMoves();
    this.addMushroomRed();
    this.addBooms();
    this.addStars();

    // Adds colliders between stars and bombs with platform
    this.physics.add.collider(
      this.stars,
      this.platform,
      (object1: any, object2: any) => {
        const star =
          object1.texture.key === OBJECTS_ASSET_KEYS.STAR ? object1 : object2;
        star.destroy();
      }
    );

    this.physics.add.collider(
      this.mushroomRed,
      this.platform,
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
      this.platform,
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
    if (this.moveLeft && !this.moveRight) {
      this.player.setVelocityX(0 - 200);
      this.player.anims.play(GAME_PAD_ASSET_KEYS.LEFT, true);
    } else if (this.moveRight && !this.moveLeft) {
      this.player.setVelocityX(200);
      this.player.anims.play(GAME_PAD_ASSET_KEYS.RIGHT, true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play(GAME_PAD_ASSET_KEYS.TURN);
    }
  }
}
