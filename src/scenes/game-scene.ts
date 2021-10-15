import { BodyType } from 'matter';
import { Input, NONE } from 'phaser';
import { getGameWidth, getGameHeight } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};
let player;
let platforms;
let cursors;
let wasd;
interface IHash {
  [details: string]: Crate;
}
interface Crate {
  crate: any;
  onFire: boolean;
  neighbors: Set<Crate>;
  fireSprite: Phaser.GameObjects.Sprite;
}
interface House {
  house: any;
  crates: Set<Crate>;
  onFire: boolean;
}
const crates: IHash = {};
let touchingGround = true;
let fire;
let fireActive = false;
const xTiles: integer = 50;
const yTiles: integer = 50;
let bat;
let house: House;
function igniteCrate(game, currCrate: Crate, destroyFire: boolean) {
  if (destroyFire) {
    fire.destroy();
  }
  if (currCrate.onFire) {
    return;
  }
  currCrate.onFire = true;
  currCrate.fireSprite = game.add.sprite(currCrate.crate.x, currCrate.crate.y - 10, 'squareFire');
  currCrate.fireSprite.anims.play('squareFire', false);
  currCrate.fireSprite.alpha = 0.7;
  game.time.delayedCall(1000, () => {
    if (currCrate.fireSprite.active) {
      currCrate.fireSprite.destroy();
    }
    const fireDisappear = game.add.sprite(currCrate.crate.x, currCrate.crate.y - 10, 'fireDisappear');
    fireDisappear.anims.play('fireDisappear', false, true);
    fireDisappear.once('animationcomplete', () => {
      fireDisappear.destroy();
    });
    if (currCrate.crate.active) {
      currCrate.crate.destroy();
    }
    currCrate.neighbors.forEach((neighbor) => {
      igniteCrate(game, neighbor, false);
    });
  });
}
function igniteHouse(game, currHouse: House, destroyFire) {
  if (destroyFire) {
    fire.destroy();
  }
  if (currHouse.onFire) {
    return;
  }
  currHouse.onFire = true;
  house.crates.forEach((crate) => {
    igniteCrate(game, crate, true);
  });
  game.time.delayedCall(1000, () => {
    house.house.destroy();
  });
}
// setTimeout(() => {
//   const fireDisappear = game.add.sprite(currCrate.crate.x, currCrate.crate.y - 10, 'fireDisappear');
//   fireDisappear.anims.play('fireDisappear', false, true);
//   fireDisappear.once('animationcomplete', () => {
//     fireDisappear.destroy();
//   });
//   currCrate.neighbors.forEach((neighbor) => {
//     if (neighbor.crate.active) {
//       igniteCrate(game, neighbor, false);
//     }
//   });
//   currCrate.crate.destroy();
//   squareFire.destroy();
// }, 1000);
function addNeighbor(crate1: Crate, crate2: Crate) {
  // crate1.neighbors.clear();
  // crate2.neighbors.clear();
  const xDiff = Math.abs(Math.floor(crate1.crate.x / xTiles) - Math.floor(crate2.crate.x / xTiles));
  const yDiff = Math.abs(Math.floor(crate1.crate.y / yTiles) - Math.floor(crate2.crate.y / yTiles));
  if ((xDiff < 2 && yDiff < 1) || (xDiff < 1 && yDiff < 2)) {
    if (crate2.crate.active && crate1.crate.active) {
      if (!crate2.onFire) {
        crate1.neighbors.add(crate2);
      }
      if (!crate1.onFire) {
        crate2.neighbors.add(crate1);
      }
    }
  }
  console.log(xDiff);
  console.log(yDiff);
}
export class GameScene extends Phaser.Scene {
  [x: string]: any;
  public speed = 200;
  constructor() {
    super(sceneConfig);
  }
  public preload() {
    this.load.image('background', 'assets/backgrounds/TutorialBackground1.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('house', 'assets/house.png');
    this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 38, frameHeight: 19 });
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('crate', 'assets/crate.png', { frameWidth: 79, frameHeight: 80 });
    this.load.spritesheet('squareFire', 'assets/squareFire.png', { frameWidth: 79, frameHeight: 80 });
    this.load.spritesheet('fireDisappear', 'assets/fireDisappear.png', { frameWidth: 84, frameHeight: 133 });
  }
  public create(): void {
    this.add.image(400, 300, 'background');
    const rec = this.matter.bodies.rectangle(0, 24, 20, 1, { isSensor: true, label: 'groundSensor' });
    this.matter.world.setBounds(0, 0, 800, 600, 32, true, true, false, true);
    // platforms = this.matter.add.sprite(400, 568, 'ground');

    const playerBody = this.matter.bodies.rectangle(0, 0, 32, 48);
    const compound = this.matter.body.create({
      parts: [playerBody, rec],
      inertia: Infinity,
      render: { sprite: { xOffset: 0.5, yOffset: 0.5 } },
    });
    player = this.matter.add.sprite(0, 0, 'dude');
    player.setExistingBody(compound);
    player.body.render.sprite.xOffset = 0;
    player.body.render.sprite.yOffset = 0;
    player.setPosition(100, 450);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

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
      crates[label] = {
        crate: this.matter.add.sprite(400, 550 - i * 50, 'crate', null, { label: label }),
        onFire: false,
        fireSprite: null,
        neighbors: new Set<Crate>(),
      };
      // const top = this.matter.bodies.rectangle(0, -25, 10, 1, { isSensor: true, label: label });
      // const right = this.matter.bodies.rectangle(25, 0, 1, 10, { isSensor: true, label: label });
      // const bottom = this.matter.bodies.rectangle(0, 25, 10, 1, { isSensor: true, label: label });
      // const left = this.matter.bodies.rectangle(-25, 0, 1, 10, { isSensor: true, label: label });
      // const rec = this.matter.bodies.rectangle(0, 0, 50, 50);
      // const compound = this.matter.body.create({
      //   parts: [top, right, bottom, left, rec],
      //   inertia: Infinity,
      //   render: { sprite: { xOffset: 0, yOffset: 0.15 } },
      // });
      // crates[label].crate.setExistingBody(compound);
      crates[label].crate.setRectangle(50, 50, { render: { sprite: { xOffset: 0, yOffset: 0.15 } }, label: label });
      // crates[label].crate.body.setInertia(Infinity);
      crates[label].crate.setBounce(0);
      crates[label].crate.setPosition(400, 550 - i * 50);
      // hash instead, tilize
    }
    house = {
      house: this.matter.add.sprite(175, 450, 'house', 0, { label: 'house' }),
      crates: new Set(),
      onFire: false,
    };
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        const label = 'house' + i;
        const currCrate = {
          // crate: this.matter.add.sprite(200, 550 - i * 50, 'crate', null, { label: label }),
          crate: this.matter.bodies.rectangle(200 + j * 50, 550 - i * 50, 50, 50),
          // crate: { x: 200 + j * 50, y: 550 - i * 50 },
          onFire: false,
          fireSprite: null,
          neighbors: new Set<Crate>(),
        };
        house.crates.add(currCrate);
        // currCrate.crate.setRectangle(50, 50, {
        //   render: { sprite: { xOffset: 0, yOffset: 0.15 } },
        //   label: label,
        // });
        // // house.crates[label].crate.setBounce(0);
        // currCrate.crate.setPosition(200 + j * 50, 550 - i * 50);
      }
    }
    // const houseCrates = [];
    // house.crates.forEach((c) => houseCrates.push(c.crate));
    // const houseCompound = this.matter.body.create({
    //   parts: houseCrates,
    //   inertia: Infinity,
    //   render: { sprite: { xOffset: 0.5, yOffset: 0.5 } },
    // });
    // house.house.setExistingBody(houseCompound);
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
            touchingGround = true;
          }
        }
        // fire collision
        if (bodyA.label === 'fire' && bodyB.label.includes('crate')) {
          igniteCrate(game, crates[bodyB.label], true);
        }
        if (bodyB.label === 'fire' && bodyA.label.includes('crate')) {
          igniteCrate(game, crates[bodyA.label], true);
        }
        if (bodyA.label === 'fire' && bodyB.label.includes('house')) {
          Object.keys(house.crates).forEach((key) => {
            igniteCrate(game, house.crates[key], true);
          });
        }
        if (bodyB.label === 'fire' && bodyA.label.includes('house')) {
          igniteHouse(game, house, true);
        }
        // if (bodyA.label.includes('crate') && bodyB.label.includes('crate')) {
        //   addNeighbor(crates[bodyA.label], crates[bodyB.label]);
        // }
      }
    });
    this.matter.world.on('collisionactive', function (event) {
      //  Loop through all of the collision pairs
      const pairs = event.pairs;
      for (let i = 0; i < pairs.length; i++) {
        const bodyA = pairs[i].bodyA;
        const bodyB = pairs[i].bodyB;
        if (bodyA.label.includes('crate') && bodyB.label.includes('crate')) {
          addNeighbor(crates[bodyA.label], crates[bodyB.label]);
        }
      }
    });
  }

  public update(): void {
    if (wasd.A.isDown) {
      player.setVelocityX(-7);

      player.anims.play('left', true);
    } else if (wasd.D.isDown) {
      player.setVelocityX(7);

      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);

      player.anims.play('turn');
    }

    if (wasd.W.isDown && touchingGround) {
      player.setVelocityY(-10);
      touchingGround = false;
    }
    if (
      (cursors.right.isDown || cursors.down.isDown || cursors.up.isDown || cursors.left.isDown) &&
      fireActive === false
    ) {
      fire = this.matter.add.sprite(player.body.position.x, player.body.position.y, 'fireball', null, {
        isSensor: true,
        label: 'fire',
      });
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
      }, 500);
    }
    Object.keys(crates).forEach((key) => {
      const crate = crates[key];
      if (crate.fireSprite != null && crate.crate.active) {
        crate.fireSprite.x = crate.crate.x;
        crate.fireSprite.y = crate.crate.y - 10;
      }
    });
  }
}
