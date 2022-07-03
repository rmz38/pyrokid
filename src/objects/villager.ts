import Enemy from './enemy';
class Villager extends Enemy {
  armored: boolean;
  constructor(x: integer, y: integer, game: Phaser.Scene, id: integer) {
    super();
    const villagerBody = game.matter.bodies.rectangle(0, 0, 35, 40, { label: 'villager' + id });

    this.collisionSensor = game.matter.add.sprite(0, 0, 'villager', null, {
      isSensor: true,
      label: 'villager' + id,
      ignoreGravity: true,
    });
    this.collisionSensor.setCollisionCategory(0x1000);
    this.collisionSensor.setCollidesWith(0x1000);
    this.collisionSensor.alpha = 0;
    // this.collisionSensor.scaleX = 0.7;
    // this.collisionSensor.scaleY = 0.8;

    const compound = game.matter.body.create({
      parts: [villagerBody],
      inertia: Infinity,
      render: { sprite: { xOffset: 0.0, yOffset: 0.0 } },
    });
    const villager = game.matter.add.sprite(0, 0, 'villager' + (Math.floor(Math.random() * 3) + 1));
    villager.setCollisionCategory(0x0001);
    villager.setExistingBody(compound);
    villager.setPosition(x, y);
    villager.setCollidesWith(0x0100);
    villager.setFriction(0.0);
    this.sprite = villager;
  }
}
export default Villager;
