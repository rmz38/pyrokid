import { ReadStream } from 'fs';
import * as Phaser from 'phaser';
import { game } from '../main';
import { GameScene } from '../scenes/game-scene';
import { MenuButton } from './menu-button';
// function handleUpload(e) {
//   const reader = new FileReader();
//   reader.readAsText(e.target.files[0]);
//   reader.onload = function (json) {
//     localStorage.set('leveleditorlevel', JSON.parse(JSON.stringify(json)));
//   };
// }
// const loader = document.getElementById('levelLoader');
// loader.addEventListener('change', handleUpload, false);
let lock = false; // to make sure stuff doesn't get triggered multiple times
class LevelEditorButton {
  button: any;
  constructor(x: integer, y: integer, text: string, color: string, select: string, game) {
    function handleUpload(e) {
      if (lock) {
        return;
      }
      lock = true;
      localStorage.setItem('upload', 'true');
      console.log('Handling upload');
      const reader = new FileReader();
      reader.readAsText(e.target.files[0]);

      const onLevelLoad = function (json) {
        localStorage.setItem('leveleditorlevel', JSON.parse(JSON.stringify(json.target.result)));
        console.log('onload complete');
        e.target.value = '';
        lock = false;
        game.scene.restart();
      };
      reader.onload = onLevelLoad;
    }
    const loader = document.getElementById('levelLoader');
    loader.addEventListener('change', handleUpload, false);
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
        } else if (select == 'upload') {
          loader.click();
        } else {
          game.selected = select;
        }
        game.buttons.forEach((e: LevelEditorButton) => {
          e.reset();
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
  public reset() {
    this.button.pressed = false;
    this.button.enterMenuButtonRestState();
  }
}

export default LevelEditorButton;
