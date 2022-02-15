import { GameScene } from '../scenes/game-scene';
import Exit from './exit';
class Bomb {
  sprite: Phaser.Physics.Matter.Sprite;
  constructor(x: integer, y: integer, id: integer, game: Phaser.Scene) {
    const rec = game.matter.bodies.rectangle(0, 0, 35, 35, {
      label: 'bomb' + id,
      inertia: Infinity,
    });
    const bombTop = game.matter.bodies.rectangle(0, -17, 10, 2, { isSensor: true, label: 'bomb' + id });
    const compound = game.matter.body.create({
      parts: [rec, bombTop],
      inertia: Infinity,
      label: 'bomb' + id,
      render: { sprite: { xOffset: 0.5, yOffset: 0.5 } },
    });
    this.sprite = game.matter.add.sprite(x, y, 'bomb', null, {
      label: 'bomb' + id,
    });
    this.sprite.setExistingBody(compound);
    this.sprite.setPosition(x, y);
    //collides with lizardcollisionsensors and normal blocks
    this.sprite.setCollisionCategory(0x100000);
    this.sprite.setCollidesWith(0x1100);
    this.sprite.setFixedRotation();
    this.sprite.setBounce(0);
  }
  public makeExit(game: GameScene) {
    if (this.sprite.active) {
      new Exit(this.sprite.x, this.sprite.y, game);
      const explosion = game.add.sprite(this.sprite.x, this.sprite.y, 'explosion');
      explosion.anims.play('explosion');
      this.sprite.destroy();
    }
    //TODO: PLAY EXPLOSION ANIMATION
  }
}
export default Bomb;
