import { HEALTH_ANIMATION, HEALTH_BAR_ASSET_KEYS } from 'src/app/constants';

interface Meter {
  duration?: number;
  callback?: any | undefined;
}

export class HealthBar {
  health!: number;
  #scene: Phaser.Scene;
  #score: number = 0;
  #level: number = 1;
  #heart!: Phaser.GameObjects.Sprite;
  #hearts: Phaser.GameObjects.Sprite[] = [];
  #scoreText!: Phaser.GameObjects.BitmapText;
  #levelText!: Phaser.GameObjects.BitmapText;
  #scoreValueText!: Phaser.GameObjects.BitmapText;
  #levelValueText!: Phaser.GameObjects.BitmapText;
  #healthBarContainer!: Phaser.GameObjects.Container;
  #scoreContainer!: Phaser.GameObjects.Container;
  #scaleContainer!: Phaser.GameObjects.Container;
  #fullWidth: number;
  #scaleY: number;
  #leftCap!: Phaser.GameObjects.Image;
  #middleCap!: Phaser.GameObjects.Image;
  #rightCap!: Phaser.GameObjects.Image;
  #leftCapShadow!: Phaser.GameObjects.Image;
  #middleCapShadow!: Phaser.GameObjects.Image;
  #rightCapShadow!: Phaser.GameObjects.Image;
  meter: number = 0;

  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
    this.#fullWidth = 150;
    this.#scaleY = 0.7;
    this.init();
    this.initHeartsBar();
    this.heartsAnimation();
    this.initScaleMeterPercentage();
  }

  /**
   * Function to init health bar
   * @private
   */
  private init() {
    this.#scoreValueText = this.addText(110, 52, '0', 0x201726);
    this.#levelValueText = this.addText(280, 17, '1', 0x201726);
    this.#scoreText = this.addText(30, 50, 'Score:');
    this.#levelText = this.addText(200, 15, 'Level:');

    this.#scoreContainer = this.createContainer(0, 0, [
      this.#scoreValueText,
      this.#scoreText,
    ]);

    this.#scaleContainer = this.createContainer(0, 0, [
      this.#levelValueText,
      this.#levelText,
    ]);

    this.#healthBarContainer = this.#scene.add
      .container(10, 80, [
        this.#scene.add
          .image(0, 0, HEALTH_BAR_ASSET_KEYS.HEALTH_BACKGROUND)
          .setOrigin(0)
          .setScale(0.8, 0.7),
        this.#scoreContainer,
        this.#scaleContainer,
        this.scaleMeterShadow(100, 30),
        this.scaleMeter(100, 30),
      ])
      .setDepth(2);
  }

  /**
   * Function to init hearts bar
   * @private
   */
  private initHeartsBar() {
    for (const sprite of this.createHearts()) {
      this.#healthBarContainer.add(sprite);
    }
  }

  /**
   * Function to create a Phaser sprite array of hearts
   * @private
   * @return {*}  {Phaser.GameObjects.Sprite[]}
   */
  private createHearts(): Phaser.GameObjects.Sprite[] {
    this.health = 6;
    const numberOfHearts = Math.round(this.health / 2);

    for (let index = 0; index < numberOfHearts; index++) {
      this.#heart = this.#scene.add
        .sprite(30 + index * 30, 20, 'heart', 0)
        .setOrigin(0)
        .setScale(3)
        .setDepth(1);
      this.#hearts.push(this.#heart);
    }

    return this.#hearts;
  }

  /**
   * Function to add hearts animation
   * @private
   */
  private heartsAnimation() {
    this.#scene.anims.create({
      key: HEALTH_ANIMATION.LOSE_FIRST_HALF,
      frames: this.#scene.anims.generateFrameNames(
        HEALTH_BAR_ASSET_KEYS.HEART,
        {
          start: 0,
          end: 2,
        }
      ),
      frameRate: 10,
    });

    this.#scene.anims.create({
      key: HEALTH_ANIMATION.LOSE_SECOND_HALF,
      frames: this.#scene.anims.generateFrameNames(
        HEALTH_BAR_ASSET_KEYS.HEART,
        {
          start: 2,
          end: 4,
        }
      ),
      frameRate: 10,
    });

    this.#scene.anims.create({
      key: HEALTH_ANIMATION.WIN_FIRST_HALF,
      frames: this.#scene.anims.generateFrameNames(
        HEALTH_BAR_ASSET_KEYS.HEART,
        {
          start: 2,
          end: 0,
        }
      ),
      frameRate: 10,
    });

    this.#scene.anims.create({
      key: HEALTH_ANIMATION.WIN_SECOND_HALF,
      frames: this.#scene.anims.generateFrameNames(
        HEALTH_BAR_ASSET_KEYS.HEART,

        {
          start: 4,
          end: 2,
        }
      ),
      frameRate: 10,
    });
  }

  /**
   * Function to add Phaser BitmapText
   * @private
   * @param {number} x position of the text
   * @param {number} y position of the text
   * @param {string} text string to add
   * @param {number} [color=0xffffff]
   * @return {*}  {Phaser.GameObjects.BitmapText}
   */
  private addText(
    x: number,
    y: number,
    text: string,
    color: number = 0xffffff
  ): Phaser.GameObjects.BitmapText {
    return this.#scene.add
      .bitmapText(x, y, 'gothic', `${text}`, 20)
      .setOrigin(0)
      .setLetterSpacing(10)
      .setLineSpacing(20)
      .setTint(color)
      .setDepth(1);
  }

  /**
   * Function to create a Phaser Game Object container
   * @private
   * @param {number} x position of the text
   * @param {number} y position of the text
   * @param {Phaser.GameObjects.GameObject[]} gameObject
   * @return {*} {Phaser.GameObjects.Container}
   */
  private createContainer(
    x: number,
    y: number,
    gameObject: Phaser.GameObjects.GameObject[]
  ): Phaser.GameObjects.Container {
    return this.#scene.add.container(x, y, gameObject).setDepth(2);
  }

  /**
   * Function to add scale bar shadow
   *
   * @private
   * @param {number} x position of the text
   * @param {number} y position of the text
   * @return {*}
   */
  private scaleMeterShadow(x: number, y: number) {
    this.#leftCapShadow = this.#scene.add
      .image(x, y, HEALTH_BAR_ASSET_KEYS.LEFT_CAP_SHADOW)
      .setOrigin(0, 0.5)
      .setScale(1, this.#scaleY);

    this.#middleCapShadow = this.#scene.add
      .image(
        this.#leftCapShadow.x + this.#leftCapShadow.width,
        y,
        HEALTH_BAR_ASSET_KEYS.MIDDLE_CAP_SHADOW
      )
      .setOrigin(0, 0.5)
      .setScale(1, this.#scaleY);
    this.#middleCapShadow.displayWidth = this.#fullWidth;

    this.#rightCapShadow = this.#scene.add
      .image(
        this.#middleCapShadow.x + this.#middleCapShadow.displayWidth,
        y,
        HEALTH_BAR_ASSET_KEYS.RIGHT_CAP_SHADOW
      )
      .setOrigin(0, 0.5)
      .setScale(1, this.#scaleY);

    return this.#scene.add
      .container(x, y, [
        this.#leftCapShadow,
        this.#middleCapShadow,
        this.#rightCapShadow,
      ])
      .setDepth(2);
  }

  /**
   * Function to add scale bar
   *
   * @private
   * @param {number} x position of the text
   * @param {number} y position of the text
   * @return {*}
   */
  private scaleMeter(x: number, y: number) {
    this.#leftCap = this.#scene.add
      .image(x, y, HEALTH_BAR_ASSET_KEYS.LEFT_CAP)
      .setOrigin(0, 0.5)
      .setScale(1, this.#scaleY);

    this.#middleCap = this.#scene.add
      .image(
        this.#leftCap.x + this.#leftCap.width,
        y,
        HEALTH_BAR_ASSET_KEYS.MIDDLE_CAP
      )
      .setOrigin(0, 0.5)
      .setScale(1, this.#scaleY);

    this.#rightCap = this.#scene.add
      .image(
        this.#middleCap.x + this.#middleCap.displayWidth,
        y,
        HEALTH_BAR_ASSET_KEYS.RIGHT_CAP
      )
      .setOrigin(0, 0.5)
      .setScale(1, this.#scaleY);

    return this.#scene.add
      .container(x, y, [this.#leftCap, this.#middleCap, this.#rightCap])
      .setDepth(2);
  }

  /**
   * Function to init scale meter
   * @private
   * @param {number} [percentage=1]
   */
  private initScaleMeterPercentage() {
    const width = this.#fullWidth * this.meter;

    this.#middleCap.displayWidth = width;

    this.#rightCap.x = this.#middleCap.x + this.#middleCap.displayWidth;
  }

  /**
   * Function to update scale meter
   *
   * @param {number} percentage
   * @param {*} options
   */
  public handledScaleMeter(options: Meter) {
    this.meter += 0.02;
    const width = this.#fullWidth * this.meter;

    this.#scene.tweens.add({
      targets: this.#middleCap,
      displayWidth: width,
      duration: options?.duration || 1000,
      ease: Phaser.Math.Easing.Sine.Out,
      onUpdate: () => {
        this.#rightCap.x = this.#middleCap.x + this.#middleCap.displayWidth;
      },
      onComplete: options?.callback(this.#middleCap.displayWidth),
    });
  }

  public resetScaleMeter() {
    this.meter = 0;
    const width = this.#fullWidth * this.meter;

    this.#scene.tweens.add({
      targets: this.#middleCap,
      displayWidth: width,
      duration: 0,
      ease: Phaser.Math.Easing.Sine.Out,
      onUpdate: () => {
        this.#rightCap.x = this.#middleCap.x + this.#middleCap.displayWidth;
      },
      onComplete: () =>
        this.handledScaleMeter({ duration: 1500, callback: () => {} }),
    });
  }

  /**
   * Function to handle hearts animation
   */
  public handleLoseHearts() {
    const heartIndex = Math.round(this.health / 2) - 1;
    const isHalfHeart = this.health % 2 === 1;

    if (isHalfHeart) {
      this.#hearts[heartIndex].play(HEALTH_ANIMATION.LOSE_SECOND_HALF);
    } else {
      this.#hearts[heartIndex].play(HEALTH_ANIMATION.LOSE_FIRST_HALF);
    }
    this.health -= 1;
  }

  public handleWinHearts() {
    this.health += 1;
    const heartIndex = Math.round(this.health / 2) - 1;
    const isHalfHeart = this.health % 2 === 1;

    if (isHalfHeart) {
      this.#hearts[heartIndex].play(HEALTH_ANIMATION.WIN_SECOND_HALF);
    } else {
      this.#hearts[heartIndex].play(HEALTH_ANIMATION.WIN_FIRST_HALF);
    }
    this.#scene.sound.play('winheart', { volume: 1 });
  }

  /**
   * Function to update the score value
   * @param {number} score score value
   */
  public updateScoreValue(score: number) {
    this.playSound(score);
    this.#score += score;
    this.#scoreValueText.setText(`${this.#score}`);
  }

  /**
   * Function to update the level value
   */
  public updateLevelValue(reset: boolean = false) {
    if (this.health < 6) {
      this.handleWinHearts();
    }

    this.#levelValueText.setText(
      `${reset ? (this.#level = 0) : (this.#level += 1)}`
    );
  }

  playSound(score: number) {
    this.#scene.sound.play(score === 10 ? 'mushroomred' : 'star', {
      volume: 1,
    });
  }
}
