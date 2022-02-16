import Crate from './crate';
class CompoundCrate {
  crates: Set<Crate>;
  onFire: boolean;
  constructor(game: Phaser.Scene, crates: Set<Crate>, label: string) {
    // this.sprite = game.matter.add.sprite(0, 0, image, 0, { label: label });
    this.crates = crates;
    // const crateBodies = [];
    const test = [];
    crates.forEach((e) => {
      // crateBodies.push(e.sprite);
      e.owner = this;
      // test.push(e.sprite.body);
    });
    // const yOffset = image == 'crate' ? 0.15 : 0;

    // const compoundBody = game.matter.body.create({
    //   parts: test,
    //   inertia: Infinity,
    //   // render: { sprite: { xOffset: 0, yOffset: yOffset } },
    //   // isStatic: true,
    //   ignoreGravity: false,
    //   // frictionStatic: 1.0,
    //   // friction: 1.0,
    // });

    //TODO new way to create bodies
    // const rt = game.make.renderTexture({ width: 500, height: 50 }, false);
    // // game.make.image({ width: 50, height: 50, key: 'crate', frame: '2' });
    // const crate = game.make.image({ width: 50, height: 50, key: 'crate', frame: '2' }, false);
    // // const body =
    // const texture = rt.draw(crate, 50, 25);
    // texture.saveTexture('experiment');
    // const experiment = game.matter.add.image(350, 200, 'experiment');
    // experiment.setFixedRotation();

    // const sprite = game.matter.add.sprite(100, 100, 'crate');
    // sprite.setExistingBody(compoundBody);
    // sprite.setCollisionCategory(0x0100);
    // this.sprite.setExistingBody(compoundBody);
    // this.sprite.setCollisionCategory(0x0100);

    // this.sprite.body.render.sprite.xOffset = 0;
    // this.sprite.body.render.sprite.yOffset = -10;
    // this.sprite.setPosition(x, y);
    this.onFire = false;
  }
}
export default CompoundCrate;
