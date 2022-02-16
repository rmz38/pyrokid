import { Physics } from 'phaser';

class Lizard {
  sprite: Phaser.Physics.Matter.Sprite;
  onFire: boolean;
  fireSprite: Phaser.GameObjects.Sprite;
  velocity: integer;
  collisionSensor: Phaser.Physics.Matter.Sprite;
  id: integer;
  rightEdge: boolean;
  leftEdge: boolean;
  constructor(x: integer, y: integer, game: Phaser.Scene, id: integer) {
    const lizRight = game.matter.bodies.rectangle(15, 0, 10, 10, { isSensor: true, label: 'lizard' + id });
    const lizRightEdge = game.matter.bodies.rectangle(17, 25, 3, 10, { isSensor: true, label: 'rightEdgeL,' + id });
    const lizLeft = game.matter.bodies.rectangle(-15, 0, 10, 10, { isSensor: true, label: 'lizard' + id });
    const lizLeftEdge = game.matter.bodies.rectangle(-17, 25, 3, 10, { isSensor: true, label: 'leftEdgeL,' + id });
    const lizTop = game.matter.bodies.rectangle(0, -20, 30, 2, { isSensor: true, label: 'lizTop,' + id });
    const lizardBody = game.matter.bodies.rectangle(0, 0, 35, 40, { label: 'lizard' + id });
    // const collisionBody = game.matter.bodies.rectangle(0, 0, 1, 40, { isSensor: true, label: 'lizard' + id });
    this.collisionSensor = game.matter.add.sprite(0, 0, 'lizard', null, {
      isSensor: true,
      label: 'lizard' + id,
      ignoreGravity: true,
    });
    this.collisionSensor.alpha = 0;
    // const spiderSensor = game.matter.bodies.rectangle(0, 0, 70, 50, { label: 'lizard' });
    const compound = game.matter.body.create({
      parts: [lizardBody, lizRight, lizLeftEdge, lizRightEdge, lizLeft, lizTop],
      inertia: Infinity,
      render: { sprite: { xOffset: 0.5, yOffset: 0.5 } },
    });
    this.velocity = 1.5;
    const lizard = game.matter.add.sprite(0, 0, 'lizard');
    lizard.scaleX = 0.7;
    lizard.setExistingBody(compound);
    lizard.setPosition(x, y);
    lizard.setCollisionCategory(0x001);
    lizard.setCollidesWith(0x0100);
    lizard.setFriction(0);
    lizard.setDensity(0.00001);
    this.collisionSensor.setCollisionCategory(0x1000);
    this.collisionSensor.setCollidesWith(0x101000);
    this.collisionSensor.scaleX = 0.7;
    // lizLeft.collisionFilter.category = 0x0100;
    this.sprite = lizard;
    this.onFire = false;
    this.fireSprite = null;
    this.sprite.anims.play('lizard', true);
    this.rightEdge = false;
    this.leftEdge = false;
  }
  public flip() {
    this.sprite.flipX = !this.sprite.flipX;
    this.velocity = -1 * this.velocity;
  }
  public ignite(game) {
    if (this.onFire) {
      return;
    }
    this.onFire = true;
    this.fireSprite = game.add.sprite(this.sprite.x, this.sprite.y, 'squareFire');
    this.fireSprite.play('squareFire', false);
    this.fireSprite.alpha = 0.7;
  }
  public syncFire() {
    if (this.onFire) {
      this.fireSprite.x = this.sprite.x;
      this.fireSprite.y = this.sprite.y - 10;
    }
  }
  public syncSensor() {
    if (this.sprite.active) {
      this.collisionSensor.setPosition(this.sprite.x, this.sprite.y);
    }
  }
  public destroy() {
    this.sprite.destroy();
    this.collisionSensor.destroy();
  }
  public update() {
    if (this.sprite.active) {
      this.sprite.setVelocityX(this.velocity);
      this.syncSensor();
      this.syncFire();
    }
  }
}
export default Lizard;
