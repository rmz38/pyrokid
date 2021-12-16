import Exit from './exit';
class Bomb {
  sprite: Phaser.Physics.Matter.Sprite;
  constructor(x: integer, y: integer, id: integer, game: Phaser.Scene) {
    this.sprite = game.matter.add.sprite(x, y, 'bomb', null, {
      label: 'bomb' + id,
    });
    //collides with lizardcollisionsensors and normal blocks
    this.sprite.setCollisionCategory(0x100000);
    this.sprite.setCollidesWith(0x1100);
    this.sprite.setFixedRotation();
    this.sprite.setBounce(0);
  }
  public makeExit(game) {
    if (this.sprite.active) {
      new Exit(this.sprite.x, this.sprite.y, game);
      this.sprite.destroy();
    }
    //TODO: PLAY EXPLOSION ANIMATION
  }
}
export default Bomb;
