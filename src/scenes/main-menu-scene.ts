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
    this.load.image('background', 'assets/backgrounds/TutorialBackground1.png');
    this.load.image('house', 'assets/squares/house.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.json('level' + localStorage.getItem('level'), 'assets/levels/' + localStorage.getItem('level') + '.json');
    this.load.image('backgroundDirt', 'assets/backgrounds/level-editor.png');
    this.load.spritesheet('crate', 'assets/clumpables/crateTiles.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('dirt', 'assets/clumpables/dirtTiles.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('steel', 'assets/clumpables/steelTiles.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('lava', 'assets/clumpables/lavaTiles.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 38, frameHeight: 19 });
    this.load.spritesheet('player', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('lizard', 'assets/monsters/lizard.png', { frameWidth: 70, frameHeight: 50 });
    this.load.spritesheet('spider', 'assets/monsters/spider.png', { frameWidth: 77, frameHeight: 61 });
    this.load.spritesheet('spiderArmored', 'assets/monsters/spiderArmored.png', { frameWidth: 77, frameHeight: 61 });
    this.load.spritesheet('squareFire', 'assets/squares/squareFire.png', { frameWidth: 79, frameHeight: 80 });
    this.load.spritesheet('fireDisappear', 'assets/squares/fireDisappear.png', { frameWidth: 84, frameHeight: 133 });
    this.load.image('exit', 'assets/exit.png');
    this.load.json('leveleditorlevel', 'assets/levels/leveleditor.json');
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
      this.scene.start('LevelEditor');
    });

    new MenuButton(this, 100, 350, 'Help', () => console.log('help button clicked'));
  }
}
