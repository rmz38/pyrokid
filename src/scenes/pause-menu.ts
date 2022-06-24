import { MenuButton } from '../ui/menu-button';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'PauseMenu',
};

let keys;
export class PauseMenu extends Phaser.Scene {
  graphics: Phaser.GameObjects.Graphics;
  constructor() {
    super(sceneConfig);
  }
  public create() {
    keys = this.input.keyboard.addKeys('ESC');
    this.graphics = this.add.graphics();
    this.graphics.depth = -1;
    const graphics = this.graphics;
    graphics.clear();
    graphics.fillStyle(0x000000, 0.7);
    graphics.lineStyle(2, 0xffffff, 0.75);
    graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
    graphics.strokeRect(0, 0, this.cameras.main.width, this.cameras.main.height);
    this.add
      .text(200, 50, 'Paused', {
        color: '#FFFFFF',
      })
      .setFontSize(48);
    this.graphics = this.add.graphics();
    this.graphics.depth = 2;
    new MenuButton(this, 200, 150, 'Back to Menu', () => {
      this.scene.stop('Game');
      this.scene.start('MainMenu');
    });
    new MenuButton(this, 200, 300, 'Open in Editor', () => {
      localStorage.setItem('upload', 'true');
      this.scene.stop('Game');
      this.scene.start('LevelEditor');
    });
  }
  //   let preset =
  //       localStorage.getItem('upload') == 'true'
  //         ? JSON.parse(localStorage.getItem('leveleditorlevel'))
  //         : this.cache.json.get('leveleditorlevel');
  public update() {
    if (keys.ESC.isDown) {
      this.scene.resume('Game');
      this.scene.stop();
    }
  }
}
