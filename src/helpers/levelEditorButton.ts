import * as Phaser from 'phaser';
import { MenuButton } from '../ui/menu-button';
class LevelEditorButton {
  button: any;
  constructor(x: integer, y: integer, text: string, color: string, select: string, game) {
    const button = new MenuButton(game, x, y, text, () => {
      if (select == 'download') {
        game.generateJson();
      } else {
        game.selected = select;
      }
    });
    button.on('pointerover', () => {
      game.onButton = true;
    });
    // button.on('pointerdown', () => {
    //   if (select == 'download') {
    //     game.generateJson();
    //   } else {
    //     game.selected = select;
    //   }
    // });
    button.on('pointerout', () => {
      game.onButton = false;
    });
    button.setDepth(1);
    this.button = button;
  }
}

export default LevelEditorButton;
