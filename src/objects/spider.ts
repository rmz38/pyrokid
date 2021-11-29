class Spider {
  sprite: any;
  velocity: integer;
  armored: boolean;
  constructor(x: integer, y: integer, game: any, id: integer, armored: boolean) {
    const spiderRight = game.matter.bodies.rectangle(37, 0, 10, 10, { isSensor: true, label: 'spider' + id });
    const spiderLeft = game.matter.bodies.rectangle(-37, 0, 10, 10, { isSensor: true, label: 'spider' + id });
    spiderLeft.collisionFilter.category = 0x0100;
    const spiderBody = game.matter.bodies.rectangle(0, 0, 77, 50, { label: 'spider' + id });
    const compound = game.matter.body.create({
      parts: [spiderBody, spiderRight, spiderLeft],
      inertia: Infinity,
      render: { sprite: { xOffset: 0, yOffset: 0 } },
    });
    this.velocity = 1;
    const spider = game.matter.add.sprite(0, 0, 'spider');
    spider.setCollisionCategory(0x0001);
    spider.setExistingBody(compound);
    spider.setPosition(x, y);
    spider.setCollidesWith(0x0100);
    this.sprite = spider;
    this.createAnims(game);
    if (armored) {
      this.sprite.anims.play('spiderArmored', true);
    } else {
      this.sprite.anims.play('spider', true);
    }
    this.armored = true;
  }
  public createAnims(game) {
    game.anims.create({
      key: 'spider',
      frames: game.anims.generateFrameNumbers('spider', { start: 0, end: 9 }),
      frameRate: 10,
      repeat: -1,
    });
    game.anims.create({
      key: 'spiderArmored',
      frames: game.anims.generateFrameNumbers('spiderArmored', { start: 0, end: 9 }),
      frameRate: 10,
      repeat: -1,
    });
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
}
export default Spider;
