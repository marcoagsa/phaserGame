import { OBJECTS_ASSET_KEYS } from 'src/app/constants';
import { Background, DropItems, Monkey } from 'src/app/game/ui';

export class Colliders {
  #scene: Phaser.Scene;
  #monkey: Monkey;
  #background: Background;
  #dropItems: DropItems;

  constructor(
    scene: Phaser.Scene,
    background: Background,
    monkey: Monkey,
    dropItems: DropItems
  ) {
    this.#scene = scene;
    this.#background = background;
    this.#monkey = monkey;
    this.#dropItems = dropItems;
  }

  initColliders() {
    this.platform();
    this.stars();
    this.mushRoom();
    this.bombs();
    this.rareItem();
  }

  platform() {
    this.#scene.physics.add.collider(
      this.#monkey.monkey,
      this.#background.platform
    );
  }

  stars() {
    this.#scene.physics.add.collider(
      this.#dropItems.stars,
      this.#background.platform,
      (object1: any, object2: any) => {
        const star =
          object1.texture.key === OBJECTS_ASSET_KEYS.STAR ? object1 : object2;
        star.destroy();
      }
    );
  }

  mushRoom() {
    this.#scene.physics.add.collider(
      this.#dropItems.mushroomRed,
      this.#background.platform,
      (object1: any, object2: any) => {
        const mushroomRed =
          object1.texture.key === OBJECTS_ASSET_KEYS.MUSHROOM_RED
            ? object1
            : object2;
        mushroomRed.destroy();
      }
    );
  }

  bombs() {
    this.#scene.physics.add.collider(
      this.#dropItems.bombs,
      this.#background.platform,
      (object1: any, object2: any) => {
        const bomb =
          object1.key === OBJECTS_ASSET_KEYS.BOMB ? object1 : object2;
        bomb.destroy();
      }
    );
  }

  rareItem() {
    this.#scene.physics.add.collider(
      this.#dropItems.rareItem,
      this.#background.platform,
      (object1: any, object2: any) => {
        const rareItem =
          object1.key === OBJECTS_ASSET_KEYS.RARE_ITEM ? object1 : object2;
        rareItem.destroy();
      }
    );
  }
}
