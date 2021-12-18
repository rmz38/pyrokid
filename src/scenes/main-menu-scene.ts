import { MenuButton } from '../ui/menu-button';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'MainMenu',
};

/**
 * The initial scene that starts, shows the splash screens, and loads the necessary assets.
 */
export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }
  public preload() {
    this.load.json('leveleditorlevel', 'assets/levels/leveleditor.json');
    // this.load.json('level' + localStorage.getItem('level'), 'assets/levels/' + localStorage.getItem('level') + '.json');
  }
  public create(): void {
    this.add
      .text(100, 50, 'Pyrokid', {
        color: '#FFFFFF',
      })
      .setFontSize(24);
    localStorage.setItem('useleveleditor', 'false');

    new MenuButton(this, 100, 150, 'Level Select', () => {
      localStorage.setItem('useleveleditor', 'false');
      this.scene.start('LevelSelect');
    });

    new MenuButton(this, 100, 250, 'Level Editor', () => {
      // localStorage.setItem('leveleditorlevel', JSON.stringify(this.cache.json.get('leveleditorlevel')));
      localStorage.setItem('upload', 'false');
      this.scene.start('LevelEditor');
    });

    new MenuButton(this, 100, 350, 'Help', () => console.log('help button clicked'));
  }
}
