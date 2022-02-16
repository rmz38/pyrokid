class Player {
  sprite: Phaser.Physics.Matter.Sprite;
  touchingGround: boolean;
  hittingRight: boolean;
  hittingLeft: boolean;
  constructor(x: integer, y: integer, game: any) {
    const rec = game.matter.bodies.rectangle(0, 21, 10, 1, { isSensor: true, label: 'groundSensor' });
    const recRight = game.matter.bodies.rectangle(16, -2, 15, 25, { isSensor: true, label: 'playerRight' });
    const recLeft = game.matter.bodies.rectangle(-16, -2, 15, 25, { isSensor: true, label: 'playerLeft' });
    const recTop = game.matter.bodies.rectangle(0, -15, 10, 5, { isSensor: true, label: 'playerTop' });
    const playerBody = game.matter.bodies.rectangle(0, 0, 20, 30, { label: 'player' });
    const compound = game.matter.body.create({
      parts: [playerBody, rec, recRight, recLeft, recTop],
      inertia: Infinity,
      label: 'player',
      render: { sprite: { xOffset: 0.5, yOffset: 0.6 } },
    });
    const player = game.matter.add.sprite(0, 0, 'player', { label: 'player' });
    player.setExistingBody(compound);
    player.setFriction(0);
    player.body.render.sprite.xOffset = 0;
    player.body.render.sprite.yOffset = 0;
    player.setPosition(x, y);
    player.setCollisionCategory(0x1000);
    player.setCollidesWith(0x1100);
    player.label = 'player';
    this.sprite = player;
    this.hittingLeft = false;
    this.hittingRight = false;
  }
  public moveLeft() {
    if (this.hittingLeft) {
      this.sprite.setVelocityX(0);
    } else {
      this.sprite.setVelocityX(-3);
    }
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
    const currAnim = this.sprite.anims.getName().toLowerCase();
    if (currAnim.includes('jump')) {
      return;
    } else if (currAnim.includes('left')) {
      this.sprite.anims.play('turnLeft');
    } else {
      this.sprite.anims.play('turnRight');
    }
  }
  public shoot(direction: 'right' | 'left' | 'none') {
    const currAnim = this.sprite.anims.getName().toLowerCase();
    if (direction == 'left') {
      this.sprite.anims.play('shootLeft');
    } else if (direction == 'right') {
      this.sprite.anims.play('shootRight');
    } else {
      if (currAnim.includes('left')) {
        this.sprite.anims.play('shootLeft');
      } else {
        this.sprite.anims.play('shootRight');
      }
    }
  }

  public jump() {
    this.sprite.setVelocityY(-9);
    this.touchingGround = false;
    // const currAnim = this.sprite.anims.getName().toLowerCase();
    // if (currAnim.includes('left')) {
    //   this.sprite.anims.play('jumpLeft', true);
    // } else {
    //   this.sprite.anims.play('jumpRight', true);
    // }
  }
  public getX() {
    return this.sprite.body.position.x;
  }
  public getY() {
    return this.sprite.body.position.y;
  }
}
export default Player;
