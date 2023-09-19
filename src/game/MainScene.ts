import { Scene } from 'phaser';
import { PhaserSingletonService } from 'src/app/services/phaser-single.module';

export class MainScene extends Scene {
  screenWidth!: number;
  screenHeight!: number;
  screenCenterX!: number;
  controlsAreaHeight!: number;
  gameAreaHeight!: number;
  platform!: Phaser.Types.Physics.Arcade.ImageWithStaticBody;
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  leftArrow!: Phaser.GameObjects.Image;
  rightArrow!: Phaser.GameObjects.Image;
  moveLeft!: boolean;
  moveRight!: boolean;
  stars!: Phaser.Physics.Arcade.Group;
  bombs!: Phaser.Physics.Arcade.Group;
  score!: number;
  scoreText!: Phaser.GameObjects.Text;
  gameOverText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('leftArrow', 'assets/leftarrow.png');
    this.load.image('rightArrow', 'assets/rightarrow.png');
    this.load.spritesheet('player', 'assets/player.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.screenWidth = this.scale.width;
    this.screenHeight = this.scale.height;
    this.screenCenterX = this.screenWidth / 2;
    this.controlsAreaHeight = this.screenHeight * 0.2;
    this.gameAreaHeight = this.screenHeight - this.controlsAreaHeight;

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
      .image(this.screenWidth * 0.1, this.gameAreaHeight + 40, 'leftArrow')
      .setOrigin(0, 0)
      .setInteractive();
    this.rightArrow = this.add
      .image(this.screenWidth * 0.7, this.gameAreaHeight + 40, 'rightArrow')
      .setOrigin(0, 0)
      .setInteractive();

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

    // adds collider between player and platforms
    this.physics.add.collider(this.player, this.platform);

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

    // Adds generated stars

    this.stars = this.physics.add.group({
      gravityY: 300,
    });

    const createStar = () => {
      const x = Math.random() * this.screenWidth;
      const star = this.stars.create(x, 0, 'star');
    };

    const createStarLoop = this.time.addEvent({
      // random number between 1 and 1.2 seconds
      delay: Math.floor(Math.random() * (1200 - 1000 + 1)) + 1000,
      callback: createStar,
      callbackScope: this,
      loop: true,
    });

    // Adds generated bombs

    this.bombs = this.physics.add.group({
      gravityY: 900,
    });

    const createBomb = () => {
      const x = Math.random() * this.screenWidth;
      const bomb = this.bombs.create(x, 0, 'bomb');
      bomb.setScale(2).refreshBody();
    };

    const createBombLoop = this.time.addEvent({
      // random number between 4.5 and 5 seconds
      delay: Math.floor(Math.random() * (5000 - 4500 + 1)) + 4500,
      callback: createBomb,
      callbackScope: this,
      loop: true,
    });

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
      this.bombs,
      this.platform,
      (object1: any, object2: any) => {
        const bomb = object1.key === 'bomb' ? object1 : object2;
        bomb.destroy();
      }
    );

    // Adds overlap between player and stars
    this.score = 0;
    this.scoreText = this.add
      .text(this.screenCenterX, this.gameAreaHeight + 16, 'Score: 0', {
        fontSize: '16px',
        color: '#000',
      })
      .setOrigin(0.5, 0.5);

    this.physics.add.overlap(
      this.player,
      this.stars,
      (object1: any, object2: any) => {
        const star = object1.key === 'player' ? object1 : object2;
        star.destroy();
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
      },
      undefined,
      this
    );

    // Adds overlap between player and bombs
    this.physics.add.overlap(
      this.player,
      this.bombs,
      (object1: any, object2: any) => {
        const bomb = object1.key === 'player' ? object1 : object2;
        bomb.destroy();
        createStarLoop.destroy();
        createBombLoop.destroy();
        this.physics.pause();

        this.gameOverText = this.add
          .text(this.screenCenterX, this.screenHeight / 2, 'Game Over', {
            fontSize: '32px',
            color: 'red',
          })
          .setOrigin(0.5, 0.5);

        this.input.on('pointerup', () => {
          this.score = 0;
          PhaserSingletonService.destroyActiveGame();
        });
      },
      undefined,
      this
    );
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
