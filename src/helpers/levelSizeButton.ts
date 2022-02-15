import { MenuButton } from '../ui/menu-button';
class LevelSizeButton {
  button: any;
  value: number;
  constructor(x: integer, y: integer, type: 'width' | 'height', game) {
    function handleUpload(e) {
      localStorage.setItem('upload', 'true');
      const reader = new FileReader();
      reader.readAsText(e.target.files[0]);
      reader.onload = function (json) {
        localStorage.setItem('leveleditorlevel', JSON.stringify(json.target.result));
        game.scene.restart();
      };
    }
    const loader = document.getElementById('levelLoader');
    loader.addEventListener('change', handleUpload, false);
    const button = new MenuButton(
      game,
      x + 20,
      y,
      type + ':' + game[type],
      () => {
        game.generateJson(false, true);
      },
      50,
      10,
      10,
    );
    const up = new MenuButton(
      game,
      x,
      y,
      '+',
      () => {
        game[type] += 1;
        button.label.text = type + ':' + game[type];
      },
      20,
      20,
      10,
      false,
    );
    const down = new MenuButton(
      game,
      x,
      y + 10,
      '-',
      () => {
        game[type] -= 1;
        button.label.text = type + ':' + game[type];
      },
      20,
      20,
      10,
      false,
    );
    button.on('pointerover', () => {
      game.onButton = true;
    });
    button.on('pointerout', () => {
      game.onButton = false;
    });
    up.on('pointerover', () => {
      game.onButton = true;
    });
    up.on('pointerout', () => {
      game.onButton = false;
    });
    down.on('pointerover', () => {
      game.onButton = true;
    });
    down.on('pointerout', () => {
      game.onButton = false;
    });
    up.setDepth(1);
    down.setDepth(1);
    button.setDepth(1);
    this.button = button;
  }
}

export default LevelSizeButton;
