import { MenuButton } from '../ui/menu-button';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'LevelSelect',
};

/**
 * The initial scene that starts, shows the splash screens, and loads the necessary assets.
 */
export class LevelSelect extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    this.add
      .text(100, 50, 'Level Select', {
        color: '#FFFFFF',
      })
      .setFontSize(24);
    localStorage.setItem('useleveleditor', 'false');
    let counter = 1;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 5; j++) {
        const num = counter.toString();
        new MenuButton(
          this,
          100 + j * 150,
          100 + i * 100,
          counter.toString(),
          () => {
            localStorage.setItem('useleveleditor', 'false');
            localStorage.setItem('level', num);
            console.log(localStorage.getItem('level'));
            this.scene.start('Game');
          },
          20,
          20,
        );
        counter++;
      }
    }
  }
}
