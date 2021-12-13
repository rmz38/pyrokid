import * as Phaser from 'phaser';

export const initAnims = (game: Phaser.Scene): void => {
  game.anims.create({
    key: 'squareFire',
    frames: game.anims.generateFrameNumbers('squareFire', { start: 0, end: 5 }),
    frameRate: 30,
    repeat: -1,
  });

  game.anims.create({
    key: 'fireball',
    frames: game.anims.generateFrameNumbers('fireball', { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1,
  });

  game.anims.create({
    key: 'fireDisappear',
    frames: game.anims.generateFrameNumbers('fireDisappear', { start: 0, end: 39 }),
    frameRate: 60,
  });

  game.anims.create({
    key: 'lizard',
    frames: game.anims.generateFrameNumbers('lizard', { start: 0, end: 29 }),
    frameRate: 30,
    repeat: -1,
  });

  game.anims.create({
    key: 'left',
    frames: game.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  game.anims.create({
    key: 'turn',
    frames: [{ key: 'player', frame: 4 }],
    frameRate: 20,
  });

  game.anims.create({
    key: 'right',
    frames: game.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  game.anims.create({
    key: 'spider',
    frames: game.anims.generateFrameNumbers('spider', { start: 0, end: 9 }),
    frameRate: 10,
    repeat: -1,
  });
  game.anims.create({
    key: 'spiderArmored',
    frames: game.anims.generateFrameNumbers('spiderArmored', { start: 0, end: 9 }),
    frameRate: 10,
    repeat: -1,
  });
};
