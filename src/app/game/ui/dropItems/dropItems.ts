export class DropItems {
  #scene: Phaser.Scene;
  #mushroomRedDelay = Math.floor(Math.random() * (1300 - 1000 + 1)) + 1000;
  #starsDelay = Math.floor(Math.random() * (5000 - 4500 + 1)) + 4500;
  #bombCalc = 4500 - Math.floor(Math.random()) * 100;
  #bombsDelay = Math.floor(Math.random() * (5000 - 4500 + 1)) + this.#bombCalc;

  mushroomRed!: Phaser.Physics.Arcade.Group;
  mushroomGreen!: Phaser.Physics.Arcade.Group;
  mushroomBlue!: Phaser.Physics.Arcade.Group;
  stars!: Phaser.Physics.Arcade.Group;
  bombs!: Phaser.Physics.Arcade.Group;

  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
  }

  createDropItems() {
    this.addMushroomRed();
    this.addStar();
    this.addBoom();
  }

  /**
   * Function to create red mushroom
   * @private
   */
  private createMushroomRed() {
    const x = Math.random() * this.#scene.scale.width;
    this.mushroomRed.create(x, 0, 'mushroomRed').setScale(0.1);
  }

  /**
   * Function to add red mushroom on
   * the scene
   * @private
   */
  private addMushroomRed() {
    this.mushroomRed = this.#scene.physics.add.group({
      gravityY: 200,
    });

    this.createLoop(this.#mushroomRedDelay, this.createMushroomRed);
  }

  /**
   * Function to create star
   * @private
   */
  private createStar() {
    const x = Math.random() * this.#scene.scale.width;
    this.stars.create(x, 0, 'star');
  }

  /**
   * Function to add star on
   * the scene
   * @private
   */
  private addStar() {
    this.stars = this.#scene.physics.add.group({
      gravityY: 300,
    });
    this.createLoop(this.#starsDelay, this.createStar);
  }

  /**
   * Function to create bomb
   * @private
   */
  private createBomb() {
    const x = Math.random() * this.#scene.scale.width;
    this.bombs.create(x, 0, 'bomb').setScale(2).refreshBody();
  }

  /**
   * Function to add bomb on
   * the scene
   * @private
   */
  private addBoom() {
    this.bombs = this.#scene.physics.add.group({
      gravityY: 900,
    });

    this.createLoop(this.#bombsDelay, this.createBomb);
  }

  /**
   * Function to create loops of
   * scene item
   * @private
   * @param {number} delay
   * @param {*} item
   */
  private createLoop(delay: number, item: any) {
    this.#scene.time.addEvent({
      delay: delay,
      callback: item,
      callbackScope: this,
      loop: true,
    });
  }
}
