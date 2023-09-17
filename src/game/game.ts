import { Game, AUTO, Scale, Scene } from 'phaser';

export function launch() {
  return new Game({
    type: AUTO,
    scale: {
      mode: Scale.RESIZE,
      width: window.innerWidth * window.devicePixelRatio,
      autoCenter: Scale.CENTER_BOTH,
      height: window.innerHeight * window.devicePixelRatio,
    },
    parent: 'game',
    backgroundColor: '#201726',
    physics: {
      default: 'arcade',
    },
    scene: MainScene,
  });
}

export class MainScene extends Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.add.text(100, 100, 'Star Game...', {
      font: '24px Courier',
      color: '#eb445a',
      lineSpacing: 0.3,
      fontFamily: 'Sams',
      fontStyle: 'bold',
    });
  }
}
