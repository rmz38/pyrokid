import * as Phaser from 'phaser';
import { MenuButton } from './menu-button';

const minimumWidth = 10;
const minimumHeight = 50;

export class LevelSelectButton extends MenuButton {
  public label: Phaser.GameObjects.Text;
  public pressed: boolean;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    onClick?: () => void,
    w?: integer,
    h?: integer,
    fontSize = 18,
    haveTopPadding = true,
  ) {
    super(scene, x, y, text, onClick, w, h, fontSize, haveTopPadding);
    scene.add.image(this.x + 20, this.y + 20, 'dirt');
  }

  public enterMenuButtonHoverState() {
    if (!this.pressed) {
      this.label.setColor('#000000');
      this.setFillStyle(0x888888, 0);
    }
  }

  public enterMenuButtonRestState() {
    if (!this.pressed) {
      this.label.setColor('#FFFFFF');
      this.setFillStyle(0x888888, 0);
    }
  }

  public enterMenuButtonActiveState() {
    this.pressed = true;
    this.label.setColor('#BBBBBB');
    this.setFillStyle(0x444444, 0);
  }
}
