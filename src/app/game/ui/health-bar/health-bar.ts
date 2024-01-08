import { HEALTH_ANIMATION, HEALTH_BAR_ASSET_KEYS } from 'src/app/constants';

export class HealthBar {
  health!: number;
  #scene: Phaser.Scene;
  #score: number = 0;
  #heart!: Phaser.GameObjects.Sprite;
  #hearts: Phaser.GameObjects.Sprite[] = [];
  #scoreText!: Phaser.GameObjects.BitmapText;
  #scaleText!: Phaser.GameObjects.BitmapText;
  #scoreValueText!: Phaser.GameObjects.BitmapText;
  #scaleValueText!: Phaser.GameObjects.BitmapText;

  #healthBarContainer!: Phaser.GameObjects.Container;
  #scoreContainer!: Phaser.GameObjects.Container;
  #scaleContainer!: Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
    this.#init();
    this.#initHeartsBar();
    this.#addHealthAnimation();
  }

  /**
   * handle the hearts animation
   */
  handleHearts() {
    const heartIndex = Math.round(this.health / 2) - 1;
    const isHalfHeart = this.health % 2 === 1;
    if (isHalfHeart) {
      this.#hearts[heartIndex].play(HEALTH_ANIMATION.LOSE_SECOND_HALF);
    } else {
      this.#hearts[heartIndex].play(HEALTH_ANIMATION.LOSE_FIRST_HALF);
    }
    this.health -= 1;
  }

  /**
   * update score value on the health bar
   */
  updateScoreValue(score: number) {
    this.#score += score;
    this.#scoreValueText.setText(`${this.#score}`);
  }

  /**
   * update scale value on the health bar
   */
  updateScaleValue(scale: number) {
    const scaleString = parseInt(scale.toString());
    this.#scaleValueText.setText(`${scaleString}`);
  }

  #init() {
    this.#scoreValueText = this.#addText(110, 52, '0');
    this.#scaleValueText = this.#addText(280, 17, '1');
    this.#scoreText = this.#addText(30, 50, 'Score');
    this.#scaleText = this.#addText(200, 15, 'Scale');

    this.#scoreContainer = this.#createContainer(0, 0, [
      this.#scoreValueText,
      this.#scoreText,
    ]);

    this.#scaleContainer = this.#createContainer(0, 0, [
      this.#scaleValueText,
      this.#scaleText,
    ]);

    this.#healthBarContainer = this.#scene.add
      .container(10, 80, [
        this.#scene.add
          .image(0, 0, HEALTH_BAR_ASSET_KEYS.HEALTH_BACKGROUND)
          .setOrigin(0)
          .setScale(0.8, 0.7),
        this.#scoreContainer,
        this.#scaleContainer,
      ])
      .setDepth(2);
  }

  #initHeartsBar() {
    const heartsContainer = this.#createHearts();

    heartsContainer.forEach((sprite) => {
      this.#healthBarContainer.add(sprite);
    });
  }

  #createHearts() {
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
   * Implement animation for the hearts
   */
  #addHealthAnimation() {
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
  }

  #addText(x: number, y: number, text: string): Phaser.GameObjects.BitmapText {
    return this.#scene.add
      .bitmapText(x, y, 'gothic', `${text}`, 20)
      .setOrigin(0)
      .setLetterSpacing(10)
      .setLineSpacing(20)
      .setTint(0xffffff)
      .setDepth(1);
  }

  #createContainer(
    x: number,
    y: number,
    gameObject: Phaser.GameObjects.GameObject[]
  ): Phaser.GameObjects.Container {
    return this.#scene.add.container(x, y, gameObject).setDepth(2);
  }
}
