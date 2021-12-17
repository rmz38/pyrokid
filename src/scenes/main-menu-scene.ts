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
  // public preload() {}
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
      this.scene.start('LevelEditor');
    });

    new MenuButton(this, 100, 350, 'Help', () => console.log('help button clicked'));
  }
}
