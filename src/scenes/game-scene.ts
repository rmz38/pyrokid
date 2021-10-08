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
const crates = {};
let touchingGround = true;
let fire;
let fireActive = false;

export class GameScene extends Phaser.Scene {
  [x: string]: any;
  public speed = 200;
  constructor() {
    super(sceneConfig);
  }
  public preload() {
    this.load.image('background', 'assets/backgrounds/TutorialBackground1.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('crate', 'assets/crate.png', { frameWidth: 79, frameHeight: 80 });
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
    console.log(player);
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

    cursors = this.input.keyboard.createCursorKeys();

    wasd = this.input.keyboard.addKeys('W,S,A,D');

    for (let i = 0; i < 10; i += 1) {
      const label = 'crate_' + i;
      crates[label] = this.matter.add.sprite(400, 300 + i * 60, 'crate', null, { label: label });
      crates[label].setRectangle(50, 50, { render: { sprite: { xOffset: 0, yOffset: 0.15 } }, label: label });
      crates[label].setBounce(0);
      // hash instead
    }

    this.matter.world.on('collisionstart', function (event) {
      //  Loop through all of the collision pairs
      const pairs = event.pairs;

      for (let i = 0; i < pairs.length; i++) {
        const bodyA = pairs[i].bodyA;
        const bodyB = pairs[i].bodyB;
        console.log(pairs[i]);

        //  sensor collisions
        if (pairs[i].isSensor) {
          let playerBody;

          if (bodyA.isSensor) {
            playerBody = bodyA;
          } else if (bodyB.isSensor) {
            playerBody = bodyB;
          }

          if (playerBody.label === 'groundSensor') {
            touchingGround = true;
          }
        }
        // fire collision
        if (bodyA.label === 'fire' && bodyB.label.includes('crate')) {
          fire.destroy();
          setTimeout(() => {
            crates[bodyB.label].destroy();
          }, 1000);
        }
        if (bodyB.label === 'fire' && bodyA.label.includes('crate')) {
          fire.destroy();
          setTimeout(() => {
            crates[bodyA.label].destroy();
          }, 1000);
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
      fire = this.matter.add.image(player.body.position.x, player.body.position.y, 'star', null, {
        isSensor: true,
        label: 'fire',
      });
      fire.setIgnoreGravity(true);
      fire.setVelocityX(10);
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
