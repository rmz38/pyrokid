import Crate from './crate';
class CompoundCrate {
  sprite: any;
  crates: Set<Crate>;
  onFire: boolean;
  constructor(game: Phaser.Scene, crates: Set<Crate>, label: string) {
    // this.sprite = game.matter.add.sprite(0, 0, image, 0, { label: label });
    this.crates = crates;
    // const crateBodies = [];
    crates.forEach((e) => {
      // crateBodies.push(e.sprite);
      e.owner = this;
    });
    // const yOffset = image == 'crate' ? 0.15 : 0;
    // const compoundBody = game.matter.body.create({
    //   parts: crateBodies,
    //   inertia: Infinity,
    //   // render: { sprite: { xOffset: 0, yOffset: yOffset } },
    //   // isStatic: true,
    //   ignoreGravity: false,
    //   // frictionStatic: 1.0,
    //   // friction: 1.0,
    // });
    // this.sprite.setExistingBody(compoundBody);
    // this.sprite.setCollisionCategory(0x0100);

    // this.sprite.body.render.sprite.xOffset = 0;
    // this.sprite.body.render.sprite.yOffset = -10;
    // this.sprite.setPosition(x, y);
    this.onFire = false;
  }
}
export default CompoundCrate;
