import { MenuButton } from '../ui/menu-button';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Credits',
};

let keys;
export class Credits extends Phaser.Scene {
  graphics: Phaser.GameObjects.Graphics;
  constructor() {
    super(sceneConfig);
  }
  public create() {
    this.add
      .text(250, 50, 'Credits', {
        color: '#FFFFFF',
      })
      .setFontSize(48);
    this.add
      .text(
        250,
        150,
        "Remake Developer: \nRose Zhou \n \nRemake Designers: \nSh'yee Meng, \nLucien Eckert \n \nOriginal Creators: \nNick Cheng, \nMichelle Liu, \nAaron Nelson, \nEvan NiederHoffer, \nChristian Zaloj",
        {
          color: '#FFFFFF',
        },
      )
      .setFontSize(32);
    new MenuButton(this, 10, 10, 'Back to Menu', () => {
      this.scene.start('MainMenu');
    });
  }
}
