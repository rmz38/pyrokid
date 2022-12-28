import * as Phaser from 'phaser';
import Scenes from './scenes';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Pyrokid',

  type: Phaser.AUTO,

  scale: {
    width: 800,
    height: 600,
  },

  scene: Scenes,

  physics: {
    default: 'matter',
    matter: {
      enableSleeping: false,
      debug: false,
      gravity: { y: 1.0 },
    },
  },
  //TODO: CHANGE FRAMERATE TO SOMETHING LOWER PROBABLY?
  //fix framerate to be consistent on all monitors to avoid weird speed issues
  fps: {
    target: 60,
    forceSetTimeOut: true,
  },
  // plugins: {
  //   global: [
  //     {
  //       key: 'PhaserRaycaster',
  //       plugin: PhaserRaycaster,
  //       start: true,
  //       mapping: 'raycasterPlugin',
  //     },
  //   ],
  // },
  parent: 'game',
  backgroundColor: '#000000',
};
export const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', () => {
  game.scale.refresh();
});
