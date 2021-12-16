import { BodyType, ConstraintType } from 'matter';
import { GameScene } from '../scenes/game-scene';
import { MainMenuScene } from '../scenes/main-menu-scene';
import Crate from './crate';

class Connector {
  sprite: Phaser.Physics.Matter.Image;
  constraint: MatterJS.Constraint;
  connectorPin: MatterJS.Constraint;
  constructor(obj1: any, obj2: any, game: GameScene) {
    const x1 = obj1.sprite.x;
    const x2 = obj2.sprite.x;
    const y1 = obj1.sprite.y;
    const y2 = obj2.sprite.y;
    const posx = (Math.max(x2, x1) - Math.min(x2, x1)) / 2;
    const posy = (Math.max(y2, y1) - Math.min(y2, y1)) / 2;
    const connector = game.matter.add.image(x2 + (x1 - x2) / 2, y2 + (y1 - y2) / 2, 'connector', null, {
      isSensor: true,
      ignoreGravity: true,
    });
    this.constraint = game.matter.add.joint(obj1.sprite.body, obj2.sprite.body, 0, 1, {
      pointA: { x: (x2 - x1) / 2, y: (y2 - y1) / 2 },
      pointB: { x: (x1 - x2) / 2, y: (y1 - y2) / 2 },
      angularStiffness: 1,
      stiffness: 1,
      damping: 1,
    });
    if (x2 - x1 == 0) {
      connector.angle = 90;
    }
    this.connectorPin = game.matter.add.joint(obj1.sprite.body, connector.body as BodyType, 0, 1, {
      pointA: { x: 0, y: 0 },
      pointB: { x: (x1 - x2) / 2, y: (y1 - y2) / 2 },
      angularStiffness: 1,
      stiffness: 1,
      damping: 1,
    });
    this.sprite = connector;
    if (obj1 instanceof Crate) {
      obj1.connectors.add(this);
    }
    if (obj2 instanceof Crate) {
      obj2.connectors.add(this);
    }
  }
  public destroy(game: GameScene): void {
    this.sprite.destroy();
    game.matter.world.removeConstraint(this.constraint as ConstraintType);
    game.matter.world.removeConstraint(this.connectorPin as ConstraintType);
  }
}
export default Connector;
