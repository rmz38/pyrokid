import CompoundCrate from './compoundCrate';

class Crate {
  sprite: Phaser.Physics.Matter.Sprite;
  onFire: boolean;
  fireSprite: Phaser.GameObjects.Sprite;
  owner: CompoundCrate;
  // timeIgnite: number;
  constructor(x: integer, y: integer, id: integer, game: Phaser.Scene, frame = 0) {
    const rec = game.matter.bodies.rectangle(x, y, 50, 50, {
      label: 'crate' + id,
      inertia: Infinity,
    });
    const crate = game.matter.add.sprite(x, y, 'crate', frame);
    crate.setExistingBody(rec);
    // this.crate.setRectangle(100, 50, {
    //   render: { sprite: { xOffset: 0, yOffset: 0.15 } },
    //   label: label,
    //   inertia: Infinity,
    // });
    crate.setCollisionCategory(0x0100);
    crate.setBounce(0);
    this.sprite = crate;
    this.onFire = false;
    this.fireSprite = null;
    console.log(this.sprite);
    // this.timeIgnite = null;
  }
  public syncFire() {
    if (this.sprite.active) {
      this.fireSprite.x = this.sprite.x;
      this.fireSprite.y = this.sprite.y - 10;
    }
  }
  public destroy() {
    this.sprite.destroy();
  }
}
export default Crate;
