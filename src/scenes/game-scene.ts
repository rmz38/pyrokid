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
import Exit from '../objects/exit';
import { connectorBlocks, initAnims, jointBlocks } from '../helpers/init';
import { createCollisions } from '../helpers/collision-controller';
import Connector from '../objects/connector';
import Bomb from '../objects/bomb';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};
let cursors;
let wasdr;
interface CrateHash {
  [details: string]: Crate;
}
interface LavaHash {
  [details: string]: Lava;
}
interface LizardHash {
  [details: string]: Lizard;
}
interface SpiderHash {
  [details: string]: Spider;
}
interface BombHash {
  [details: string]: Bomb;
}
interface DirtHash {
  [details: string]: Dirt;
}

function getTile(x: number, y: number) {
  return [Math.floor(x / 50), Math.floor(y / 50)];
}
function clearTiles(game: GameScene) {
  for (let i = 0; i < game.tiles.length; i++) {
    for (let j = 0; j < game.tiles[0].length; j++) {
      game.tiles[i][j].clear();
    }
  }
}
export class GameScene extends Phaser.Scene {
  public speed = 200;
  public lizards: LizardHash = {};
  public spiders: SpiderHash = {};
  public lavas: LavaHash = {};
  public crates: CrateHash = {};
  public bombs: BombHash = {};
  public fire: Phaser.Physics.Matter.Sprite;
  public fireActive = false;
  public fireCooldown = false;
  public tiles = [];
  public blocks = {};
  public player: Player;
  public TILE_SIZE: integer = 50;
  public xTiles: integer = 0;
  public yTiles: integer = 0;

  // public compounds = {};
  public level = 'level' + localStorage.getItem('level');
  constructor() {
    super(sceneConfig);
  }
  public preload() {
    this.load.json('level' + localStorage.getItem('level'), 'assets/levels/' + localStorage.getItem('level') + '.json');
  }
  public create(): void {
    initAnims(this);
    const data =
      localStorage.getItem('useleveleditor') == 'true'
        ? JSON.parse(localStorage.getItem('leveleditorlevel'))
        : this.cache.json.get('level' + localStorage.getItem('level'));
    const world_bound_width = data.width * this.TILE_SIZE;
    const world_bound_height = data.height * this.TILE_SIZE;
    const background = this.add.tileSprite(
      world_bound_width / 2,
      world_bound_height / 2,
      world_bound_width,
      world_bound_height,
      'backgroundDirt',
    );
    // background.setScale(world_bound_width / background.width);
    background.setDepth(-10);
    this.matter.world.setBounds(0, 0, world_bound_width, world_bound_height, 32, true, true, false, true);
    this.cameras.main.setBounds(0, 0, world_bound_width, world_bound_height).setName('main');
    this.xTiles = Math.floor(world_bound_width / this.TILE_SIZE);
    this.yTiles = Math.floor(world_bound_height / this.TILE_SIZE);
    this.fire = null;
    this.fireActive = false;
    this.fireCooldown = false;
    for (let i = 0; i < this.xTiles; i++) {
      const row = [];
      for (let j = 0; j < this.yTiles; j++) {
        row.push(new Set());
      }
      this.tiles.push(row);
    }
    this.player = new Player(data.player[0].x, data.player[0].y, this);
    this.cameras.main.startFollow(this.player.sprite, false, 0.2, 0.2);
    this.cameras.main.fadeIn(100, 0, 0, 0);
    // make lizards
    this.lizards = {};
    for (let i = 0; i < data.lizard.length; i++) {
      const e = data.lizard[i];
      this.lizards['lizard' + i] = new Lizard(e.x, e.y, this, i);
    }
    // make spiders
    this.spiders = {};
    let spiderCounter = 0;
    data.spider.forEach((e) => {
      this.spiders['spider' + spiderCounter] = new Spider(e.x, e.y, this, spiderCounter, false);
      spiderCounter += 1;
    });
    data.spiderArmored.forEach((e) => {
      this.spiders['spider' + spiderCounter] = new Spider(e.x, e.y, this, spiderCounter, true);
      spiderCounter += 1;
    });
    this.blocks = {};
    // make steels
    data.steel.forEach((e) => {
      this.blocks[e.x + ',' + e.y] = new Steel(e.x, e.y, this, e.frame);
    });
    // make dirts
    data.dirt.forEach((e) => {
      this.blocks[e.x + ',' + e.y] = new Dirt(e.x, e.y, this, e.frame);
    });
    //make bombs
    this.bombs = {};
    for (let i = 0; i < data.bomb.length; i++) {
      const e = data.bomb[i];
      this.bombs['bomb' + i] = new Bomb(e.x, e.y, i, this);
      this.blocks[e.x + ',' + e.y] = this.bombs['bomb' + i];
    }
    const crates = new Set<Crate>();
    let counter = 0;
    this.crates = {};
    data.crate.forEach((e) => {
      this.blocks[e.x + ',' + e.y] = new Crate(e.x, e.y, counter, this, e.frame, false);
      crates.add(this.blocks[e.x + ',' + e.y]);
      this.crates['crate' + counter] = this.blocks[e.x + ',' + e.y];
      counter += 1;
    });
    data.lava.forEach((e) => {
      this.blocks[e.x + ',' + e.y] = new Crate(e.x, e.y, counter, this, e.frame, true);
      crates.add(this.blocks[e.x + ',' + e.y]);
      this.crates['crate' + counter] = this.blocks[e.x + ',' + e.y];
      counter += 1;
    });
    // new Connector(this.crates['crate' + 0], this.crates['crate' + 1], this);
    data.exit.forEach((e) => {
      new Exit(e.x, e.y, this);
    });

    // compound the crates
    const trackCrates = new Set<string>();
    const crateAndLava = data.crate.concat(data.lava);
    crateAndLava.forEach((e) => {
      const name = e.x + ',' + e.y;
      if (!trackCrates.has(name)) {
        let curr = [name];
        let next = [];
        const toCompound = new Set<Crate>();
        while (curr.length != 0) {
          curr.forEach((i) => {
            const id = indexes[parseInt(this.blocks[i].sprite.frame.name)];
            // odd numbers are sides
            const sides = id.split('');
            trackCrates.add(i);
            toCompound.add(this.blocks[i]);
            const x = this.blocks[i].sprite.x;
            const y = this.blocks[i].sprite.y;
            const up = x + ',' + (y - 50);
            const right = x + 50 + ',' + y;
            const down = x + ',' + (y + 50);
            const left = x - 50 + ',' + y;
            function compoundCrates(tile, game) {
              next.push(tile);
              trackCrates.add(tile);
              toCompound.add(game.blocks[tile]);
            }
            if (sides[1] == 1 && !trackCrates.has(up)) {
              compoundCrates(up, this);
            }
            if (sides[3] == 1 && !trackCrates.has(right)) {
              compoundCrates(right, this);
            }
            if (sides[5] == 1 && !trackCrates.has(down)) {
              compoundCrates(down, this);
            }
            if (sides[7] == 1 && !trackCrates.has(left)) {
              compoundCrates(left, this);
            }
          });
          curr = next;
          next = [];
        }
        new CompoundCrate(this, toCompound, 'compound');
      }
    });

    // const compoundTest = new CompoundCrate(this, crates, 'test1');
    // for (let i = 0; i < data.lava.length; i++) {
    //   const e = data.lava[i];
    //   const temp = new Lava(e.x, e.y, this, e.frame, i);
    //   this.lavas['lava' + i] = temp;
    //   this.blocks[e.x + ',' + e.y] = temp;
    // }
    jointBlocks(this, this.blocks, data);
    createCollisions(this);
    connectorBlocks(this, this.blocks, data);
    cursors = this.input.keyboard.createCursorKeys();

    wasdr = this.input.keyboard.addKeys('W,S,A,D,R');
    new MenuButton(this, 10, 10, 'Back to Menu', () => {
      this.scene.start('MainMenu');
    });
  }
  public update(): void {
    // add crates to tiles
    if (wasdr.R.isDown) {
      this.scene.restart();
    }
    if (this.player.getY() > this.yTiles * this.TILE_SIZE) {
      this.scene.restart();
    }
    clearTiles(this);
    Object.keys(this.crates).forEach((key) => {
      const curr = this.crates[key];
      if (curr.sprite.active) {
        const pos = getTile(curr.sprite.x, curr.sprite.y);
        this.tiles[pos[0]][pos[1]].add(curr);
      }
    });

    // add lavas to tiles
    Object.keys(this.lavas).forEach((key) => {
      const curr = this.lavas[key];
      if (curr.sprite.active) {
        const pos = getTile(curr.sprite.x, curr.sprite.y);
        this.tiles[pos[0]][pos[1]].add(curr);
      }
    });
    for (const [key, lizard] of Object.entries(this.lizards)) {
      lizard.update();
    }
    for (const [key, spider] of Object.entries(this.spiders)) {
      spider.update();
    }
    if (wasdr.A.isDown) {
      this.player.moveLeft();
    } else if (wasdr.D.isDown) {
      this.player.moveRight();
    } else {
      this.player.turn();
    }
    if (wasdr.W.isDown && this.player.touchingGround) {
      this.player.jump();
    }

    //shooting fire and setting the direction
    if (
      (cursors.right.isDown || cursors.down.isDown || cursors.up.isDown || cursors.left.isDown) &&
      !this.fireActive &&
      !this.fireCooldown
    ) {
      this.fireCooldown = true;
      this.fire = this.matter.add.sprite(this.player.getX(), this.player.getY(), 'fireball', null, {
        isSensor: true,
        label: 'fire',
      });
      let direction = 'right';
      this.fire.setCollisionCategory(0x0100);
      if (cursors.left.isDown) {
        this.fire.setRotation(Math.PI);
        direction = 'left';
      }
      if (cursors.down.isDown) {
        this.fire.setRotation(Math.PI / 2);
        direction = 'none';
      }
      if (cursors.up.isDown) {
        this.fire.setRotation((3 * Math.PI) / 2);
        direction = 'none';
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      this.player.shoot(direction);
      this.fire.anims.play('fireball', true);
      this.fire.setIgnoreGravity(true);
      const xDir = cursors.right.isDown ? 1 : -1;
      const xVel = cursors.right.isDown || cursors.left.isDown ? 10 : 0;
      this.fire.setVelocityX(xVel * xDir);
      const yDir = cursors.down.isDown ? 1 : -1;
      const yVel = cursors.down.isDown || cursors.up.isDown ? 10 : 0;
      this.fire.setVelocityY(yVel * yDir);
      this.fireActive = true;
      setTimeout(() => {
        if (this.fireActive) {
          this.fireActive = false;
          this.fire.destroy();
        }
        this.fireCooldown = false;
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
