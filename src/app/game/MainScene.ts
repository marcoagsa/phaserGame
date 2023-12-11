import { Scene } from 'phaser';
import * as Phaser from 'phaser';
import {
  ASSETS_PATH,
  HEALTH_ANIMATION,
  HEALTH_BAR_ASSET_KEYS,
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
  gameOverText!: Phaser.GameObjects.Text;
  health!: number;
  hearts: Phaser.GameObjects.Sprite[] = [];

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.bitmapFont(
      'gothic',
      `${ASSETS_PATH.FONTS}gothic.png`,
      `${ASSETS_PATH.FONTS}gothic.xml`
    );

    this.load.image('star', `${ASSETS_PATH.ITEM}star.png`);
    this.load.image('mushroomRed', `${ASSETS_PATH.ITEM}mushroomred.webp`);
    this.load.image('bomb', `${ASSETS_PATH.ITEM}bomb.png`);
    this.load.image('platform', `${ASSETS_PATH.ITEM}platform.png`);
    this.load.image('background', `${ASSETS_PATH.BACKGROUNDS}bg.jpg`);
    this.load.image('leftArrow', `${ASSETS_PATH.ITEM}leftarrow.png`);
    this.load.image('rightArrow', `${ASSETS_PATH.ITEM}rightarrow.png`);
    this.load.image(
      HEALTH_BAR_ASSET_KEYS.HEALTH_BACKGROUND,
      `${ASSETS_PATH.UI}custom-ui.png`
    );
    this.load.spritesheet('heart', `${ASSETS_PATH.SPRITES}heart.png`, {
      frameWidth: 7,
      frameHeight: 7,
    });
    this.load.spritesheet('player', `${ASSETS_PATH.SPRITES}player.png`, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  initValues() {
    this.screenWidth = this.scale.width;
    this.screenHeight = this.scale.height;
    this.screenCenterX = this.screenWidth / 2;
    this.controlsAreaHeight = this.screenHeight * 0.2;
    this.gameAreaHeight = this.screenHeight - this.controlsAreaHeight;

    this.background = this.physics.add.image(0, 0, 'background');
    this.background.displayHeight = this.scale.height;
    this.background.scaleX = this.background.scaleY;

    this.background.y = this.scale.height / 2;
    this.background.x = this.scale.width / 2;

    this.background.x = this.background.displayHeight * 0.5;

    // Criando o container e adicionando elementos
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
      .staticImage(0, this.gameAreaHeight, 'platform')
      .setOrigin(0, 0)
      .refreshBody();

    this.player = this.physics.add.sprite(
      this.screenCenterX,
      this.gameAreaHeight - 24,
      'player'
    );

    this.leftArrow = this.add
      .image(this.screenWidth * 0.1, this.gameAreaHeight, 'leftArrow')
      .setOrigin(0, 0)
      .setInteractive()
      .setDepth(2);
    this.rightArrow = this.add
      .image(this.screenWidth * 0.7, this.gameAreaHeight, 'rightArrow')
      .setOrigin(0, 0)
      .setInteractive()
      .setDepth(2);
  }

  addHealthAnimation() {
    this.anims.create({
      key: HEALTH_ANIMATION.LOSE_FIRST_HALF,
      frames: this.anims.generateFrameNames('heart', { start: 0, end: 2 }),
      frameRate: 10,
    });

    this.anims.create({
      key: HEALTH_ANIMATION.LOSE_SECOND_HALF,
      frames: this.anims.generateFrameNames('heart', { start: 2, end: 4 }),
      frameRate: 10,
    });
  }

  addPlayerAnimation() {
    // adds animations for player
    if (!this.anims.exists('left')) {
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      });
    }

    if (!this.anims.exists('turn')) {
      this.anims.create({
        key: 'turn',
        frames: [{ key: 'player', frame: 4 }],
      });
    }

    if (!this.anims.exists('right')) {
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
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
      .setTint(0x00000)
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
        const bomb = object1.key === 'player' ? object1 : object2;
        bomb.destroy();

        if (this.health !== 0) {
          this.handleHearts();
          return;
        }

        this.time.removeAllEvents();
        this.physics.pause();
        this.gameOverText = this.add
          .text(this.screenCenterX, this.screenHeight / 2, 'Game Over', {
            fontSize: '32px',
            color: 'red',
          })
          .setOrigin(0.5, 0.5);

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
    // this.addScore();

    this.addPlayerMoves();

    this.addStars();
    this.addMushroomRed();
    this.addBooms();

    // Adds colliders between stars and bombs with platform
    this.physics.add.collider(
      this.stars,
      this.platform,
      (object1: any, object2: any) => {
        const star = object1.texture.key === 'star' ? object1 : object2;
        star.destroy();
      }
    );

    this.physics.add.collider(
      this.mushroomRed,
      this.platform,
      (object1: any, object2: any) => {
        const mushroomRed =
          object1.texture.key === 'mushroomRed' ? object1 : object2;
        mushroomRed.destroy();
      }
    );

    this.physics.add.collider(
      this.bombs,
      this.platform,
      (object1: any, object2: any) => {
        const bomb = object1.key === 'bomb' ? object1 : object2;
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

      this.player.anims.play('left', true);
    } else if (this.moveRight && !this.moveLeft) {
      this.player.setVelocityX(200);

      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }
  }
}
