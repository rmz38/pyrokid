import { MenuButton } from '../ui/menu-button';
// import raycasterPlugin from 'phaser-raycaster';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'MainMenu',
};

/**
 * The initial scene that starts, shows the splash screens, and loads the necessary assets.
 */
export class MainMenuScene extends Phaser.Scene {
  backgroundMusic: Phaser.Sound.BaseSound;
  constructor() {
    super(sceneConfig);
  }
  public preload() {
    this.load.json('leveleditorlevel', 'assets/levels/leveleditor.json');
    // this.load.json('level' + localStorage.getItem('level'), 'assets/levels/' + localStorage.getItem('level') + '.json');
  }
  public create(): void {
    // console.log(this.plugins);
    // // @ts-ignore
    // this.raycaster = this.raycasterPlugin.createRaycaster({});
    // //@ts-ignore
    // this.ray = this.raycaster.createRay();
    const background = this.add.tileSprite(400, 300, 800, 600, 'backgroundDirt');
    this.add
      .text(100, 50, 'Pyrokid', {
        color: '#FFFFFF',
      })
      .setFontSize(48);
    localStorage.setItem('useleveleditor', 'false');
    this.anims.create({
      key: 'shootRight',
      frames: this.anims.generateFrameNumbers('shoot', { start: 6, end: 9 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: 'fireball',
      frames: this.anims.generateFrameNumbers('fireball', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    const kid = this.add.sprite(400, 250, 'shoot');
    kid.scaleX = 3;
    kid.scaleY = 3;
    kid.anims.play('shootRight');

    // for (let i = 0; i < 4; i++) {
    //   for (let j = 0; j < 3; j++) {
    //     const dirt = this.add.sprite(400 + i * 100, 370 + j * 100, 'dirt');
    //     dirt.scaleX = 2;
    //     dirt.scaleY = 2;
    //   }
    // }

    const fireball = this.add.sprite(600, 250, 'fireball');
    fireball.scaleX = 3;
    fireball.scaleY = 3;
    fireball.anims.play('fireball');

    new MenuButton(this, 100, 150, 'Level Select', () => {
      localStorage.setItem('useleveleditor', 'false');
      this.scene.start('LevelSelect');
    });

    new MenuButton(this, 100, 250, 'Level Editor', () => {
      // localStorage.setItem('leveleditorlevel', JSON.stringify(this.cache.json.get('leveleditorlevel')));
      localStorage.setItem('upload', 'false');
      this.scene.start('LevelEditor');
    });

    new MenuButton(this, 100, 350, 'Credits', () => {
      this.scene.start('Credits');
    });
  }
}
