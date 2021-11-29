import { BodyType } from 'matter';
import { Input, NONE } from 'phaser';
import { getGameWidth, getGameHeight } from '../helpers';
import Player from '../objects/player';
import Crate from '../objects/crate';
import CompoundCrate from '../objects/compoundCrate';
import Lizard from '../objects/lizard';
import Spider from '../objects/spider';
import Dirt from '../objects/dirt';
import Steel from '../objects/steel';
import Lava from '../objects/lava';
import { MenuButton } from '../ui/menu-button';
import { indexes } from '../helpers/clump';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};
let player;
let cursors;
let wasd;
interface CrateHash {
  [details: string]: Crate;
}
interface ComHash {
  [details: string]: CompoundCrate;
}
interface LizardHash {
  [details: string]: Lizard;
}
interface SpiderHash {
  [details: string]: Spider;
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
function igniteCompound(game, curr: CompoundCrate, destroyFire) {
  if (destroyFire) {
    fire.destroy();
  }
  if (curr.onFire) {
    return;
  }
  curr.onFire = true;
  curr.crates.forEach((e) => {
    igniteCrate(game, e);
  });
  game.time.delayedCall(1000, () => {
    curr.crates.forEach((e) => {
      e.destroy();
    });
  });
}
function igniteCrate(game, currCrate: any) {
  if (currCrate.onFire) {
    return;
  }
  currCrate.onFire = true;
  currCrate.fireSprite = game.add.sprite(currCrate.sprite.x, currCrate.sprite.y - 10, 'squareFire');
  currCrate.fireSprite.anims.play('squareFire', false);
  currCrate.fireSprite.alpha = 0.7;
  game.time.delayedCall(1000, () => {
    if (currCrate.fireSprite.active) {
      currCrate.fireSprite.destroy();
    }
    const fireDisappear = game.add.sprite(currCrate.sprite.x, currCrate.sprite.y - 10, 'fireDisappear');
    fireDisappear.anims.play('fireDisappear', false, true);
    fireDisappear.once('animationcomplete', () => {
      fireDisappear.destroy();
    });
    const pos = getTile(currCrate.sprite.x, currCrate.sprite.y);
    const x = pos[0];
    const y = pos[1];
    const candidates = [
      [x - 1, y],
      [x + 1, y],
      [x, y + 1],
      [x, y - 1],
    ];
    for (let i = 0; i < candidates.length; i++) {
      const x = candidates[i][0];
      const y = candidates[i][1];
      if (x >= 0 && x < xTiles && y >= 0 && y < yTiles) {
        tiles[x][y].forEach((e) => {
          igniteCompound(game, e.owner, false);
        });
      }
    }
  });
}

export class GameScene extends Phaser.Scene {
  [x: string]: any;
  public speed = 200;
  public lizards: LizardHash = {};
  public spiders: SpiderHash = {};
  public lavas = {};
  public crates = {};
  // public compounds = {};
  public level = 'level' + localStorage.getItem('level');
  constructor() {
    super(sceneConfig);
  }
  public jointBlocks(blocks, data) {
    const track = new Set<Steel>();
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
        this.matter.add.joint(sprite.body, up.sprite.body, 10, 1, {
          pointA: { x: 0, y: -25 },
          pointB: { x: 0, y: 25 },
          angularStiffness: 1,
        });
        track.add(up);
      }
      if (sides[3] == 1 && !track.has(right)) {
        this.matter.add.joint(sprite.body, right.sprite.body, 0, 1, {
          pointA: { x: 25, y: 0 },
          pointB: { x: -25, y: 0 },
          angularStiffness: 1,
        });
        track.add(right);
      }
      if (sides[5] == 1 && !track.has(down)) {
        this.matter.add.joint(sprite.body, down.sprite.body, 0, 1, {
          pointA: { x: 0, y: 25 },
          pointB: { x: 0, y: -25 },
          angularStiffness: 1,
        });
        track.add(down);
      }
      if (sides[7] == 1 && !track.has(left)) {
        this.matter.add.joint(sprite.body, left.sprite.body, 0, 1, {
          pointA: { x: -25, y: 0 },
          pointB: { x: 25, y: 0 },
          angularStiffness: 1,
        });
        track.add(left);
      }
    });
  }
  public preload() {
    this.load.image('background', 'assets/backgrounds/TutorialBackground1.png');
    this.load.image('ground', 'assets/squares/platform.png');
    this.load.image('house', 'assets/squares/house.png');
    this.load.spritesheet('crate', 'assets/clumpables/crateTiles.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('dirt', 'assets/clumpables/dirtTiles.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('steel', 'assets/clumpables/steelTiles.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('lava', 'assets/clumpables/lavaTiles.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 38, frameHeight: 19 });
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('lizard', 'assets/monsters/lizard.png', { frameWidth: 70, frameHeight: 50 });
    this.load.spritesheet('spider', 'assets/monsters/spider.png', { frameWidth: 77, frameHeight: 61 });
    this.load.spritesheet('spiderArmored', 'assets/monsters/spiderArmored.png', { frameWidth: 77, frameHeight: 61 });
    this.load.spritesheet('squareFire', 'assets/squares/squareFire.png', { frameWidth: 79, frameHeight: 80 });
    this.load.spritesheet('fireDisappear', 'assets/squares/fireDisappear.png', { frameWidth: 84, frameHeight: 133 });
    this.load.json('level' + localStorage.getItem('level'), 'assets/levels/' + localStorage.getItem('level') + '.json');
  }
  public create(): void {
    const background = this.add.image(world_bound_width / 2, world_bound_height / 2, 'background');
    background.setScale(world_bound_width / background.width);
    this.matter.world.setBounds(0, 0, world_bound_width, world_bound_height, 32, true, true, false, true);
    this.cameras.main.setBounds(0, 0, world_bound_width, world_bound_height).setName('main');
    const data =
      localStorage.getItem('useleveleditor') == 'true'
        ? JSON.parse(localStorage.getItem('leveleditorlevel'))
        : this.cache.json.get('level' + localStorage.getItem('level'));
    // const data = this.cache.json.get('level');
    // const jsonData = JSON.parse();
    player = new Player(data.player[0].x, data.player[0].y, this);
    this.cameras.main.startFollow(player.sprite, false, 0.2, 0.2);
    // make lizards
    for (let i = 0; i < data.lizard.length; i++) {
      const e = data.lizard[i];
      this.lizards['lizard' + i] = new Lizard(e.x, e.y, this, i);
    }
    // make spiders
    for (let i = 0; i < data.spider.length; i++) {
      const e = data.spider[i];
      this.spiders['spider' + i] = new Spider(e.x, e.y, this, i, false);
    }
    data.dirt.forEach((e) => {
      new Dirt(e.x, e.y, this, e.frame);
    });

    const blocks = {};
    data.steel.forEach((e) => {
      blocks[e.x + ',' + e.y] = new Steel(e.x, e.y, this, e.frame);
    });

    const crates = new Set<Crate>();
    let counter = 0;
    data.crate.forEach((e) => {
      blocks[e.x + ',' + e.y] = new Crate(e.x, e.y, counter, this, e.frame);
      crates.add(blocks[e.x + ',' + e.y]);
      this.crates['crate' + counter] = blocks[e.x + ',' + e.y];
      counter += 1;
    });

    // compound the crates
    const trackCrates = new Set<string>();
    data.crate.forEach((e) => {
      const name = e.x + ',' + e.y;
      if (!trackCrates.has(name)) {
        let curr = [name];
        let next = [];
        const toCompound = new Set<Crate>();
        while (curr.length != 0) {
          curr.forEach((i) => {
            const id = indexes[parseInt(blocks[i].sprite.frame.name)];
            // odd numbers are sides
            const sides = id.split('');
            trackCrates.add(i);
            toCompound.add(blocks[i]);
            const x = blocks[i].sprite.x;
            const y = blocks[i].sprite.y;
            const up = x + ',' + (y - 50);
            const right = x + 50 + ',' + y;
            const down = x + ',' + (y + 50);
            const left = x - 50 + ',' + y;
            function compoundCrates(tile) {
              next.push(tile);
              trackCrates.add(tile);
              toCompound.add(blocks[tile]);
            }
            if (sides[1] == 1 && !trackCrates.has(up)) {
              compoundCrates(up);
            }
            if (sides[3] == 1 && !trackCrates.has(right)) {
              compoundCrates(right);
            }
            if (sides[5] == 1 && !trackCrates.has(down)) {
              compoundCrates(down);
            }
            if (sides[7] == 1 && !trackCrates.has(left)) {
              compoundCrates(left);
            }
          });
          curr = next;
          next = [];
        }
        new CompoundCrate(this, toCompound, 'compound');
      }
    });

    // const compoundTest = new CompoundCrate(this, crates, 'test1');

    this.jointBlocks(blocks, data);
    for (let i = 0; i < data.lava.length; i++) {
      const e = data.lava[i];
      this.lavas['lava' + i] = new Lava(e.x, e.y, this, e.frame, i);
    }

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
        const a = bodyA.label;
        const b = bodyB.label;
        if ((b.includes('lizard') && a === 'fire') || (a.includes('lizard') && b === 'fire')) {
          fire.destroy();
          fireActive = false;
          const lizard = a.includes('lizard') ? a : b;
          game.lizards[lizard].ignite(game);
        }
        if ((b.includes('spider') && a === 'fire') || (a.includes('spider') && b === 'fire')) {
          fire.destroy();
          fireActive = false;
          // if (b)
          // spider.hitFire();
        }
        if ((b.includes('lizard') && a.includes('lava')) || (a.includes('lizard') && b.includes('lava'))) {
          const lava = a.includes('lava') ? a : b;
          const lizard = a.includes('lava') ? b : a;
          if (game.lizards[lizard].onFire) {
            game.lavas[lava].ignite(game);
          }
        }
        if ((b.includes('spider') && a.includes('lizard')) || (a.includes('spider') && b.includes('lizard'))) {
          const lizard = a.includes('lizard') ? a : b;
          if (game.lizards[lizard].onFire) {
            // spider.hitFire();
          }
        }
        if (b.includes('lizard') && a.includes('crate') && game.lizards[0].onFire) {
          igniteCompound(game, game.crates[a].owner, false);
        }
        if (a.includes('lizard') && b.includes('crate') && game.lizards[0].onFire) {
          igniteCompound(game, game.crates[b].owner, false);
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
        if (a === 'fire' && b.includes('crate')) {
          igniteCompound(game, game.crates[b].owner, true);
        }
        if (b === 'fire' && a.includes('crate')) {
          igniteCompound(game, game.crates[a].owner, true);
        }
        if (
          (bodyA.isSensor && a != 'groundSensor' && a != 'fire') ||
          (bodyB.isSensor && b != 'groundSensor' && b != 'fire')
        ) {
          const monsterBody = bodyA.isSensor ? bodyA : bodyB;
          const otherBody = bodyA.isSensor ? bodyB : bodyA;
          let turnFlag = true;
          monsterCollisionLabels.forEach((label) => {
            if (otherBody.label.includes(label)) {
              turnFlag = false;
            }
          });
          if (turnFlag) {
            if (monsterBody.label.includes('lizard')) {
              game.lizards[monsterBody.label].flip();
            } else {
              game.spiders[monsterBody.label].flip();
            }
          }
        }
      }
    });
    new MenuButton(this, 10, 10, 'Back to Menu', () => {
      this.scene.start('MainMenu');
    });
  }
  public update(): void {
    clearTiles();
    // add to tiles
    Object.keys(this.crates).forEach((key) => {
      const curr = this.crates[key];
      if (curr.sprite.active) {
        const pos = getTile(curr.sprite.x, curr.sprite.y);
        tiles[pos[0]][pos[1]].add(curr);
      }
    });
    for (const [key, lizard] of Object.entries(this.lizards)) {
      lizard.sprite.setVelocityX(lizard.velocity);
      if (lizard.onFire) {
        lizard.syncFire();
      }
    }
    for (const [key, spider] of Object.entries(this.spiders)) {
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
    Object.keys(this.crates).forEach((key) => {
      const crate = this.crates[key];
      if (crate.fireSprite != null) {
        crate.syncFire();
      }
    });
  }
}
