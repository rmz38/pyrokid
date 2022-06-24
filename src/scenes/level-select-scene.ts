import { MenuButton } from '../ui/menu-button';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'LevelSelect',
};

// topmost y coordinate of the level select portion, to help with positioning
const top = 100;
// leftmost x coordinate of the level select portion, to help with positioning
const left = 80;

const numLevels = 31; // manually set number of levels bc reading max level in browser kind of a pain
/**
 * The initial scene that starts, shows the splash screens, and loads the necessary assets.
 */
export class LevelSelect extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    new MenuButton(this, 10, 10, 'Back to Menu', () => {
      this.scene.stop('Game');
      this.scene.start('MainMenu');
    });
    this.add
      .text(left, top, 'Level Select', {
        color: '#FFFFFF',
      })
      .setFontSize(24);
    localStorage.setItem('useleveleditor', 'false');
    let page = 0;
    if (localStorage.getItem('page') !== null) {
      page = parseInt(localStorage.getItem('page'));
    }
    let counter = 1 + page * 20;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 5; j++) {
        if (counter <= numLevels) {
          const num = counter.toString();
          new MenuButton(
            this,
            left + j * 150,
            top + 50 + i * 100,
            counter.toString(),
            () => {
              localStorage.setItem('useleveleditor', 'false');
              localStorage.setItem('level', num);
              this.scene.start('Game');
            },
            20,
            20,
          );
          counter++;
        }
      }
    }
    //left and right page buttons
    if (page > 0) {
      new MenuButton(
        this,
        10,
        300,
        '<',
        () => {
          localStorage.setItem('page', (page - 1).toString());
          this.scene.start('LevelSelect');
        },
        20,
        20,
      );
    }
    if (page < Math.floor(numLevels / 20)) {
      new MenuButton(
        this,
        750,
        300,
        '>',
        () => {
          localStorage.setItem('page', (page + 1).toString());
          this.scene.start('LevelSelect');
        },
        20,
        20,
      );
    }
  }
}
