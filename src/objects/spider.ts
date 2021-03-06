import Enemy from './enemy';
class Spider extends Enemy {
  armored: boolean;
  constructor(x: integer, y: integer, game: Phaser.Scene, id: integer, armored: boolean) {
    super();
    const spiderRight = game.matter.bodies.rectangle(20, 0, 10, 10, { isSensor: true, label: 'spider' + id });
    const spiderLeft = game.matter.bodies.rectangle(-20, 0, 10, 10, { isSensor: true, label: 'spider' + id });
    const spiRightEdge = game.matter.bodies.rectangle(17, 25, 3, 10, { isSensor: true, label: 'rightEdgeS,' + id });
    const spiLeftEdge = game.matter.bodies.rectangle(-17, 25, 3, 10, { isSensor: true, label: 'leftEdgeS,' + id });
    const spiderTop = game.matter.bodies.rectangle(0, -22, 30, 2, { isSensor: true, label: 'spiTop,' + id });
    this.collisionSensor = game.matter.add.sprite(0, 0, 'spider', null, {
      isSensor: true,
      label: 'spider' + id,
      ignoreGravity: true,
    });
    this.collisionSensor.setCollisionCategory(0x1000);
    this.collisionSensor.setCollidesWith(0x1000);
    this.collisionSensor.alpha = 0;
    // spiderLeft.collisionFilter.category = 0x0100;
    const spiderBody = game.matter.bodies.rectangle(0, 0, 35, 40, { label: 'spider' + id });
    const compound = game.matter.body.create({
      parts: [spiderBody, spiderRight, spiRightEdge, spiLeftEdge, spiderLeft, spiderTop],
      inertia: Infinity,
      render: { sprite: { xOffset: 0.5, yOffset: 0.5 } },
    });
    const spider = game.matter.add.sprite(0, 0, 'spider');
    spider.scaleX = 0.7;
    spider.scaleY = 0.9;
    spider.setCollisionCategory(0x0001);
    spider.setExistingBody(compound);
    spider.setPosition(x, y);
    spider.setCollidesWith(0x0100);
    spider.setFriction(0.0);
    this.collisionSensor.scaleX = 0.7;
    this.collisionSensor.scaleY = 0.8;
    this.sprite = spider;
    this.rightEdge = false;
    this.rightEdge = true;
    if (armored) {
      this.sprite.anims.play('spiderArmored', true);
      this.armored = true;
    } else {
      this.sprite.anims.play('spider', true);
    }
  }
  public hitFire() {
    if (this.armored) {
      this.armored = false;
      const lastIndex = this.sprite.anims.currentFrame.index;
      this.sprite.anims.play({ key: 'spider', startFrame: lastIndex - 1 });
      //change sprite
    } else {
      this.armored = false;
      this.destroy();
    }
  }
}
export default Spider;
