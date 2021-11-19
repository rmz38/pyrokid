class Dirt {
  sprite: any;
  constructor(x: integer, y: integer, game: Phaser.Scene, frame: integer) {
    console.log(game);
    const sprite = game.matter.add.sprite(x, y, 'dirt', frame, { isStatic: true });
    sprite.setPosition(x, y);
    sprite.setStatic(true);
    sprite.setCollisionCategory(0x0100);
    this.sprite = sprite;
  }
}
export default Dirt;
