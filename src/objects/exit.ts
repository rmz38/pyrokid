class Exit {
  sprite: Phaser.Physics.Matter.Sprite;
  constructor(x: integer, y: integer, game: Phaser.Scene) {
    this.sprite = game.matter.add.sprite(x, y, 'exit', null, {
      isSensor: true,
      label: 'exit',
      ignoreGravity: true,
    });
    this.sprite.setDepth(-1);
  }
  public getX() {
    return this.sprite.body.position.x;
  }
  public getY() {
    return this.sprite.body.position.y;
  }
}
export default Exit;
