import { connectorBlocks } from '../helpers/init';
import { GameScene } from '../scenes/game-scene';
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
  public setAllGrounded(game: GameScene) {
    this.blocks.forEach((block) => {
      block.setGrounded();
    });
    this.getConnected(game).forEach((connectedBlock) => {
      connectedBlock.setGrounded();
    });
  }
  public setAboveDynamic(game: GameScene) {
    this.blocks.forEach((block) => {
      block.setGrounded();
    });
  }
  public getConnected(game: GameScene) {
    const connectedBlocks = new Set<Terrain>();
    this.blocks.forEach((block: Terrain) => {
      block.getConnected(connectedBlocks, game).forEach((e) => {
        connectedBlocks.add(e);
      });
    });
    return connectedBlocks;
  }
}
export default Compound;
