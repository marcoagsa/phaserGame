import { HEALTH_ANIMATION, HEALTH_BAR_ASSET_KEYS } from 'src/app/constants';

export class HealthBar {
  #scene: Phaser.Scene;
  health!: number;
  heart!: Phaser.GameObjects.Sprite;
  hearts: Phaser.GameObjects.Sprite[] = [];
  score!: number;
  scoreText!: Phaser.GameObjects.BitmapText;

  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
    this.initHealthBar();
  }

  initHealthBar() {
    const healthBackground = this.#scene.add
      .image(0, 0, HEALTH_BAR_ASSET_KEYS.HEALTH_BACKGROUND)
      .setOrigin(0)
      .setScale(0.8, 0.6);

    const heartsContainer = this.addHealthBar();

    const container = this.#scene.add
      .container(10, 80, [healthBackground, this.addScore()])
      .setDepth(2);
    heartsContainer.forEach((sprite) => {
      container.add(sprite);
    });
  }

  addHealthBar() {
    this.health = 6;
    const numberOfHearts = Math.round(this.health / 2);

    for (let index = 0; index < numberOfHearts; index++) {
      this.heart = this.#scene.add
        .sprite(30 + index * 30, 20, 'heart', 0)
        .setOrigin(0)
        .setScale(3)
        .setDepth(1);
      this.hearts.push(this.heart);
    }

    return this.hearts;
  }

  addScore() {
    this.score = 0;

    this.scoreText = this.#scene.add
      .bitmapText(30, 45, 'gothic', `Score: ${this.score}`, 20)
      .setOrigin(0)
      .setCenterAlign()
      .setLetterSpacing(10)
      .setLineSpacing(20)
      .setTint(0xffffff)
      .setDepth(1);

    return this.scoreText;
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
}
