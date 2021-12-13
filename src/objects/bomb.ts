import Exit from './exit';
class Bomb {
  sprite: Phaser.Physics.Matter.Sprite;
  constructor(x: integer, y: integer, id: integer, game: Phaser.Scene) {
    this.sprite = game.matter.add.sprite(x, y, 'bomb', null, {
      label: 'bomb' + id,
    });
    this.sprite.setCollisionCategory(0x10000);
    this.sprite.setCollidesWith(0x0100);
  }
  public makeExit(game) {
    if (this.sprite.active) {
      this.sprite.destroy;
      new Exit(this.sprite.x, this.sprite.y, game);
    }
    //TODO: PLAY EXPLOSION ANIMATION
  }
}
export default Bomb;
