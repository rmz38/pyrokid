import * as Phaser from 'phaser';
import { indexes } from '../helpers/clump';
import { GameScene } from '../scenes/game-scene';

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

export const jointBlocks = (game: GameScene, blocks, data): void => {
  const track = new Set();
  const items = [];
  data.steel.forEach((e) => items.push(e));
  data.crate.forEach((e) => items.push(e));
  items.forEach((e) => {
    track.add(blocks[e.x + ',' + e.y]);
    const sprite = blocks[e.x + ',' + e.y].sprite;
    const id = indexes[e.frame];
    // odd numbers are sides
    const sides = id.split('');
    const up = blocks[e.x + ',' + (e.y - 50)];
    const right = blocks[e.x + 50 + ',' + e.y];
    const down = blocks[e.x + ',' + (e.y + 50)];
    const left = blocks[e.x - 50 + ',' + e.y];
    if (sides[1] == 1 && !track.has(up)) {
      const up = blocks[e.x + ',' + (e.y - 50)];
      game.matter.add.joint(sprite.body, up.sprite.body, 0, 1, {
        pointA: { x: 0, y: -25 },
        pointB: { x: 0, y: 25 },
        angularStiffness: 1,
      });
      track.add(up);
    }
    if (sides[3] == 1 && !track.has(right)) {
      game.matter.add.joint(sprite.body, right.sprite.body, 0, 1, {
        pointA: { x: 25, y: 0 },
        pointB: { x: -25, y: 0 },
        angularStiffness: 1,
      });
      track.add(right);
    }
    if (sides[5] == 1 && !track.has(down)) {
      game.matter.add.joint(sprite.body, down.sprite.body, 0, 1, {
        pointA: { x: 0, y: 25 },
        pointB: { x: 0, y: -25 },
        angularStiffness: 1,
      });
      track.add(down);
    }
    if (sides[7] == 1 && !track.has(left)) {
      game.matter.add.joint(sprite.body, left.sprite.body, 0, 1, {
        pointA: { x: -25, y: 0 },
        pointB: { x: 25, y: 0 },
        angularStiffness: 1,
      });
      track.add(left);
    }
  });
};
