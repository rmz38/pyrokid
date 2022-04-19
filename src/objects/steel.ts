import Terrain from './terrain';
class Steel extends Terrain {
  constructor(x: integer, y: integer, game: Phaser.Scene, frame: integer) {
    super();
    const rec = game.matter.bodies.rectangle(x, y, 50, 50, {
      inertia: Infinity,
      label: 'steel',
    });
    const steel = game.matter.add.sprite(x, y, 'steel', frame, { label: 'steel' });
    steel.setExistingBody(rec);
    steel.setCollisionCategory(0x0100);
    steel.setPosition(x, y);
    steel.setBounce(0);
    steel.setName('steel filler');
    this.sprite = steel;
  }
}
export default Steel;
