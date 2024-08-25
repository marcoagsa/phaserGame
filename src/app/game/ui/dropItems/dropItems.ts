export class DropItems {
  #scene: Phaser.Scene;
  #mushroomRedDelay = this.getRandomDelay(1000, 1300);
  #starsDelay = this.getRandomDelay(4500, 5000);
  #bombCalc = this.getRandomDelay(0, 100);
  #bombsDelay = this.getRandomDelay(4500, 5000) - this.#bombCalc;

  private extraLifeChance: number = 0.05;
  private extraLifeMinDelay: number = 10000;
  private extraLifeMaxDelay: number = 30000;

  mushroomRed!: Phaser.Physics.Arcade.Group;
  star!: Phaser.Physics.Arcade.Group;
  bombs!: Phaser.Physics.Arcade.Group;
  extraLife!: Phaser.Physics.Arcade.Group;

  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
  }

  createDropItems() {
    this.addMushroomRed();
    this.addStar();
    this.addBomb();
    this.addExtraLife();
  }

  private getRandomDelay(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private createMushroomRed() {
    const textureKey = 'mushroomRed';
    const textureWidth = this.#scene.textures
      .get(textureKey)
      .getSourceImage().width;
    const x = Phaser.Math.Between(
      0,
      this.#scene.scale.width - textureWidth * 0.1
    );
    this.mushroomRed.create(x, 0, textureKey).setScale(0.1).refreshBody();
  }

  private addMushroomRed() {
    this.mushroomRed = this.#scene.physics.add.group({
      gravityY: 200,
    });
    this.createLoop(this.#mushroomRedDelay, () => this.createMushroomRed());
  }

  private createStar() {
    const textureKey = 'star';
    const textureWidth = this.#scene.textures
      .get(textureKey)
      .getSourceImage().width;
    const x = Phaser.Math.Between(
      0,
      this.#scene.scale.width - textureWidth * 1.7
    );
    const star = this.star.create(x, 0, textureKey).setScale(1.7).refreshBody();
    this.blinkImage(star, 1.1);
  }

  private addStar() {
    this.star = this.#scene.physics.add.group({
      gravityY: 300,
    });
    this.createLoop(this.#starsDelay, () => this.createStar());
  }

  private createBomb() {
    const textureKey = 'bomb';
    const textureWidth = this.#scene.textures
      .get(textureKey)
      .getSourceImage().width;
    const x = Phaser.Math.Between(
      0,
      this.#scene.scale.width - textureWidth * 0.4
    );
    this.bombs
      .create(x, 0, textureKey)
      .setOrigin(0)
      .setScale(0.4)
      .refreshBody();
  }

  private addBomb() {
    this.bombs = this.#scene.physics.add.group({
      gravityY: 900,
    });
    this.createLoop(this.#bombsDelay, () => this.createBomb());
  }

  private createExtraLife() {
    const textureKey = 'heart';
    const textureWidth = this.#scene.textures
      .get(textureKey)
      .getSourceImage().width;
    const x = Phaser.Math.Between(
      0,
      this.#scene.scale.width - textureWidth * 5
    );
    const extraLife = this.extraLife
      .create(x, 0, textureKey)
      .setOrigin(0)
      .setScale(5)
      .refreshBody();

    this.blinkImage(extraLife, 4);
  }

  private addExtraLife() {
    this.extraLife = this.#scene.physics.add.group({
      gravityY: 200,
    });

    this.createExtraLifeLoop();
  }

  private createExtraLifeLoop() {
    const delay = Phaser.Math.Between(
      this.extraLifeMinDelay,
      this.extraLifeMaxDelay
    );

    this.#scene.time.addEvent({
      delay: delay,
      callback: () => {
        if (Math.random() < this.extraLifeChance) {
          this.createExtraLife();
        }
        this.createExtraLifeLoop();
      },
      callbackScope: this,
      loop: false,
    });
  }

  private createLoop(delay: number, createItemFn: () => void) {
    this.#scene.time.addEvent({
      delay: delay,
      callback: createItemFn,
      callbackScope: this,
      loop: true,
    });
  }

  /**
   * Function to add blink animation
   * to the image
   *
   * @param {Phaser.Physics.Arcade.Group} image
   * @param {number} [scale]
   */
  blinkImage(image: Phaser.Physics.Arcade.Group, scale?: number) {
    this.#scene.tweens.add({
      targets: image,
      ...(scale && { scaleX: scale }),
      ...(scale && { scaleY: scale }),
      alpha: 0.6,
      yoyo: true,
      repeat: -1,
      duration: 300,
      ease: 'Sine.easeInOut',
    });
  }
}
