import Terrain from './terrain';
class Compound {
  blocks: Set<Terrain>;
  onFire: boolean;
  constructor(game: Phaser.Scene, blocks: Set<Terrain>) {
    // this.sprite = game.matter.add.sprite(0, 0, image, 0, { label: label });
    this.blocks = blocks;
    // const crateBodies = [];
    const test = [];
    blocks.forEach((e) => {
      // crateBodies.push(e.sprite);
      e.owner = this;
      test.push(e.sprite.body);
    });
    this.onFire = false;
  }
}
export default Compound;
