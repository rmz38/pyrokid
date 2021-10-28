class Steel {
  sprite: any;
  hinges: Set<integer>;
  constructor(game: any, x: integer, y: integer) {
    const rec = game.matter.bodies.rectangle(x, y, 50, 50, {
      inertia: Infinity,
    });
    const steel = game.matter.add.image(x, y, 'steelTile');
    steel.setExistingBody(rec);
    steel.setCollisionCategory(0x0100);
    steel.setPosition(x, y);
    this.sprite = steel;
  }
}
export default Steel;
