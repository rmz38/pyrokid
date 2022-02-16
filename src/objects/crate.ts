import { GameScene } from '../scenes/game-scene';
import CompoundCrate from './compoundCrate';
import Connector from './connector';

class Crate {
  sprite: Phaser.Physics.Matter.Sprite;
  onFire: boolean;
  fireSprite: Phaser.GameObjects.Sprite;
  owner: CompoundCrate;
  connectors: Set<Connector>;
  isLava: boolean;
  // timeIgnite: number;
  constructor(x: integer, y: integer, id: integer, game: Phaser.Scene, frame = 0, isLava: boolean) {
    const rec = game.matter.bodies.rectangle(x, x, 50, 50, {
      label: 'crate' + id,
      inertia: Infinity,
    });
    const recBottom = game.matter.bodies.rectangle(0, 25, 50, 1, {
      label: 'crate' + id + 'bottom',
      // label: 'bottom',
      inertia: Infinity,
      isSensor: true,
    });
    const compoundBody = game.matter.body.create({
      parts: [rec, recBottom],
      inertia: Infinity,
      render: { sprite: { xOffset: 0.5, yOffset: 0.5 } },
      // isStatic: true,
      ignoreGravity: false,
      // frictionStatic: 1.0,
      // friction: 1.0,
    });
    const imageString = isLava ? 'lava' : 'crate';
    const crate = game.matter.add.sprite(x, y, imageString, frame);
    crate.setExistingBody(rec);
    crate.setPosition(x, y);
    // this.crate.setRectangle(100, 50, {
    //   render: { sprite: { xOffset: 0, yOffset: 0.15 } },
    //   label: label,
    //   inertia: Infinity,
    // });
    crate.setCollisionCategory(0x0100);
    crate.setBounce(0);
    crate.setFriction(0);
    crate.setDensity(0.0001);
    // crate.setFrictionStatic(100);
    this.sprite = crate;
    this.onFire = false;
    this.fireSprite = null;
    this.connectors = new Set<Connector>();
    this.isLava = isLava;
    // this.timeIgnite = null;
  }
  public syncFire() {
    if (this.sprite.active) {
      this.fireSprite.x = this.sprite.x;
      this.fireSprite.y = this.sprite.y - 10;
    }
  }
  public destroy(game: GameScene) {
    if (!this.isLava) {
      this.sprite.destroy();
      this.connectors.forEach((e) => {
        e.destroy(game);
      });
    }
  }
}
export default Crate;
