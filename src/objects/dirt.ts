class Dirt {
  sprite: any;
  constructor(game: any, x :integer, y: integer) {
    const sprite = game.matter.add.image(x, y, 'dirtTile', { isStatic: true });
    sprite.setPosition(x, y);
    sprite.setStatic(true);
    sprite.setCollisionCategory(0x0100);
    this.sprite = sprite;
  }
}
export default Dirt;
