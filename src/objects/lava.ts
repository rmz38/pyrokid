class Lava {
  sprite: any;
  onFire: boolean;
  fireSprite: any;
  hinges: Set<integer>;
  constructor(game: any, x: integer, y: integer) {
    const rec = game.matter.bodies.rectangle(x, y, 50, 50, {
      inertia: Infinity,
      isStatic: true,
      label: 'lava',
    });
    const lava = game.matter.add.image(x, y, 'lavaTile', { label: 'lava' });
    lava.setExistingBody(rec);
    lava.setCollisionCategory(0x0100);
    lava.setPosition(x, y);
    this.sprite = lava;
  }
  public ignite(game) {
    if (this.onFire) {
      return;
    }
    this.onFire = true;
    this.fireSprite = game.add.sprite(this.sprite.x, this.sprite.y, 'squareFire');
    this.fireSprite.play('squareFire', false);
    this.fireSprite.alpha = 0.7;
    this.fireSprite.y = this.sprite.y - 10;
  }
}
export default Lava;
