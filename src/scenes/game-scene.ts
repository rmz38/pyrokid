import { BodyType } from 'matter';
import { Input, NONE } from 'phaser';
import { getGameWidth, getGameHeight } from '../helpers';
import Player from '../objects/player';
import Crate from '../objects/crate';
import CompoundCrate from '../objects/compoundCrate';
import Lizard from '../objects/lizard';
import Spider from '../objects/spider';
import Dirt from '../objects/dirt';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};
let player;
let lizard;
let platforms;
let cursors;
let wasd;
let dirtTiles;
interface CrateHash {
  [details: string]: Crate;
}
interface ComHash {
  [details: string]: CompoundCrate;
}
const world_bound_width = 1200;
const world_bound_height = 600;
// interface Crate {
//   crate: any;
//   onFire: boolean;
//   neighbors: Set<Crate>;
//   fireSprite: Phaser.GameObjects.Sprite;
// }
const crates: CrateHash = {};
const compounds: ComHash = {};
const monsterCollisionLabels = new Set<string>(['lizard', 'spider', 'fire']);
let fire;
let fireActive = false;
let fireCooldown = false;
let house;
let spider;
const TILE_SIZE: integer = 50;
const xTiles: integer = Math.floor(world_bound_width / TILE_SIZE);
const yTiles: integer = Math.floor(world_bound_height / TILE_SIZE);
const tiles = [];
for (let i = 0; i < xTiles; i++) {
  const row = [];
  for (let j = 0; j < yTiles; j++) {
    row.push(new Set());
  }
  tiles.push(row);
}
function getTile(x: number, y: number) {
  return [Math.floor(x / 50), Math.floor(y / 50)];
}
function clearTiles() {
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[0].length; j++) {
      tiles[i][j].clear();
    }
  }
}
// function igniteLizard(game, curr, destroyFire) {
//   return null;
// }
function igniteCompound(game, curr: CompoundCrate, destroyFire) {
  if (destroyFire) {
    fire.destroy();
  }
  console.log(curr);
  if (curr.onFire) {
    return;
  }
  curr.onFire = true;
  curr.crates.forEach((e) => {
    igniteCrate(game, e);
  });
  game.time.delayedCall(1000, () => {
    if (curr.sprite.active) {
      curr.sprite.destroy();
    }
  });
}
function igniteCrate(game, currCrate: any) {
  if (currCrate.onFire) {
    return;
  }
  currCrate.onFire = true;
  currCrate.fireSprite = game.add.sprite(currCrate.crate.position.x, currCrate.crate.position.y - 10, 'squareFire');
  currCrate.fireSprite.anims.play('squareFire', false);
  currCrate.fireSprite.alpha = 0.7;
  game.time.delayedCall(1000, () => {
    if (currCrate.fireSprite.active) {
      currCrate.fireSprite.destroy();
    }
    const fireDisappear = game.add.sprite(currCrate.crate.position.x, currCrate.crate.position.y - 10, 'fireDisappear');
    fireDisappear.anims.play('fireDisappear', false, true);
    fireDisappear.once('animationcomplete', () => {
      fireDisappear.destroy();
    });
    const pos = getTile(currCrate.crate.position.x, currCrate.crate.position.y);
    const x = pos[0];
    const y = pos[1];
    const candidates = [
      [x - 1, y],
      [x + 1, y],
      [x, y + 1],
      [x, y - 1],
    ];
    console.log(candidates);
    console.log(compounds['house']);
    console.log(tiles);
    for (let i = 0; i < candidates.length; i++) {
      const x = candidates[i][0];
      const y = candidates[i][1];
      if (x >= 0 && x < xTiles && y >= 0 && y < yTiles) {
        tiles[x][y].forEach((e) => {
          console.log('triggered');
          igniteCompound(game, e.owner, false);
        });
      }
    }
    // if (currCrate.crate) {
    //   currCrate.crate.destroy();
    // }
  });
}

export class GameScene extends Phaser.Scene {
  [x: string]: any;
  public speed = 200;
  constructor() {
    super(sceneConfig);
  }
  public preload() {
    this.load.image('background', 'assets/backgrounds/TutorialBackground1.png');
    this.load.image('ground', 'assets/squares/platform.png');
    this.load.image('house', 'assets/squares/house.png');
    this.load.image('dirtTile', 'assets/squares/dirtTile.png');
    this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 38, frameHeight: 19 });
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('lizard', 'assets/monsters/lizard.png', { frameWidth: 70, frameHeight: 50 });
    this.load.spritesheet('spider', 'assets/monsters/spider.png', { frameWidth: 77, frameHeight: 61 });
    this.load.spritesheet('spiderArmored', 'assets/monsters/spiderArmored.png', { frameWidth: 77, frameHeight: 61 });
    this.load.spritesheet('crate', 'assets/squares/crate.png', { frameWidth: 79, frameHeight: 80 });
    this.load.spritesheet('squareFire', 'assets/squares/squareFire.png', { frameWidth: 79, frameHeight: 80 });
    this.load.spritesheet('fireDisappear', 'assets/squares/fireDisappear.png', { frameWidth: 84, frameHeight: 133 });
  }
  public create(): void {
    this.add.image(400, 300, 'background');
    this.matter.world.setBounds(0, 0, world_bound_width, world_bound_height, 32, true, true, false, true);
    this.cameras.main.setBounds(0, 0, world_bound_width, world_bound_height).setName('main');
    // platforms = this.matter.add.sprite(400, 568, 'ground');
    player = new Player(this);
    this.cameras.main.startFollow(player.player, false, 0.2, 0.2);
    lizard = new Lizard(this);
    spider = new Spider(this, true);
    this.anims.create({
      key: 'cratepic',
      frames: this.anims.generateFrameNumbers('crate', { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'squareFire',
      frames: this.anims.generateFrameNumbers('squareFire', { start: 0, end: 5 }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: 'fireball',
      frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'fireDisappear',
      frames: this.anims.generateFrameNumbers('fireDisappear', { start: 0, end: 39 }),
      frameRate: 60,
    });
    cursors = this.input.keyboard.createCursorKeys();

    wasd = this.input.keyboard.addKeys('W,S,A,D');

    for (let i = 0; i < 5; i += 1) {
      const label = 'crate_' + i;
      crates[label] = new Crate(this, 400, 550 - i * 50, label, null);
      compounds[label] = new CompoundCrate(this, new Set([crates[label]]), 'crate', label);
      // hash instead, tileize
    }
    for (let i = 0; i < 20; i += 1) {
      const test = new Dirt(this, i * 50, 600);
    }
    //demo house
    const tempowner = [];
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        const label = 'cratehouse_' + i + j;
        crates[label] = new Crate(this, 500 + i * 50, 550 - j * 50, label, null);
        tempowner.push(crates[label]);
      }
    }
    compounds['house'] = new CompoundCrate(this, new Set(tempowner), 'house', 'house');
    const game = this;
    this.matter.world.on('collisionstart', function (event) {
      //  Loop through all of the collision pairs
      Object.keys(crates).forEach((key) => {
        const crate = crates[key];
        crate.neighbors.clear();
      });
      const pairs = event.pairs;
      for (let i = 0; i < pairs.length; i++) {
        const bodyA = pairs[i].bodyA;
        const bodyB = pairs[i].bodyB;
        console.log(bodyA.label);
        console.log(bodyB.label);
        if (
          (bodyB.label === 'lizard' && bodyA.label === 'fire') ||
          (bodyA.label === 'lizard' && bodyB.label === 'fire')
        ) {
          fire.destroy();
          fireActive = false;
          lizard.ignite(game);
        }
        if (
          (bodyB.label === 'spider' && bodyA.label === 'fire') ||
          (bodyA.label === 'spider' && bodyB.label === 'fire')
        ) {
          fire.destroy();
          fireActive = false;
          spider.hitFire();
        }
        if (bodyB.label.includes('lizard') && bodyA.label.includes('crate') && lizard.onFire) {
          igniteCompound(game, crates[bodyA.label].owner, false);
        }
        if (bodyA.label.includes('lizard') && bodyB.label.includes('crate') && lizard.onFire) {
          igniteCompound(game, crates[bodyB.label].owner, false);
        }
        //  sensor collisions
        if (pairs[i].isSensor) {
          let playerBody;
          let otherBody;

          if (bodyA.isSensor) {
            playerBody = bodyA;
            otherBody = bodyB;
          } else if (bodyB.isSensor) {
            playerBody = bodyB;
            otherBody = bodyB;
          }

          if (playerBody.label === 'groundSensor' && otherBody.label != 'fire') {
            player.touchingGround = true;
          }
        }
        // fire collision
        if (bodyA.label === 'fire' && bodyB.label.includes('crate')) {
          igniteCompound(game, crates[bodyB.label].owner, true);
        }
        if (bodyB.label === 'fire' && bodyA.label.includes('crate')) {
          igniteCompound(game, crates[bodyA.label].owner, true);
        }
        if (bodyA.label.includes('TurnSensor') || bodyB.label.includes('TurnSensor')) {
          const monsterBody = bodyA.label.includes('TurnSensor') ? bodyA : bodyB;
          const otherBody = bodyA.label.includes('TurnSensor') ? bodyB : bodyA;
          let turnFlag = true;
          monsterCollisionLabels.forEach((label) => {
            if (otherBody.label.includes(label)) {
              turnFlag = false;
            }
          });
          if (turnFlag) {
            if (monsterBody.label.includes('lizard')) {
              lizard.flip();
            } else {
              spider.flip();
            }
          }
        }
        // if (
        //   (bodyB.label === 'spiderTurnSensor' && bodyA.label !== 'fire') ||
        //   (bodyA.label === 'spiderTurnSensor' && bodyB.label !== 'fire')
        // ) {
        //   spider.flip();
        // }
      }
    });
    // this.matter.world.on('collisionactive', function (event) {
    //   //  Loop through all of the collision pairs
    //   const pairs = event.pairs;
    //   for (let i = 0; i < pairs.length; i++) {
    //     const bodyA = pairs[i].bodyA;
    //     const bodyB = pairs[i].bodyB;
    //     if (bodyA.label.includes('crate') && bodyB.label.includes('crate')) {
    //       addNeighbor(crates[bodyA.label], crates[bodyB.label]);
    //     }
    //   }
    // });
  }
  public update(): void {
    clearTiles();
    // add to tiles
    Object.keys(crates).forEach((key) => {
      const curr = crates[key];
      const pos = getTile(curr.crate.position.x, curr.crate.position.y);
      tiles[pos[0]][pos[1]].add(curr);
    });
    // const lizPos = getTile(lizard.sprite.x, lizard.sprite.y);
    // tiles[lizPos[0]][lizPos[1]].add(lizard);
    lizard.sprite.setVelocityX(lizard.velocity);
    if (spider.sprite.active) {
      spider.sprite.setVelocityX(spider.velocity);
    }
    if (wasd.A.isDown) {
      player.moveLeft();
    } else if (wasd.D.isDown) {
      player.moveRight();
    } else {
      player.turn();
    }
    if (wasd.W.isDown && player.touchingGround) {
      player.jump();
    }
    if (
      (cursors.right.isDown || cursors.down.isDown || cursors.up.isDown || cursors.left.isDown) &&
      !fireActive &&
      !fireCooldown
    ) {
      fireCooldown = true;
      fire = this.matter.add.sprite(player.getX(), player.getY(), 'fireball', null, {
        isSensor: true,
        label: 'fire',
      });
      fire.setCollisionCategory(0x0100);
      if (cursors.left.isDown) {
        fire.setRotation(Math.PI);
      }
      if (cursors.down.isDown) {
        fire.setRotation(Math.PI / 2);
      }
      if (cursors.up.isDown) {
        fire.setRotation((3 * Math.PI) / 2);
      }
      fire.anims.play('fireball', true);
      fire.setIgnoreGravity(true);
      const xDir = cursors.right.isDown ? 1 : -1;
      const xVel = cursors.right.isDown || cursors.left.isDown ? 10 : 0;
      fire.setVelocityX(xVel * xDir);
      const yDir = cursors.down.isDown ? 1 : -1;
      const yVel = cursors.down.isDown || cursors.up.isDown ? 10 : 0;
      fire.setVelocityY(yVel * yDir);
      fireActive = true;
      setTimeout(() => {
        if (fireActive) {
          fireActive = false;
          fire.destroy();
        }
        fireCooldown = false;
      }, 500);
    }
    Object.keys(crates).forEach((key) => {
      const crate = crates[key];
      if (crate.fireSprite != null) {
        crate.syncFire();
      }
    });
    if (lizard.onFire) {
      lizard.syncFire();
    }
  }
}
