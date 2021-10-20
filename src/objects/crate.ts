class Crate {
  crate: any;
  onFire: boolean;
  neighbors: Set<Crate>;
  fireSprite: Phaser.GameObjects.Sprite;

  constructor(game) {
    this.crate = null;
  }
}
export default Crate;
