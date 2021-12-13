class Player {
  sprite: any;
  touchingGround: boolean;
  hittingRight: boolean;
  hittingLeft: boolean;
  constructor(x: integer, y: integer, game: any) {
    const rec = game.matter.bodies.rectangle(0, 21, 10, 1, { isSensor: true, label: 'groundSensor' });
    const recRight = game.matter.bodies.rectangle(16, 0, 10, 42, { isSensor: true, label: 'playerRight' });
    const recLeft = game.matter.bodies.rectangle(-16, 0, 10, 42, { isSensor: true, label: 'playerLeft' });
    const recTop = game.matter.bodies.rectangle(0, -21, 10, 2, { isSensor: true, label: 'playerTop' });
    const playerBody = game.matter.bodies.rectangle(0, 0, 32, 42, { label: 'player' });
    const compound = game.matter.body.create({
      parts: [playerBody, rec, recRight, recLeft, recTop],
      inertia: Infinity,
      label: 'player',
      render: { sprite: { xOffset: 0.5, yOffset: 0.6 } },
    });
    const player = game.matter.add.sprite(0, 0, 'dude', { label: 'player' });
    player.setExistingBody(compound);
    player.setFriction(0);
    player.body.render.sprite.xOffset = 0;
    player.body.render.sprite.yOffset = 0;
    player.setPosition(x, y);
    player.setCollisionCategory(0x0100);
    player.label = 'player';
    this.sprite = player;
    this.createAnims(game);
  }
  public createAnims(game) {
    game.anims.create({
      key: 'left',
      frames: game.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    game.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    game.anims.create({
      key: 'right',
      frames: game.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }
  public moveLeft() {
    this.sprite.setVelocityX(-3);
    this.sprite.anims.play('left', true);
  }
  public moveRight() {
    if (this.hittingRight) {
      this.sprite.setVelocityX(0);
    } else {
      this.sprite.setVelocityX(3);
    }
    this.sprite.anims.play('right', true);
  }
  public turn() {
    this.sprite.setVelocityX(0);
    this.sprite.anims.play('turn');
  }
  public jump() {
    this.sprite.setVelocityY(-7);
    this.touchingGround = false;
  }
  public getX() {
    return this.sprite.body.position.x;
  }
  public getY() {
    return this.sprite.body.position.y;
  }
}
export default Player;
