import { HEALTH_ANIMATION, HEALTH_BAR_ASSET_KEYS } from 'src/app/constants';

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

  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
    this.init();
    this.initHeartsBar();
    this.heartsAnimation();
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
        this.scaleBar(100, 30),
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
          start: 4,
          end: 2,
        }
      ),
      frameRate: 10,
    });

    this.#scene.anims.create({
      key: HEALTH_ANIMATION.WIN_SECOND_HALF,
      frames: this.#scene.anims.generateFrameNames(
        HEALTH_BAR_ASSET_KEYS.HEART,
        {
          start: 2,
          end: 1,
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
   * Function to add scale bar
   *
   * @private
   * @param {number} x position of the text
   * @param {number} y position of the text
   * @return {*}
   */
  private scaleBar(x: number, y: number) {
    const scaleY = 0.7;
    const leftCapShadow = this.#scene.add
      .image(x, y, HEALTH_BAR_ASSET_KEYS.LEFT_CAP_SHADOW)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);
    const leftCap = this.#scene.add
      .image(x, y, HEALTH_BAR_ASSET_KEYS.LEFT_CAP)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);
    const middleCapShadow = this.#scene.add
      .image(
        leftCapShadow.x + leftCapShadow.width,
        y,
        HEALTH_BAR_ASSET_KEYS.MIDDLE_CAP_SHADOW
      )
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);
    middleCapShadow.displayWidth = 150;

    const middleCap = this.#scene.add
      .image(leftCap.x + leftCap.width, y, HEALTH_BAR_ASSET_KEYS.MIDDLE_CAP)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);
    middleCap.displayWidth = 0;

    const rightCapShadow = this.#scene.add
      .image(
        middleCapShadow.x + middleCapShadow.displayWidth,
        y,
        HEALTH_BAR_ASSET_KEYS.RIGHT_CAP_SHADOW
      )
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);

    const rightCap = this.#scene.add
      .image(
        middleCap.x + middleCap.displayWidth,
        y,
        HEALTH_BAR_ASSET_KEYS.RIGHT_CAP
      )
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);

    return this.#scene.add
      .container(x, y, [
        leftCapShadow,
        leftCap,
        middleCapShadow,
        middleCap,
        rightCapShadow,
        rightCap,
      ])
      .setDepth(2);
  }

  /**
   * Function to handle hearts animation
   */
  handleLoseHearts() {
    const heartIndex = Math.round(this.health / 2) - 1;
    const isHalfHeart = this.health % 2 === 1;
    if (isHalfHeart) {
      this.#hearts[heartIndex].play(HEALTH_ANIMATION.LOSE_SECOND_HALF);
    } else {
      this.#hearts[heartIndex].play(HEALTH_ANIMATION.LOSE_FIRST_HALF);
    }
    this.health -= 1;
  }

  handleWinHearts() {
    const heartIndex = Math.round(this.health / 2) - 1;
    const isHalfHeart = this.health % 2 === 1;
    if (isHalfHeart) {
      this.#hearts[heartIndex].play(HEALTH_ANIMATION.WIN_SECOND_HALF);
      console.log(`MSA 🔊 this.#hearts[heartIndex]:`, this.#hearts[heartIndex]);
    } else {
      this.#hearts[heartIndex].play(HEALTH_ANIMATION.WIN_FIRST_HALF);
    }
    this.health += 1;
  }

  /**
   * Function to update the score value
   * @param {number} score score value
   */
  updateScoreValue(score: number) {
    this.#score += score;
    this.#scoreValueText.setText(`${this.#score}`);
  }

  /**
   * Function to update the level value
   */
  updateLevelValue(reset: boolean = false) {
    if (this.health < 6) {
      this.handleWinHearts();
    }

    this.#levelValueText.setText(
      `${reset ? (this.#level = 0) : (this.#level += 1)}`
    );
  }
}
