import * as Phaser from 'phaser';
import { MenuButton } from '../ui/menu-button';
class LevelEditorButton {
  button: any;
  constructor(x: integer, y: integer, text: string, color: string, select: string, game) {
    const button = new MenuButton(
      game,
      x,
      y,
      text,
      () => {
        if (select == 'start') {
          game.generateJson(true);
        } else if (select == 'download') {
          game.generateJson(false);
        } else {
          game.selected = select;
        }
        game.buttons.forEach((e: LevelEditorButton) => {
          e.button.pressed = false;
          e.button.enterMenuButtonRestState();
        });
        this.button.pressed = true;
        this.button.enterMenuButtonActiveState();
      },
      75,
      10,
      10,
    );
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
