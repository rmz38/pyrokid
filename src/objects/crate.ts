import { GameScene } from '../scenes/game-scene';
import Connector from './connector';
import Terrain from './terrain';

class Crate extends Terrain {
  // sprite: Phaser.Physics.Matter.Sprite;
  onFire: boolean;
  fireSprite: Phaser.GameObjects.Sprite;
  connectors: Set<Connector>;
  isLava: boolean;
  // timeIgnite: number;
  constructor(x: integer, y: integer, id: integer, game: Phaser.Scene, frame = 0, isLava: boolean) {
    super();
    const rec = game.matter.bodies.rectangle(x, y, 50, 50, {
      label: 'crate' + id,
      inertia: Infinity,
    });
    const imageString = isLava ? 'lava' : 'crate';
    const crate = game.matter.add.sprite(x, y, imageString, frame);
    crate.setExistingBody(rec);
    // this.crate.setRectangle(100, 50, {
    //   render: { sprite: { xOffset: 0, yOffset: 0.15 } },
    //   label: label,
    //   inertia: Infinity,
    // });
    crate.setCollisionCategory(0x0100);
    crate.setBounce(0);
    crate.setFriction(1);
    crate.setFrictionStatic(100);
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
    if (!this.isLava && this.sprite.active) {
      this.sprite.destroy();
      this.connectors.forEach((e) => {
        e.destroy(game);
      });
    }
  }
}
export default Crate;
