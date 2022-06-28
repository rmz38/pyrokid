import * as Phaser from 'phaser';

const minimumWidth = 10;
const minimumHeight = 50;

export class LevelSelectButton extends Phaser.GameObjects.Rectangle {
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
    super(scene, x, y);
    scene.add.existing(this);
    this.setOrigin(0, 0);
    const padding = haveTopPadding ? 10 : 0;
    this.label = scene.add
      .text(x + 10, y + padding, text)
      .setFontSize(fontSize)
      .setAlign('center')
      .setDepth(3);
    this.setDepth(2);
    scene.add.image(this.x + 20, this.y + 20, 'dirt');
    this.label.scrollFactorX = 0;
    this.label.scrollFactorY = 0;
    this.scrollFactorX = 0;
    this.scrollFactorY = 0;
    this.pressed = false;
    const rectW = w ? w : this.label.width;
    const rectH = h ? h : this.label.height;
    const labelWidth = rectW + 2 * padding;
    const labelHeight = rectH + 2 * padding;

    this.width = labelWidth >= minimumWidth ? labelWidth : minimumWidth;
    // this.height = labelHeight >= minimumHeight ? labelHeight : minimumHeight;
    if (w) {
      this.width = labelWidth;
    } else {
      this.width = labelWidth >= minimumWidth ? labelWidth : minimumWidth;
    }
    if (h) {
      this.height = labelHeight;
    } else {
      this.height = labelHeight >= minimumHeight ? labelHeight : minimumHeight;
    }

    this.setInteractive({ useHandCursor: true })
      .on('pointerover', this.enterMenuButtonHoverState)
      .on('pointerout', this.enterMenuButtonRestState)
      .on('pointerdown', this.enterMenuButtonActiveState);
    // .on('pointerup', this.enterMenuButtonHoverState);

    if (onClick) {
      this.on('pointerup', onClick);
    }

    this.enterMenuButtonRestState();
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
