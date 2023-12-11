import { Scene } from 'phaser';
import * as Phaser from 'phaser';
import {
  BACKGROUND_ASSET_KEYS,
  FONT_ASSET_KEYS,
  GAME_PAD_ASSET_KEYS,
  HEALTH_ANIMATION,
  HEALTH_BAR_ASSET_KEYS,
  MONKEY_ASSET_KEYS,
  OBJECTS_ASSET_KEYS,
  PLATFORM_ASSET_KEYS,
  SCENE_KEYS,
} from '../constants';

export class MainScene extends Scene {
  screenWidth!: number;
  screenHeight!: number;
  screenCenterX!: number;
  controlsAreaHeight!: number;
  gameAreaHeight!: number;
  background!: any;
  platform!: Phaser.Types.Physics.Arcade.ImageWithStaticBody;
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  heart!: Phaser.GameObjects.Sprite;
  leftArrow!: Phaser.GameObjects.Image;
  rightArrow!: Phaser.GameObjects.Image;
  moveLeft!: boolean;
  moveRight!: boolean;
  stars!: Phaser.Physics.Arcade.Group;
  bombs!: Phaser.Physics.Arcade.Group;
  mushroomRed!: Phaser.Physics.Arcade.Group;
  mushroomGreen!: Phaser.Physics.Arcade.Group;
  mushroomBlue!: Phaser.Physics.Arcade.Group;
  score!: number;
  scoreText!: Phaser.GameObjects.BitmapText;
  gameOverText!: Phaser.GameObjects.BitmapText;
  health!: number;
  hearts: Phaser.GameObjects.Sprite[] = [];

  constructor() {
    super({ key: SCENE_KEYS.MAIN_SCENE });
  }

  initValues() {
    this.screenWidth = this.scale.width;
    this.screenHeight = this.scale.height;
    this.screenCenterX = this.screenWidth / 2;
    this.controlsAreaHeight = this.screenHeight * 0.2;
    this.gameAreaHeight = this.screenHeight - this.controlsAreaHeight;

    this.background = this.physics.add.image(
      0,
      0,
      BACKGROUND_ASSET_KEYS.BACKGROUND
    );
    this.background.displayHeight = this.scale.height;
    this.background.scaleX = this.background.scaleY;

    this.background.y = this.scale.height / 2;
    this.background.x = this.scale.width / 2;

    this.background.x = this.background.displayHeight * 0.5;

    const healthBackground = this.add
      .image(0, 0, HEALTH_BAR_ASSET_KEYS.HEALTH_BACKGROUND)
      .setOrigin(0)
      .setScale(0.8, 0.6);

    const heartsContainer = this.addHealthBar();

    const container = this.add
      .container(10, 30, [healthBackground, this.addScore()])
      .setDepth(2);
    heartsContainer.forEach((sprite) => {
      container.add(sprite);
    });

    // adds the player, platform, and controls
    this.platform = this.physics.add
      .staticImage(0, this.gameAreaHeight, PLATFORM_ASSET_KEYS.BASE)
      .setOrigin(0, 0)
      .refreshBody();

    this.player = this.physics.add.sprite(
      this.screenCenterX,
      this.gameAreaHeight - 24,
      MONKEY_ASSET_KEYS.MONKEY
    );

    this.leftArrow = this.add
      .image(
        this.screenWidth * 0.1,
        this.gameAreaHeight,
        GAME_PAD_ASSET_KEYS.LEFT
      )
      .setOrigin(0, 0)
      .setInteractive()
      .setDepth(2);
    this.rightArrow = this.add
      .image(
        this.screenWidth * 0.7,
        this.gameAreaHeight,
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

  addScore() {
    this.score = 0;

    this.scoreText = this.add
      .bitmapText(30, 45, 'gothic', `Score: ${this.score}`, 20)
      .setOrigin(0)
      .setCenterAlign()
      .setLetterSpacing(10)
      .setLineSpacing(20)
      .setTint(0xffffff)
      .setDepth(1);

    return this.scoreText;
  }

  addHealthBar() {
    this.health = 6;
    const numberOfHearts = Math.round(this.health / 2);

    for (let index = 0; index < numberOfHearts; index++) {
      this.heart = this.add
        .sprite(30 + index * 30, 20, 'heart', 0)
        .setOrigin(0)
        .setScale(3)
        .setDepth(1);
      this.hearts.push(this.heart);
    }

    return this.hearts;
  }

  handleHearts() {
    const heartIndex = Math.round(this.health / 2) - 1;
    const isHalfHeart = this.health % 2 === 1;
    if (isHalfHeart) {
      this.hearts[heartIndex].play(HEALTH_ANIMATION.LOSE_SECOND_HALF);
    } else {
      this.hearts[heartIndex].play(HEALTH_ANIMATION.LOSE_FIRST_HALF);
    }
    this.health -= 1;
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
    const x = Math.random() * this.screenWidth;
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
    const x = Math.random() * this.screenWidth;
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
    const x = Math.random() * this.screenWidth;
    const bomb = this.bombs.create(x, 0, 'bomb');
    bomb.setScale(2).refreshBody();
  }

  createBombLoop() {
    const calc = 4500 - this.score * 100;
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
        this.score += 50;
        this.player.scale += 0.1;
        this.scoreText.setText('Score: ' + this.score);
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
        this.score += 10;
        this.player.scale += 0.1;
        this.scoreText.setText('Score: ' + this.score);
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

        if (this.health !== 0) {
          this.handleHearts();
          return;
        }

        this.gameOverText = this.add
          .bitmapText(
            50,
            this.screenHeight / 2,
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

        this.time.removeAllEvents();
        this.physics.pause();

        this.input.on('pointerup', () => {
          this.score = 0;
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
