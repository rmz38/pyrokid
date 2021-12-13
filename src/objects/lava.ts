function getTile(x: number, y: number) {
  return [Math.floor(x / 50), Math.floor(y / 50)];
}
class Lava {
  sprite: any;
  onFire: boolean;
  fireSprite: any;
  hinges: Set<integer>;
  constructor(x: integer, y: integer, game: any, frame: integer, id: integer) {
    const rec = game.matter.bodies.rectangle(x, y, 50, 50, {
      inertia: Infinity,
      isStatic: true,
      label: 'lava' + id,
    });
    const lava = game.matter.add.sprite(x, y, 'lava', frame, { label: 'lava' + id });
    lava.setExistingBody(rec);
    lava.setCollisionCategory(0x0100);
    lava.setPosition(x, y);
    this.sprite = lava;
  }
  public ignite(game, tiles, xTiles, yTiles) {
    if (this.onFire) {
      return;
    }
    this.onFire = true;
    this.fireSprite = game.add.sprite(this.sprite.x, this.sprite.y, 'squareFire');
    this.fireSprite.play('squareFire', false);
    this.fireSprite.alpha = 0.7;
    this.fireSprite.y = this.sprite.y - 10;
    const pos = getTile(this.sprite.x, this.sprite.y);
    const x = pos[0];
    const y = pos[1];
    const candidates = [
      [x - 1, y],
      [x + 1, y],
      [x, y + 1],
      [x, y - 1],
    ];
    for (let i = 0; i < candidates.length; i++) {
      const x = candidates[i][0];
      const y = candidates[i][1];
      if (x >= 0 && x < xTiles && y >= 0 && y < yTiles) {
        tiles[x][y].forEach((e) => {
          // if (e instanceof Crate) {
          //   igniteCompound(game, e.owner, false);
          // } else {
          //TODO: MAKE IGNITE COMPOUND IN UTILS FUNCTION
          if (e instanceof Lava) {
            e.ignite(game, tiles, xTiles, yTiles);
          } else {
            // TODO: ignite crates
            // e.ignite
          }
          // }
        });
      }
    }
  }
}
export default Lava;
