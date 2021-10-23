import Crate from './crate';
class CompoundCrate {
  sprite: any;
  crates: Set<Crate>;
  onFire: boolean;
  constructor(game, crates: Set<Crate>) {
    this.sprite = game.matter.add.sprite(175, 450, 'house', 0, { label: 'house' });
    this.crates = crates;
    this.onFire = false;
  }
}
export default CompoundCrate;
