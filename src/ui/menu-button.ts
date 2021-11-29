import * as Phaser from 'phaser';

const padding = 10;
const minimumWidth = 10;
const minimumHeight = 50;

export class MenuButton extends Phaser.GameObjects.Rectangle {
  private label: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number, text: string, onClick?: () => void, w?: integer, h?: integer) {
    super(scene, x, y);
    scene.add.existing(this);
    this.setOrigin(0, 0);

    this.label = scene.add
      .text(x + padding, y + padding, text)
      .setFontSize(18)
      .setAlign('center')
      .setDepth(2);
    this.label.scrollFactorX = 0;
    this.label.scrollFactorY = 0;
    this.scrollFactorX = 0;
    this.scrollFactorY = 0;
    const rectW = w ? w : this.label.width;
    const rectH = h ? h : this.label.height;
    const labelWidth = rectW + 2 * padding;
    const labelHeight = rectH + 2 * padding;

    this.width = labelWidth >= minimumWidth ? labelWidth : minimumWidth;
    this.height = labelHeight >= minimumHeight ? labelHeight : minimumHeight;

    this.setInteractive({ useHandCursor: true })
      .on('pointerover', this.enterMenuButtonHoverState)
      .on('pointerout', this.enterMenuButtonRestState)
      .on('pointerdown', this.enterMenuButtonActiveState)
      .on('pointerup', this.enterMenuButtonHoverState);

    if (onClick) {
      this.on('pointerup', onClick);
    }

    this.enterMenuButtonRestState();
  }

  private enterMenuButtonHoverState() {
    this.label.setColor('#000000');
    this.setFillStyle(0x888888);
  }

  private enterMenuButtonRestState() {
    this.label.setColor('#FFFFFF');
    this.setFillStyle(0x888888);
  }

  private enterMenuButtonActiveState() {
    this.label.setColor('#BBBBBB');
    this.setFillStyle(0x444444);
  }
}
