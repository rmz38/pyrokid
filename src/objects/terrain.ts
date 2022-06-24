import { getTileCenter } from '../helpers';
import { connectorBlocks } from '../helpers/init';
import { game } from '../main';
import { GameScene } from '../scenes/game-scene';
import Compound from './compound';

class Terrain {
  sprite: Phaser.Physics.Matter.Sprite;
  //neighboring blocks (kinda like nodes) to check if connected with a hinge
  up: Terrain;
  down: Terrain;
  left: Terrain;
  right: Terrain;
  owner: Compound;
  public setGrounded(): void {
    if (this.sprite.active && !this.sprite.isStatic()) {
      this.sprite.setStatic(true);
      const [px, py] = getTileCenter(this.sprite.x, this.sprite.y);
      this.sprite.setPosition(px, py);
      //to debug
      // this.sprite.setTint(0xff0000);
    }
  }
  public getConnected(connectedBlocks: Set<Terrain>, game: GameScene) {
    const directions = ['left', 'right', 'up', 'down'];
    // const connected: Set<Terrain> = new Set<Terrain>();
    if (this.sprite.name == 'dirt') {
      return connectedBlocks;
    }
    for (let i = 0; i < directions.length; i++) {
      const dir = directions[i];
      if (
        this[dir] &&
        this[dir].sprite.active &&
        !connectedBlocks.has(this[dir]) &&
        !this.owner.blocks.has(this[dir]) &&
        !game.destroyQueue.has(this[dir])
      ) {
        this[dir].owner.blocks.forEach((ownedBlock: Terrain) => {
          connectedBlocks.add(ownedBlock);
          ownedBlock.getConnected(connectedBlocks, game);
        });
      }
    }
    return connectedBlocks;
  }
}
export default Terrain;
