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
  crate: Phaser.Physics.Matter.Sprite;
  onFire: boolean;
  fixtures: [];
  
}
const crates: IHash = {};
let touchingGround = true;
let fire;
let fireActive = false;

function igniteCrate(game, crateLabel: string, destroyFire: boolean) {
  if (destroyFire) {
    fire.destroy();
  }
  crates[crateLabel].onFire = true;
  console.log(crates[crateLabel].crate);
  const squareFire = game.add.sprite(crates[crateLabel].crate.x, crates[crateLabel].crate.y - 10, 'squareFire');
  squareFire.alpha = 0.7;
  squareFire.anims.play('squareFire', true);
  setTimeout(() => {
    const fireDisappear = game.add.sprite(crates[crateLabel].crate.x, crates[crateLabel].crate.y - 10, 'fireDisappear');
    fireDisappear.anims.play('fireDisappear', false);
    crates[crateLabel].crate.destroy();
    squareFire.destroy();
  }, 1000);
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
    platforms = this.matter.add.sprite(400, 568, 'ground');

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

    for (let i = 0; i < 10; i += 1) {
      const label = 'crate_' + i;
      crates[label] = {
        crate: this.matter.add.sprite(400, 300 + i * 60, 'crate', null, { label: label }),
        onFire: false,
        fixtures: [],
      };
      crates[label].crate.setRectangle(50, 50, { render: { sprite: { xOffset: 0, yOffset: 0.15 } }, label: label });
      crates[label].crate.setBounce(0);
      // hash instead
    }
    const game = this;
    this.matter.world.on('collisionstart', function (event) {
      //  Loop through all of the collision pairs
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
          igniteCrate(game, bodyB.label, true);
        }
        if (bodyB.label === 'fire' && bodyA.label.includes('crate')) {
          igniteCrate(game, bodyA.label, true);
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
  }
}
