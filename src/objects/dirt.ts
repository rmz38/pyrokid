import Terrain from './terrain';
class Dirt extends Terrain {
  constructor(x: integer, y: integer, game: Phaser.Scene, frame: integer) {
    super();
    const sprite = game.matter.add.sprite(x, y, 'dirt', frame, { isStatic: true, label: 'dirt' });
    sprite.setPosition(x, y);
    sprite.setStatic(true);
    sprite.setCollisionCategory(0x0100);
    sprite.setBounce(0);
    sprite.setFriction(1);
    sprite.setFrictionStatic(1);
    sprite.setName('dirt');
    this.sprite = sprite;
  }
}
export default Dirt;
