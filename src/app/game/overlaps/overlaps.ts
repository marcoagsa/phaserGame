import { FONT_ASSET_KEYS, MONKEY_ASSET_KEYS } from 'src/app/constants';
import { Background, DropItems, HealthBar, Monkey } from 'src/app/game/ui';
import { UtilsService } from 'src/app/services';

export class Overlaps {
  #scene: Phaser.Scene;
  #background!: Background;
  #monkey: Monkey;
  #healthBar!: HealthBar;
  #dropItems: DropItems;
  gameOverText!: Phaser.GameObjects.BitmapText;
  #utils: UtilsService;

  constructor(
    scene: Phaser.Scene,
    background: Background,
    monkey: Monkey,
    healthBar: HealthBar,
    dropItems: DropItems,
    utils: UtilsService
  ) {
    this.#scene = scene;
    this.#background = background;
    this.#monkey = monkey;
    this.#healthBar = healthBar;
    this.#dropItems = dropItems;
    this.#utils = utils;
  }

  initOverlaps() {
    this.playerAndMushroomRed();
    this.playerAndStars();
    this.playerAndBooms();
    this.playerAndExtraLife();
  }

  playerAndStars() {
    // Adds overlap between player and stars
    this.#scene.physics.add.overlap(
      this.#monkey.monkey,
      this.#dropItems.star,
      (object1: any, object2: any) => {
        const star = object1.key === 'player' ? object1 : object2;
        star.destroy();
        this.#healthBar.updateScoreValue(50);
        this.updateLevel();
      },
      undefined,
      this
    );
  }

  playerAndMushroomRed() {
    // Adds overlap between player and stars
    this.#scene.physics.add.overlap(
      this.#monkey.monkey,
      this.#dropItems.mushroomRed,
      (object1: any, object2: any) => {
        const mushroomRed = object1.key === 'player' ? object1 : object2;
        mushroomRed.destroy();
        this.#healthBar.updateScoreValue(10);
        this.#monkey.increaseMonkeyScale(0.1);
        this.updateLevel();
      },
      undefined,
      this
    );
  }

  updateLevel() {
    this.#healthBar.handledScaleMeter({
      duration: 1500,
      callback: (res: any) => {
        const roundedScale = Math.round(res * 10) / 10;
        if (roundedScale >= 148 && roundedScale <= 153) {
          this.#monkey.reset();
          this.#healthBar.updateLevelValue();
          this.#background.updateBackground();
          this.#healthBar.resetScaleMeter();
        }
      },
    });
  }

  playerAndBooms() {
    // Adds overlap between player and bombs
    this.#scene.physics.add.overlap(
      this.#monkey.monkey,
      this.#dropItems.bombs,
      (object1: any, object2: any) => {
        const bomb =
          object1.key === MONKEY_ASSET_KEYS.MONKEY ? object1 : object2;
        bomb.destroy();

        this.#scene.sound.play('bomb', { volume: 1 });

        if (this.#healthBar.health !== 0) {
          this.#healthBar.handleLoseHearts();
          this.#monkey.reduceMonkeyScale(0.1);
          this.updateLevel();
          return;
        }

        this.gameOver();
      },
      undefined,
      this
    );
  }

  playerAndExtraLife() {
    // Adds overlap between player and bombs
    this.#scene.physics.add.overlap(
      this.#monkey.monkey,
      this.#dropItems.extraLife,
      (object1: any, object2: any) => {
        const extraLife = object1.key === 'heart' ? object1 : object2;
        extraLife.destroy();
        if (this.#healthBar.health !== 6) {
          this.#healthBar.handleWinHearts();
        }
      },
      undefined,
      this
    );
  }

  async gameOver() {
    this.#scene.sound.stopAll();
    this.#scene.sound.play('gameover', { volume: 1 });
    this.#scene.time.removeAllEvents();
    this.#scene.physics.pause();

    this.gameOverText = this.#scene.add
      .bitmapText(
        50,
        this.#scene.scale.height / 2,
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

    const { data } = await this.#utils.getUserName();

    if (data) {
      this.#utils.saveScore({
        name: data?.values?.playerName,
        level: this.#healthBar.level,
        points: this.#healthBar.score,
        scale: this.#monkey.monkey.scale,
      });

      (window as any).gameOver?.();
    }
  }
}
