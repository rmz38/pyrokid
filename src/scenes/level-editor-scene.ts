import { MenuButton } from '../ui/menu-button';
import AlignGrid from '../helpers/alignGrid';
import LevelEditorButton from '../helpers/levelEditorButton';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'LevelEditor',
};
import FileSaver = require('file-saver');
import LevelSizeButton from '../helpers/levelSizeButton';
let cursors;
let controls;
let pointer;
let aGrid: AlignGrid;
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
  public buttons;
  public width = 24;
  public height = 12;
  constructor() {
    super(sceneConfig);
  }
  public create(): void {
    let sx = 0;
    let sy = 0;
    let draw = false;
    pointer = this.input.activePointer;
    let preset =
      localStorage.getItem('upload') == 'true'
        ? JSON.parse(localStorage.getItem('leveleditorlevel'))
        : this.cache.json.get('leveleditorlevel');
    preset = preset.width == null ? JSON.parse(preset) : preset;
    this.width = preset.width;
    this.height = preset.height;
    const world_bound_width = preset.width * 50;
    const world_bound_height = preset.height * 50;
    const background = this.add.tileSprite(
      world_bound_width / 2,
      world_bound_height / 2,
      world_bound_width,
      world_bound_height,
      'backgroundDirt',
    );
    cursors = this.input.keyboard.createCursorKeys();
    this.matter.world.setBounds(0, 0, world_bound_width, world_bound_height, 32, true, true, false, true);
    this.cameras.main.setBounds(0, 0, world_bound_width, world_bound_height);

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
      cols: world_bound_width / 50,
      rows: world_bound_height / 50,
    };
    aGrid = new AlignGrid(gridConfig);
    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
    // new LevelEditorButton(550, 20, 'Start Level', '#fff', 'start', this);
    // new LevelEditorButton(700, 20, 'download', '#fff', 'download', this);
    // new LevelEditorButton(550, 75, 'Clump', '#fff', 'clump', this);
    const menuNames = [
      'Start Level',
      'Download',
      'Upload',
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
      'upload',
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
      if (i < 5) {
        menuButtons.push(new LevelEditorButton(700, 20 + i * 30, menuNames[i], '#fff', menuSelects[i], this));
      } else {
        menuButtons.push(new LevelEditorButton(700, 40 + i * 30, menuNames[i], '#fff', menuSelects[i], this));
      }
    }
    menuButtons.push(new LevelSizeButton(700, 40 + menuNames.length * 30, 'width', this));
    menuButtons.push(new LevelSizeButton(700, 40 + (menuNames.length + 1) * 30, 'height', this));
    this.buttons = menuButtons;
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
        aGrid.clumpBox(sr, sc, er, ec);
      } else if (game.selected == 'connector') {
        aGrid.connect(sr, sc, er, ec, game);
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
    // const preset = JSON.parse(JSON.stringify(localStorage.getItem('leveleditorlevel')));
    aGrid.placeAt(preset.player[0].x, preset.player[0].y, 'player', this);
    preset.dirt.forEach((e) => {
      aGrid.placeAtPreset(e.x, e.y, 'dirt', e.frame, this);
    });
    preset.steel.forEach((e) => {
      aGrid.placeAtPreset(e.x, e.y, 'steel', e.frame, this);
    });
    preset.crate.forEach((e) => {
      aGrid.placeAtPreset(e.x, e.y, 'crate', e.frame, this);
    });
    preset.lava.forEach((e) => {
      aGrid.placeAtPreset(e.x, e.y, 'lava', e.frame, this);
    });
    preset.lizard.forEach((e) => {
      aGrid.placeAtPreset(e.x, e.y, 'lizard', '0', this);
    });
    preset.spider.forEach((e) => {
      aGrid.placeAtPreset(e.x, e.y, 'spider', '0', this);
    });
    preset.exit.forEach((e) => {
      aGrid.placeAtPreset(e.x, e.y, 'exit', '0', this);
    });
    preset.bomb.forEach((e) => {
      aGrid.placeAtPreset(e.x, e.y, 'bomb', '0', this);
    });
    preset.connector.forEach((e) => {
      const xp = parseInt(e.substring(0, e.indexOf(',')));
      const yp = parseInt(e.substring(e.indexOf(',') + 1));
      aGrid.connectors[e] = game.add.image(xp, yp, 'connector');
      if (yp % 50 == 0) {
        aGrid.connectors[e].angle = 90;
      }
    });
    aGrid.placeAt(preset.player[0].x, preset.player[0].y, 'player', this);
    // aGrid.clumpBox(0, 0, aGrid.getRowOrCol(world_bound_width - 1), aGrid.getRowOrCol(world_bound_height - 1));
    new MenuButton(this, 10, 10, 'Back to Menu', () => {
      this.scene.start('MainMenu');
    });
  }
  public generateJson(start = true, resize = false): void {
    const json = {
      width: this.width,
      height: this.height + 1,
      player: [],
      lizard: [],
      spider: [],
      spiderArmored: [],
      dirt: [],
      lava: [],
      crate: [],
      steel: [],
      exit: [],
      bomb: [],
      connector: [],
    };
    const grid = aGrid.grid;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j]) {
          const obj = grid[i][j];
          if ((i < this.width && j < this.height) || obj.name == 'player') {
            // check min in case new world size cuts off player location
            json[obj.name].push({
              x: obj.x,
              y: obj.y,
              frame: obj.frame.name,
            });
          }
        }
      }
    }
    for (const [key, value] of Object.entries(aGrid.connectors)) {
      json['connector'].push(key);
    }
    const download = JSON.stringify(json);

    // start level immediately instead of download
    if (start) {
      localStorage.setItem('leveleditorlevel', download);
      localStorage.setItem('useleveleditor', 'true');
      this.scene.start('Game');
    } else if (resize) {
      localStorage.setItem('upload', 'true');
      localStorage.setItem('leveleditorlevel', download);
      this.scene.restart();
    } else {
      // for downloads
      const fileToSave = new Blob([JSON.stringify(json, null, 2)], {
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
