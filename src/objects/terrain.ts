import { getTileCenter } from '../helpers';
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
      this.sprite.setTint(0xff0000);
    }
  }
}
export default Terrain;
