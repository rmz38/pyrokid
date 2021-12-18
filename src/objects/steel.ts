class Steel {
  sprite: any;
  hinges: Set<integer>;
  constructor(x: integer, y: integer, game: Phaser.Scene, frame: integer) {
    const rec = game.matter.bodies.rectangle(x, y, 50, 50, {
      inertia: Infinity,
      label: 'steel',
    });
    const steel = game.matter.add.sprite(x, y, 'steel', frame, { label: 'steel' });
    steel.setExistingBody(rec);
    steel.setCollisionCategory(0x0100);
    steel.setPosition(x, y);
    steel.setBounce(0);
    this.sprite = steel;
    console.log(steel);
  }
}
export default Steel;
