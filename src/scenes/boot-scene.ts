import { getGameWidth, getGameHeight } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Boot',
};

/**
 * The initial scene that loads all necessary assets to the game and displays a loading bar.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public preload(): void {
    const halfWidth = getGameWidth(this) * 0.5;
    const halfHeight = getGameHeight(this) * 0.5;

    const progressBarHeight = 100;
    const progressBarWidth = 400;

    const progressBarContainer = this.add.rectangle(
      halfWidth,
      halfHeight,
      progressBarWidth,
      progressBarHeight,
      0x000000,
    );
    const progressBar = this.add.rectangle(
      halfWidth + 20 - progressBarContainer.width * 0.5,
      halfHeight,
      10,
      progressBarHeight - 20,
      0x888888,
    );

    const loadingText = this.add.text(halfWidth - 75, halfHeight - 100, 'Loading...').setFontSize(24);
    const percentText = this.add.text(halfWidth - 25, halfHeight, '0%').setFontSize(24);
    const assetText = this.add.text(halfWidth - 25, halfHeight + 100, '').setFontSize(24);

    this.load.on('progress', (value) => {
      progressBar.width = (progressBarWidth - 30) * value;

      const percent = value * 100;
      percentText.setText(`${percent}%`);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(file.key);
    });

    this.load.on('complete', () => {
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      progressBar.destroy();
      progressBarContainer.destroy();

      this.scene.start('MainMenu');
    });

    this.loadAssets();
  }

  /**
   * All assets that need to be loaded by the game (sprites, images, animations, tiles, music, etc)
   * should be added to this method. Once loaded in, the loader will keep track of them, indepedent of which scene
   * is currently active, so they can be accessed anywhere.
   */
  private loadAssets() {
    // Load sample assets

    // Source: Open Game Art
    this.load.image('tutorialBackground1', 'assets/backgrounds/TutorialBackground1.png');
    this.load.image('tutorialBackground2', 'assets/backgrounds/TutorialBackground2.png');
    this.load.image('tutorialBackground3', 'assets/backgrounds/TutorialBackground3.png');
    this.load.image('house', 'assets/house.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('backgroundDirt', 'assets/backgrounds/level-editor.png');
    this.load.spritesheet('crate', 'assets/clumpables/crateTiles.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('dirt', 'assets/clumpables/dirtTiles.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('steel', 'assets/clumpables/steelTiles.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('lava', 'assets/clumpables/lavaTiles.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 38, frameHeight: 19 });
    this.load.spritesheet('screenfireball', 'assets/player/fireball.png', { frameWidth: 59, frameHeight: 59 });
    this.load.spritesheet('player', 'assets/player/player.png', { frameWidth: 60, frameHeight: 60 });
    this.load.spritesheet('shoot', 'assets/player/shoot.png', { frameWidth: 59, frameHeight: 59 });
    this.load.spritesheet('jump', 'assets/player/jump.png', { frameWidth: 59, frameHeight: 59 });
    this.load.spritesheet('lizard', 'assets/monsters/lizard.png', { frameWidth: 70, frameHeight: 50 });
    this.load.spritesheet('spider', 'assets/monsters/spider.png', { frameWidth: 77, frameHeight: 61 });
    this.load.spritesheet('spiderArmored', 'assets/monsters/spiderArmored.png', { frameWidth: 77, frameHeight: 61 });
    this.load.spritesheet('squareFire', 'assets/squares/squareFire.png', { frameWidth: 79, frameHeight: 80 });
    this.load.spritesheet('fireDisappear', 'assets/squares/fireDisappear.png', { frameWidth: 84, frameHeight: 133 });
    this.load.spritesheet('explosion', 'assets/explosion.png', { frameWidth: 150, frameHeight: 150 });
    this.load.image('exit', 'assets/exit.png');
    this.load.image('instructions', 'assets/instructions.png');
    this.load.image('connector', 'assets/connector.png');
    this.load.image('brickbuilding', 'assets/brickbuilding.png');
    this.load.image('villager1', 'assets/monsters/villager1.png');
    this.load.image('villager2', 'assets/monsters/villager2.png');
    this.load.image('villager3', 'assets/monsters/villager3.png');
  }
}
