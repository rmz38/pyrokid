class Player {
  player: any;
  touchingGround: boolean;
  constructor(game: any) {
    const rec = game.matter.bodies.rectangle(0, 24, 20, 1, { isSensor: true, label: 'groundSensor' });
    game.matter.world.setBounds(0, 0, 800, 600, 32, true, true, false, true);
    // platforms = this.matter.add.sprite(400, 568, 'ground');

    const playerBody = game.matter.bodies.rectangle(0, 0, 32, 48);
    const compound = game.matter.body.create({
      parts: [playerBody, rec],
      inertia: Infinity,
      render: { sprite: { xOffset: 0.5, yOffset: 0.5 } },
    });
    const player = game.matter.add.sprite(0, 0, 'dude');
    player.setExistingBody(compound);
    player.body.render.sprite.xOffset = 0;
    player.body.render.sprite.yOffset = 0;
    player.setPosition(100, 450);
    this.player = player;
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
    this.player.setVelocityX(-7);
    this.player.anims.play('left', true);
  }
  public moveRight() {
    this.player.setVelocityX(7);
    this.player.anims.play('right', true);
  }
  public turn() {
    this.player.setVelocityX(0);
    this.player.anims.play('turn');
  }
  public jump() {
    this.player.setVelocityY(-10);
    this.touchingGround = false;
  }
  public getX() {
    return this.player.body.position.x;
  }
  public getY() {
    return this.player.body.position.y;
  }
}
export default Player;
