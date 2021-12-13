class Spider {
  sprite: Phaser.Physics.Matter.Sprite;
  velocity: integer;
  collisionSensor: Phaser.Physics.Matter.Sprite;
  armored: boolean;
  constructor(x: integer, y: integer, game: Phaser.Scene, id: integer, armored: boolean) {
    const spiderRight = game.matter.bodies.rectangle(37, 0, 10, 10, { isSensor: true, label: 'spider' + id });
    const spiderLeft = game.matter.bodies.rectangle(-37, 0, 10, 10, { isSensor: true, label: 'spider' + id });
    const spiderTop = game.matter.bodies.rectangle(0, -25, 30, 2, { isSensor: true, label: 'spiTop,' + id });
    this.collisionSensor = game.matter.add.sprite(0, 0, 'spider', null, {
      isSensor: true,
      label: 'spider' + id,
      ignoreGravity: true,
    });
    this.collisionSensor.setCollisionCategory(0x1000);
    this.collisionSensor.setCollidesWith(0x1000);
    this.collisionSensor.alpha = 0;
    // spiderLeft.collisionFilter.category = 0x0100;
    const spiderBody = game.matter.bodies.rectangle(0, 0, 77, 50, { label: 'spider' + id });
    const compound = game.matter.body.create({
      parts: [spiderBody, spiderRight, spiderLeft, spiderTop],
      inertia: Infinity,
      render: { sprite: { xOffset: 0.5, yOffset: 0.5 } },
    });
    this.velocity = 1;
    const spider = game.matter.add.sprite(0, 0, 'spider');
    spider.setCollisionCategory(0x0001);
    spider.setExistingBody(compound);
    spider.setPosition(x, y);
    spider.setCollidesWith(0x0100);
    this.sprite = spider;
    if (armored) {
      this.sprite.anims.play('spiderArmored', true);
    } else {
      this.sprite.anims.play('spider', true);
    }
    this.armored = true;
  }
  public flip() {
    this.sprite.flipX = !this.sprite.flipX;
    this.velocity = -1 * this.velocity;
  }
  public hitFire() {
    if (this.armored) {
      this.armored = false;
      const lastIndex = this.sprite.anims.currentFrame.index;
      this.sprite.anims.play({ key: 'spider', startFrame: lastIndex - 1 });
      //change sprite
    } else {
      this.sprite.destroy();
    }
  }
  public hitLizard() {
    // just dies because fire lizard one shots
    this.armored = false;
    this.sprite.destroy();
    this.collisionSensor.destroy();
    // this.collisionSensor.destroy();
  }
  public syncSensor() {
    if (this.sprite.active) {
      this.collisionSensor.x = this.sprite.x;
      this.collisionSensor.y = this.sprite.y;
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
    }
  }
}
export default Spider;
