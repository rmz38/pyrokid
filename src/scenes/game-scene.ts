import Player from '../objects/player';
import Crate from '../objects/crate';
import Compound from '../objects/compound';
import Lizard from '../objects/lizard';
import Spider from '../objects/spider';
import Dirt from '../objects/dirt';
import Steel from '../objects/steel';
import { MenuButton } from '../ui/menu-button';
import Exit from '../objects/exit';
import { connectorBlocks, initAnims, jointBlocks } from '../helpers/init';
import { createCollisions } from '../helpers/collision-controller';
import Bomb from '../objects/bomb';
import * as Helpers from '../helpers';
import Terrain from '../objects/terrain';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};
let cursors;
let wasdr;

export class GameScene extends Phaser.Scene {
  public speed = 100;
  public lizards: Helpers.LizardHash = {};
  public spiders: Helpers.SpiderHash = {};
  public lavas: Helpers.LavaHash = {};
  public crates: Helpers.CrateHash = {};
  public bombs: Helpers.BombHash = {};
  public fire: Phaser.Physics.Matter.Sprite;
  public fireActive = false;
  public fireCooldown = false;
  public tiles = [];
  public blocks = {};
  public player: Player;
  public TILE_SIZE: integer = 50;
  public xTiles: integer = 0;
  public yTiles: integer = 0;
  public burnQueue: Set<Compound> = new Set<Compound>();
  public destroyQueue: Set<Crate> = new Set<Crate>();
  public dynamicBlockQueue: Set<Terrain> = new Set<Terrain>();
  // static block queue must preserve order due to checking lower blocks before higher blocks
  public staticBlockQueue: Set<Terrain> = new Set<Terrain>();

  // public compounds = {};
  public level = 'level' + localStorage.getItem('level');
  graphics: Phaser.GameObjects.Graphics;
  constructor() {
    super(sceneConfig);
  }
  public preload() {
    this.load.json('level' + localStorage.getItem('level'), 'assets/levels/' + localStorage.getItem('level') + '.json');
  }
  public create(): void {
    wasdr = this.input.keyboard.addKeys('W,S,A,D,R,ESC,J');
    //this.mover = this.matter.add.sprite(300, 500, 'lizard');
    this.burnQueue.clear();
    this.destroyQueue.clear();
    this.dynamicBlockQueue.clear();
    this.staticBlockQueue.clear();
    initAnims(this);
    const data =
      localStorage.getItem('useleveleditor') == 'true'
        ? JSON.parse(localStorage.getItem('leveleditorlevel'))
        : this.cache.json.get('level' + localStorage.getItem('level'));
    // in case to open in level editor
    localStorage.setItem('leveleditorlevel', JSON.stringify(data));
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
    this.matter.world.updateWall(false, 'bottom');
    this.cameras.main.setBounds(0, 0, world_bound_width, world_bound_height).setName('main');
    this.xTiles = data.height;
    this.yTiles = data.width;
    this.fire = null;
    this.fireActive = false;
    this.fireCooldown = false;
    this.tiles = [];
    for (let i = 0; i < this.yTiles; i++) {
      const row = [];
      for (let j = 0; j < this.xTiles; j++) {
        row.push(new Set());
      }
      this.tiles.push(row);
    }
    this.player = new Player(data.player[0].x, data.player[0].y, this);
    this.cameras.main.startFollow(this.player.sprite, false, 0.05, 0.05);
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
      this.blocks[e.x + ',' + e.y].sprite.setName('steeltemp');
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

    data.exit.forEach((e) => {
      new Exit(e.x, e.y, this);
    });

    const crateAndLava = data.crate.concat(data.lava);
    Helpers.compoundBlocks(this, crateAndLava);
    const steel = data.steel;
    Helpers.compoundBlocks(this, steel);
    jointBlocks(this, this.blocks, data);
    createCollisions(this);
    connectorBlocks(this, this.blocks, data);
    Helpers.initDynamicAndStaticQueues(this);
    // Helpers.updateDynamic(this);
    Helpers.updateStatic(this);
    cursors = this.input.keyboard.createCursorKeys();
  }
  public update(): void {
    // add crates to tiles
    // this.mover.setVelocityX(2);
    // this.mover.setScale(2);
    if (wasdr.R.isDown) {
      this.scene.restart();
    }
    if (this.player.getY() > this.xTiles * this.TILE_SIZE) {
      this.scene.restart();
    }
    Helpers.clearTiles(this);
    Object.keys(this.crates).forEach((key) => {
      const curr = this.crates[key];
      if (curr.sprite.active) {
        //TODO optimize later
        const [x, y] = Helpers.getTile(curr.sprite.x, curr.sprite.y);
        //TODO CHECK IF IN BOUNDS OF WORLD
        // if (y > 0 && y < this.yTiles) {
        if (y > 0 && y < this.xTiles) {
          this.tiles[x][y].add(curr);
        } else {
          this.destroyQueue.add(curr);
          this.dynamicBlockQueue.delete(curr);
        }
      }
    });

    for (const [key, lizard] of Object.entries(this.lizards)) {
      lizard.update();
    }
    for (const [key, spider] of Object.entries(this.spiders)) {
      spider.update();
    }
    if (wasdr.ESC.isDown) {
      this.scene.launch('PauseMenu');
      this.scene.pause();
    }
    if (wasdr.A.isDown) {
      this.player.moveLeft();
    } else if (wasdr.D.isDown) {
      this.player.moveRight();
    } else {
      this.player.turn();
    }
    if (wasdr.W.isDown && this.player.touchingGround) {
      this.player.jump(this);
    }
    Helpers.updateDynamic(this);
    Helpers.updateStatic(this);
    // process crates to be burned and make above blocks dynamic when destroyed
    this.burnQueue.forEach((owner: Compound) => {
      Helpers.igniteCompound(this, owner);
      this.burnQueue.delete(owner);
    });
    this.destroyQueue.forEach((crate: Crate) => {
      const id = Helpers.blockId(crate);
      if (this.blocks[id] == crate) {
        delete this.blocks[id];
      }
      this.destroyQueue.delete(crate);
      this.dynamicBlockQueue.delete(crate);
      this.staticBlockQueue.delete(crate);
      crate.destroy(this);
    });
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
      let direction: 'right' | 'left' | 'none' = 'right';
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
