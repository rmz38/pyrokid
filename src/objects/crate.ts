import CompoundCrate from './compoundCrate';

class Crate {
  crate: any; // not sprite
  onFire: boolean;
  neighbors: Set<Crate>;
  fireSprite: Phaser.GameObjects.Sprite;
  owner: CompoundCrate;
  // timeIgnite: number;
  constructor(game, x: integer, y: integer, label, owner: CompoundCrate) {
    this.crate = game.matter.bodies.rectangle(x, y, 50, 50, {
      render: { sprite: { xOffset: 0, yOffset: 0.15 } },
      label: label,
      inertia: Infinity,
    });
    // this.crate.setRectangle(100, 50, {
    //   render: { sprite: { xOffset: 0, yOffset: 0.15 } },
    //   label: label,
    //   inertia: Infinity,
    // });
    this.crate.bounce = 0;
    this.onFire = false;
    this.neighbors = new Set();
    this.fireSprite = null;
    this.owner = owner;
    console.log(this.crate);
    // this.timeIgnite = null;
  }
  public syncFire() {
    this.fireSprite.x = this.crate.position.x;
    this.fireSprite.y = this.crate.position.y - 10;
  }
}
export default Crate;
