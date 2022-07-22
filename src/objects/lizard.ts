import Enemy from './enemy';
class Lizard extends Enemy {
  onFire: boolean;
  fireSprite: Phaser.GameObjects.Sprite;
  constructor(x: integer, y: integer, game: Phaser.Scene, id: integer) {
    super();
    const lizRight = game.matter.bodies.rectangle(17, 0, 3, 10, { isSensor: true, label: 'lizard' + id });
    const lizRightEdge = game.matter.bodies.rectangle(17, 25, 3, 10, { isSensor: true, label: 'rightEdgeL,' + id });
    const lizLeft = game.matter.bodies.rectangle(-17, 0, 3, 10, { isSensor: true, label: 'lizard' + id });
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
    const lizard = game.matter.add.sprite(0, 0, 'lizard');
    lizard.scaleX = 0.7;
    lizard.setExistingBody(compound);
    lizard.setPosition(x, y);
    lizard.setCollisionCategory(0x001);
    lizard.setCollidesWith(0x0100);
    lizard.setFriction(0.0);
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
  public ignite(game) {
    if (this.onFire) {
      return;
    }
    this.onFire = true;
    this.fireSprite = game.add.sprite(this.sprite.x, this.sprite.y, 'squareFire');
    this.fireSprite.play('squareFire', false);
    this.fireSprite.alpha = 0.7;
  }
  public destroy() {
    super.destroy();
    if (this.fireSprite != null) {
      this.fireSprite.destroy();
    }
  }
  public syncFire() {
    if (this.onFire) {
      this.fireSprite.x = this.sprite.x;
      this.fireSprite.y = this.sprite.y - 10;
    }
  }
  public update() {
    if (this.sprite.active) {
      super.update();
      this.syncFire();
    }
  }
}
export default Lizard;
