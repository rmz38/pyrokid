import Compound from './compound';

class Terrain {
  sprite: Phaser.Physics.Matter.Sprite;
  //neighboring blocks (kinda like nodes) to check if connected with a hinge
  up: Terrain;
  down: Terrain;
  left: Terrain;
  right: Terrain;
  owner: Compound;
}
export default Terrain;
