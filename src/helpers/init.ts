import * as Phaser from 'phaser';
import { indexes } from '../helpers/clump';
import Connector from '../objects/connector';
import { GameScene } from '../scenes/game-scene';

export const initAnims = (game: Phaser.Scene): void => {
  game.anims.create({
    key: 'squareFire',
    frames: game.anims.generateFrameNumbers('squareFire', { start: 0, end: 4 }),
    frameRate: 60,
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
    frameRate: 60,
    repeat: -1,
  });

  game.anims.create({
    key: 'left',
    frames: game.anims.generateFrameNumbers('player', { start: 0, end: 6 }),
    frameRate: 10,
    repeat: -1,
  });

  game.anims.create({
    key: 'turnLeft',
    frames: [{ key: 'player', frame: 6 }],
  });

  game.anims.create({
    key: 'shootLeft',
    frames: game.anims.generateFrameNumbers('shoot', { start: 0, end: 4 }),
    frameRate: 10,
  });

  game.anims.create({
    key: 'shootRight',
    frames: game.anims.generateFrameNumbers('shoot', { start: 6, end: 9 }),
    frameRate: 10,
  });

  game.anims.create({
    key: 'jumpLeft',
    frames: [{ key: 'jump', frame: 4 }],
    frameRate: 30,
  });

  game.anims.create({
    key: 'jumpRight',
    frames: [{ key: 'jump', frame: 5 }],
    frameRate: 30,
  });

  game.anims.create({
    key: 'fallLeft',
    frames: game.anims.generateFrameNumbers('jump', { start: 3, end: 0 }),
    frameRate: 30,
  });

  game.anims.create({
    key: 'fallRight',
    frames: game.anims.generateFrameNumbers('jump', { start: 4, end: 7 }),
    frameRate: 30,
  });

  game.anims.create({
    key: 'turnRight',
    frames: [{ key: 'player', frame: 7 }],
  });

  game.anims.create({
    key: 'right',
    frames: game.anims.generateFrameNumbers('player', { start: 7, end: 12 }),
    frameRate: 10,
    repeat: -1,
  });

  game.anims.create({
    key: 'spider',
    frames: game.anims.generateFrameNumbers('spider', { start: 0, end: 5 }),
    frameRate: 20,
    repeat: -1,
  });
  game.anims.create({
    key: 'spiderArmored',
    frames: game.anims.generateFrameNumbers('spiderArmored', { start: 0, end: 5 }),
    frameRate: 20,
    repeat: -1,
  });
  game.anims.create({
    key: 'explosion',
    frames: game.anims.generateFrameNumbers('explosion', { start: 0, end: 8 }),
    frameRate: 30,
    hideOnComplete: true,
  });
};
function makeJoint(game: GameScene, ax, ay, bx, by, body1: MatterJS.BodyType, body2: MatterJS.BodyType) {
  game.matter.add.joint(body1, body2, 0, 1, {
    pointA: { x: ax, y: ay },
    pointB: { x: bx, y: by },
    angularStiffness: 1,
    stiffness: 1,
    damping: 1,
  });
}
export const jointBlocks = (game: GameScene, blocks, data): void => {
  const track = new Set<string>();
  const items = [];
  data.steel.forEach((e) => items.push(e));
  data.crate.forEach((e) => items.push(e));
  data.lava.forEach((e) => items.push(e));
  items.forEach((e) => {
    track.add(blocks[e.x + ',' + e.y]);
    const sprite = blocks[e.x + ',' + e.y].sprite;
    const id = indexes[e.frame];
    // odd numbers are sides
    const sides = id.split('');
    const upId = e.x + ',' + (e.y - 50);
    const rightId = e.x + 50 + ',' + e.y;
    const downId = e.x + ',' + (e.y + 50);
    const leftId = e.x - 50 + ',' + e.y;
    const upJId = e.x + ',' + (e.y - 25);
    const rightJId = e.x + 25 + ',' + e.y;
    const downJId = e.x + ',' + (e.y + 25);
    const leftJId = e.x - 25 + ',' + e.y;
    if (sides[1] == 1 && !track.has(upJId)) {
      const up = blocks[upId];
      // for (let p = -24; p < 25; p += 4) {
      //   makeJoint(game, p, -25, p, 25, sprite.body, up.sprite.body);
      // }
      makeJoint(game, 20, -25, 20, 25, sprite.body, up.sprite.body);
      makeJoint(game, 0, -25, 0, 25, sprite.body, up.sprite.body);
      makeJoint(game, -20, -25, -20, 25, sprite.body, up.sprite.body);
      track.add(upJId);
    }
    if (sides[3] == 1 && !track.has(rightJId)) {
      const right = blocks[rightId];
      // for (let p = -24; p < 25; p += 4) {
      //   makeJoint(game, 25, p, -25, p, sprite.body, right.sprite.body);
      // }
      makeJoint(game, 25, 20, -25, 20, sprite.body, right.sprite.body);
      makeJoint(game, 25, 0, -25, 0, sprite.body, right.sprite.body);
      makeJoint(game, 25, -20, -25, -20, sprite.body, right.sprite.body);
      track.add(rightJId);
    }
    if (sides[5] == 1 && !track.has(downJId)) {
      const down = blocks[downId];
      // for (let p = -24; p < 25; p += 4) {
      //   makeJoint(game, p, 25, p, -25, sprite.body, down.sprite.body);
      // }
      makeJoint(game, -20, 25, -20, -25, sprite.body, down.sprite.body);
      makeJoint(game, 0, 25, 0, -25, sprite.body, down.sprite.body);
      makeJoint(game, 20, 25, 20, -25, sprite.body, down.sprite.body);
      track.add(downJId);
    }
    if (sides[7] == 1 && !track.has(leftJId)) {
      const left = blocks[leftId];
      // for (let p = -24; p < 25; p += 4) {
      //   makeJoint(game, -25, p, 25, p, sprite.body, left.sprite.body);
      // }
      makeJoint(game, -25, 20, 25, 20, sprite.body, left.sprite.body);
      makeJoint(game, -25, 0, 25, 0, sprite.body, left.sprite.body);
      makeJoint(game, -25, -20, 25, -20, sprite.body, left.sprite.body);
      track.add(leftJId);
    }
  });
};
export const connectorBlocks = (game: GameScene, blocks, data): void => {
  data.connector.forEach((e) => {
    const x = parseInt(e.substring(0, e.indexOf(',')));
    const y = parseInt(e.substring(e.indexOf(',') + 1));
    if (x % 50 == 0) {
      new Connector(blocks[x - 25 + ',' + y], blocks[x + 25 + ',' + y], game);
    } else {
      new Connector(blocks[x + ',' + (y - 25)], blocks[x + ',' + (y + 25)], game);
    }
  });
};
