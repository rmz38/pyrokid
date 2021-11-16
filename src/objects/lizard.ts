class Lizard {
  sprite: any;
  onFire: boolean;
  fireSprite: any;
  velocity: integer;
  spiderSensor: any;
  constructor(game: any) {
    const lizRight = game.matter.bodies.rectangle(37, 0, 10, 10, { isSensor: true, label: 'lizardTurnSensor' });
    const lizLeft = game.matter.bodies.rectangle(-37, 0, 10, 10, { isSensor: true, label: 'lizardTurnSensor' });
    const lizardBody = game.matter.bodies.rectangle(0, 0, 70, 50, { label: 'lizard' });
    // const spiderSensor = game.matter.bodies.rectangle(0, 0, 70, 50, { label: 'lizard' });
    const compound = game.matter.body.create({
      parts: [lizardBody, lizRight, lizLeft],
      inertia: Infinity,
      render: { sprite: { xOffset: 0, yOffset: 0 } },
    });
    this.velocity = 1;
    const lizard = game.matter.add.sprite(0, 0, 'lizard');
    lizard.setExistingBody(compound);
    lizard.setPosition(150, 500);
    lizard.setCollisionCategory(0x001);
    lizard.setCollidesWith(0x0100);
    console.log(lizard);
    console.log(lizLeft);
    lizLeft.collisionFilter.category = 0x0100;
    this.sprite = lizard;
    this.createAnims(game);
    this.sprite.anims.play('lizard', true);
    this.onFire = false;
    this.fireSprite = null;
  }
  public createAnims(game) {
    game.anims.create({
      key: 'lizard',
      frames: game.anims.generateFrameNumbers('lizard', { start: 0, end: 29 }),
      frameRate: 30,
      repeat: -1,
    });
  }
  public flip(game) {
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
}
export default Lizard;
