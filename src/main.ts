import * as Phaser from 'phaser';
import Scenes from './scenes';


const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Sample',

  type: Phaser.WEBGL,
  canvas: document.querySelector('#canvas'),
  antialias: true,
  pixelArt: false,
  scale: {
    width: 800,
    height: 600,
  },
  plugins: {
    scene: [
        { key: 'PhaserPlanck', plugin: PhaserPlanck, mapping: 'planck' }
    ]
  },
  scene: Scenes,

  physics: {
    //@ts-ignore
    planck: {
      debug: false,
      scaleFactor: 30,
      gravity: {
          x: 0,
          y: 3
      }
  }

  },

  parent: 'game',
  backgroundColor: '#000000',
};

export const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', () => {
  game.scale.refresh();
});
