class Crate {
  crate: any;
  onFire: boolean;
  neighbors: Set<Crate>;
  fireSprite: Phaser.GameObjects.Sprite;

  constructor(game, x: integer, y: integer, label) {
    this.crate = game.matter.add.sprite(x, y, 'crate', null, { label: label });
    this.onFire = false;
    this.neighbors = new Set();
    this.fireSprite = null;
  }
}
export default Crate;
