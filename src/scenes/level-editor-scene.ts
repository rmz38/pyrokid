import { MenuButton } from '../ui/menu-button';
import AlignGrid from '../helpers/alignGrid';
import LevelEditorButton from '../helpers/levelEditorButton';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'LevelEditor',
};
const W_WIDTH = 1200;
const W_HEIGHT = 700;
import FileSaver = require('file-saver');
let cursors;
let controls;
let pointer;
let aGrid;
// let menuPositions = [];
// let menuNames = []
// for (let i = 0; i < 8; i++) {
//   menuPositions.push(200 + i * 36);
// }
export class LevelEditor extends Phaser.Scene {
  [x: string]: any;
  public speed = 200;
  public selected = 'crate';
  public onButton = false;
  public graphics: Phaser.GameObjects.Graphics;
  public sx;
  public sy;
  constructor() {
    super(sceneConfig);
  }
  public create(): void {
    let sx = 0;
    let sy = 0;
    let draw = false;
    pointer = this.input.activePointer;
    const background = this.add.image(W_WIDTH / 2, W_HEIGHT / 2, 'backgroundDirt');
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
      acceleration: 0.3,
      drag: 0.0005,
      maxSpeed: 0.3,
    };

    const gridConfig = {
      scene: this,
      cols: W_WIDTH / 50,
      rows: W_HEIGHT / 50,
    };
    aGrid = new AlignGrid(gridConfig);
    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
    // new LevelEditorButton(550, 20, 'Start Level', '#fff', 'start', this);
    // new LevelEditorButton(700, 20, 'download', '#fff', 'download', this);
    // new LevelEditorButton(550, 75, 'Clump', '#fff', 'clump', this);
    const menuNames = [
      'Start Level',
      'Download',
      'Clump',
      'Connect',
      'Exit',
      'Bomb',
      'Clear',
      'Crate',
      'Lava',
      'Dirt',
      'Steel',
      'Lizard',
      'Spider',
      'Player',
      'Armor Spider',
    ];
    const menuSelects = [
      'start',
      'download',
      'clump',
      'connector',
      'exit',
      'bomb',
      'clear',
      'crate',
      'lava',
      'dirt',
      'steel',
      'lizard',
      'spider',
      'player',
      'spiderArmored',
    ];
    const menuButtons = [];
    for (let i = 0; i < menuNames.length; i++) {
      menuButtons.push(new LevelEditorButton(700, 50 + i * 30, menuNames[i], '#fff', menuSelects[i], this));
    }
    this.input.on('pointerdown', function (pointer) {
      sx = pointer.worldX;
      sy = pointer.worldY;
      if (game.selected == 'clump' || game.selected == 'connector') {
        draw = true;
      }
    });
    // initalize graphics to draw highlighting rectangle and be drawn on top
    this.graphics = this.add.graphics();
    this.graphics.depth = 2;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const game = this;
    this.input.on('pointerup', function () {
      draw = false;
      game.graphics.clear();
      const sr = aGrid.getRowOrCol(Math.min(sx, pointer.worldX));
      const sc = aGrid.getRowOrCol(Math.min(sy, pointer.worldY));
      const er = aGrid.getRowOrCol(Math.max(sx, pointer.worldX));
      const ec = aGrid.getRowOrCol(Math.max(sy, pointer.worldY));
      if (game.selected == 'clump') {
        aGrid.clump(sr, sc, er, ec);
      } else if (game.selected == 'selected') {
        //TODO
      }
    });
    this.input.on('pointermove', function (pointer) {
      if (draw && pointer.noButtonDown() === false && (game.selected == 'clump' || game.selected == 'connector')) {
        // graphics.clear();
        const graphics = game.graphics;
        graphics.clear();
        graphics.fillStyle(0x0000ff, 0.4);
        graphics.lineStyle(2, 0x0000ff, 0.75);
        graphics.fillRect(sx, sy, pointer.worldX - sx, pointer.worldY - sy);
        graphics.strokeRect(sx, sy, pointer.worldX - sx, pointer.worldY - sy);
      }
    });
    aGrid.show();
    const preset = this.cache.json.get('leveleditorlevel');
    aGrid.placeAt(preset.player[0].x, preset.player[0].y, 'player', this);
    preset.dirt.forEach((e) => {
      aGrid.placeAt(e.x, e.y, 'dirt', this);
    });
    new MenuButton(this, 10, 10, 'Back to Menu', () => {
      this.scene.start('MainMenu');
    });
  }
  public generateJson(start = true): void {
    const json = {
      player: [],
      lizard: [],
      spider: [],
      armoredSpider: [],
      dirt: [],
      lava: [],
      crate: [],
      steel: [],
      exit: [],
    };
    const grid = aGrid.grid;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j]) {
          const obj = grid[i][j];
          json[obj.name].push({
            x: obj.x,
            y: obj.y,
            frame: obj.frame.name,
          });
        }
      }
    }
    const download = JSON.stringify(json, null, 2);

    // start level immediately instead of download
    if (start) {
      localStorage.setItem('leveleditorlevel', download);
      localStorage.setItem('useleveleditor', 'true');
      this.scene.start('Game');
    } else {
      // for downloads
      const fileToSave = new Blob([JSON.stringify(json, null, 4)], {
        type: 'application/json',
        // name: 'level.json',
      });
      FileSaver(fileToSave, 'level.json');
    }
  }
  public update(time, delta): void {
    controls.update(delta);
    if (pointer.isDown) {
      if (this.selected == 'clump' || this.selected == 'connector') {
        // this.graphics.clear();
        // this.graphics.clear();
        // let graphics = this.add.graphics();
        // graphics.lineStyle(2, 0x0000ff, 0.75);
        // graphics.strokeRect(this.sx, this.sy, pointer.x - this.sx, pointer.y - this.sy);
        // graphics.strokeRect(0, 0, 100, 100);
      } else if (!this.onButton) {
        aGrid.placeAt(pointer.worldX, pointer.worldY, this.selected, this);
      }
    }
  }
}
