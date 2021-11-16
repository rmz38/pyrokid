import Player from '../objects/player';
import Crate from '../objects/crate';
import CompoundCrate from '../objects/compoundCrate';
import Lizard from '../objects/lizard';
import Spider from '../objects/spider';
import Dirt from '../objects/dirt';
import Steel from '../objects/steel';
import Lava from '../objects/lava';
import { game } from '../main';
import AlignGrid from '../helpers/alignGrid';
import LevelEditorButton from '../helpers/levelEditorButton';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'LevelEditor',
};
const W_WIDTH = 1200;
const W_HEIGHT = 600;
let cursors;
let controls;
let grid;
let pointer;
let aGrid;
let graphics;
// let menuPositions = [];
// let menuNames = []
// for (let i = 0; i < 8; i++) {
//   menuPositions.push(200 + i * 36);
// }
export class LevelEditor extends Phaser.Scene {
  [x: string]: any;
  public speed = 200;
  public selected = 'lava';
  public onButton = false;
  constructor() {
    super(sceneConfig);
  }
  public preload() {
    this.load.image('background', 'assets/backgrounds/level-editor.png');
    this.load.image('house', 'assets/squares/house.png');
    this.load.spritesheet('crate', 'assets/squares/crateTiles.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('dirt', 'assets/squares/dirtTiles.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('steel', 'assets/squares/steelTiles.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('lava', 'assets/squares/lavaTiles.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 38, frameHeight: 19 });
    this.load.spritesheet('player', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('lizard', 'assets/monsters/lizard.png', { frameWidth: 70, frameHeight: 50 });
    this.load.spritesheet('spider', 'assets/monsters/spider.png', { frameWidth: 77, frameHeight: 61 });
    this.load.spritesheet('spiderArmored', 'assets/monsters/spiderArmored.png', { frameWidth: 77, frameHeight: 61 });
    this.load.spritesheet('squareFire', 'assets/squares/squareFire.png', { frameWidth: 79, frameHeight: 80 });
    this.load.spritesheet('fireDisappear', 'assets/squares/fireDisappear.png', { frameWidth: 84, frameHeight: 133 });
  }
  public create(): void {
    pointer = this.input.activePointer;
    const background = this.add.image(W_WIDTH / 2, W_HEIGHT / 2, 'background');
    background.setScale(W_WIDTH / background.width);
    cursors = this.input.keyboard.createCursorKeys();
    this.matter.world.setBounds(0, 0, W_WIDTH, W_HEIGHT, 32, true, true, false, true);
    this.cameras.main.setBounds(0, 0, W_WIDTH, W_HEIGHT);

    const controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      acceleration: 0.04,
      drag: 0.0005,
      maxSpeed: 0.7,
    };

    const gridConfig = {
      scene: this,
      cols: W_WIDTH / 50,
      rows: W_HEIGHT / 50,
    };
    aGrid = new AlignGrid(gridConfig);
    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
    new LevelEditorButton(550, 150, 'Clump', '#fff', 'clump', this);
    const menuNames = ['Clear', 'Crate', 'Lava', 'Dirt', 'Steel', 'Lizard', 'Spider', 'Player', 'Armored\n Spider'];
    const menuSelects = ['clear', 'crate', 'lava', 'dirt', 'steel', 'lizard', 'spider', 'player', 'spiderArmored'];
    const menuButtons = [];
    for (let i = 0; i < 8; i++) {
      menuButtons.push(new LevelEditorButton(550, 200 + i * 36, menuNames[i], '#fff', menuSelects[i], this));
    }
    // const crateButton = new LevelEditorButton(550, , 'Crate', '#fff', 'crate', this);
    // const lavaButton = new LevelEditorButton(550, 236, 'Lava', '#fff', 'lava', this);
    // const dirtButton = new LevelEditorButton(550, 272, 'Dirt', '#fff', 'dirt', this);
    // const steelButton = new LevelEditorButton(550, 308, 'Steel', '#fff', 'steel', this);
    // const lizardButton = new LevelEditorButton(550, 308, 'Lizard', '#fff', 'lizard', this);
    // const spiderButton = new LevelEditorButton(550, 308, 'Spider', '#fff', 'spider', this);
    // const armorSpiderButton = new LevelEditorButton(550, 308, 'Armored Spider', '#fff', 'spiderArmored', this);
    // const playerButton = new LevelEditorButton(550, 308, 'Player', '#fff', 'player', this);
  }
  public update(time, delta): void {
    controls.update(delta);
    aGrid.show();
    if (pointer.isDown) {
      if (this.selected == 'clump') {
      } else if (!this.onButton) {
        aGrid.placeAt(pointer.worldX, pointer.worldY, this.selected, this);
      }
    }
  }
}
