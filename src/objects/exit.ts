class Exit {
  sprite: Phaser.Physics.Matter.Sprite;
  constructor(x: integer, y: integer, game: Phaser.Scene) {
    const circle = game.matter.bodies.circle(x, y, 20, {
      isSensor: true,
      label: 'exit',
      ignoreGravity: true,
    });
    this.sprite = game.matter.add.sprite(x, y, 'exit', null, {
      isSensor: true,
      label: 'exit',
      ignoreGravity: true,
    });
    this.sprite.setExistingBody(circle);
    this.sprite.setDepth(-1);
    this.sprite.setCollisionCategory(0x0100);
  }
  public getX() {
    return this.sprite.body.position.x;
  }
  public getY() {
    return this.sprite.body.position.y;
  }
}
export default Exit;
