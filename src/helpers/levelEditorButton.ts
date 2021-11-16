import * as Phaser from 'phaser';
class LevelEditorButton {
  button: any;
  constructor(x: integer, y: integer, text: string, color: string, select: string, game) {
    const button = game.add.text(x, y, text, {
      fill: color,
      backgroundColor: '#777',
      fontSize: 36,
    });
    button.setInteractive();
    button.on('pointerover', () => {
      game.onButton = true;
    });
    button.on('pointerdown', () => {
      game.selected = select;
    });
    button.on('pointerout', () => {
      game.onButton = false;
    });
    button.scrollFactorX = 0;
    button.scrollFactorY = 0;
    button.setDepth(1);
    this.button = button;
  }
}

export default LevelEditorButton;
