import * as Phaser from 'phaser';
import { tiles } from './clump';
const TILE_SIZE = 50;
const clumpables = new Set<string>(['dirt', 'lava', 'crate', 'steel']);
class AlignGrid {
  h: integer;
  w: integer;
  rows: integer;
  cols: integer;
  scene: any;
  graphics: any;
  grid: Array<Array<any>>;
  selected: string;
  playerTile: Array<integer>;
  public counter: integer = 0;
  public clumps = new Map<integer, Set<string>>();
  constructor(config) {
    if (!config.scene) {
      console.log('missing scene!');
      return;
    }
    if (!config.rows) {
      console.log('no rows given wee woo');
    }
    if (!config.cols) {
      console.log('no columns given wee woo');
    }
    this.h = config.rows * TILE_SIZE;
    this.w = config.cols * TILE_SIZE;
    this.rows = config.rows;
    this.cols = config.cols;
    this.scene = config.scene;
    this.grid = new Array(this.rows);
    this.selected = 'lavaTile';
    for (let i = 0; i < this.cols; i++) {
      this.grid[i] = new Array<any>(this.rows);
    }
    this.playerTile = null;
  }
  show(a = 0.7): void {
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(1, 0xff0000, a);
    for (let i = 0; i < this.w; i += TILE_SIZE) {
      this.graphics.moveTo(i, 0);
      this.graphics.lineTo(i, this.h);
    }
    for (let i = 0; i < this.h; i += TILE_SIZE) {
      this.graphics.moveTo(0, i);
      this.graphics.lineTo(this.w, i);
    }
    this.graphics.strokePath();
  }
  placeAt(x1, y1, objName, game: Phaser.Scene): void {
    //converted centered coordinates in pixels to place in grid square
    const row = Math.floor(x1 / TILE_SIZE);
    const col = Math.floor(y1 / TILE_SIZE);
    const x2 = row * TILE_SIZE + TILE_SIZE / 2;
    const y2 = col * TILE_SIZE + TILE_SIZE / 2;
    if (objName == 'clear') {
      if (this.grid[row][col]) {
        this.grid[row][col].destroy();
      }
      this.grid[row][col] = null;
      return;
    }

    const obj = game.add.image(x2, y2, objName);
    obj.name = objName;
    if (this.grid[row][col]) {
      if (this.playerTile && this.playerTile[0] == row && this.playerTile[1] == col) {
        this.playerTile = null;
      }
      this.grid[row][col].destroy();
    }
    if (objName == 'player') {
      if (this.playerTile) {
        this.grid[this.playerTile[0]][this.playerTile[1]].destroy();
      }
      this.playerTile = [row, col];
    }
    this.grid[row][col] = obj;
    obj.x = x2;
    obj.y = y2;
    console.log(this.playerTile);
  }
  getRowOrCol(pixel: integer): integer {
    return Math.floor(pixel / TILE_SIZE);
  }
  getPixel(rowOrCol: integer): integer {
    return rowOrCol * TILE_SIZE + TILE_SIZE / 2;
  }
  neighbors(i, j): Array<string> {
    return [
      i - 1 + ',' + (j - 1),
      i + ',' + (j - 1),
      i + 1 + ',' + (j - 1),
      i + 1 + ',' + j,
      i + 1 + ',' + (j + 1),
      i + ',' + (j + 1),
      i - 1 + ',' + (j + 1),
      i - 1 + ',' + j,
    ];
  }
  unpack(coord: string): Array<integer> {
    const split = coord.indexOf(',');
    const i = parseInt(coord.substring(0, split));
    const j = parseInt(coord.substring(split + 1));
    return [i, j];
  }
  /**
   * start and end of rectangle drawn by mouse to clump selected tiles
   * @param sx start x pixel coordinate
   * @param sy start y pixel coordinate
   * @param ex end x pixel coordinate
   * @param ey end y pixel coordinate
   */
  clump(sx, sy, ex, ey): void {
    const curr = new Set<string>();
    const sr = this.getRowOrCol(sx);
    const sc = this.getRowOrCol(sy);
    const er = this.getRowOrCol(ex);
    const ec = this.getRowOrCol(ey);
    for (let i = sr; i <= er; i++) {
      for (let j = sc; j <= ec; j++) {
        curr.add(i + ',' + j);
        if (this.clumps.has(this.grid[i][j].clumpId)) {
          const toAdd = this.clumps.get(this.grid[i][j].clumpId);
          toAdd.forEach((e) => {
            curr.add(e);
          });
        }
      }
    }
    // figure out which tile texture to use based on spritesheet
    curr.forEach((e) => {
      const i = this.unpack(e)[0];
      const j = this.unpack(e)[1];
      if (clumpables.has(this.grid[i][j].name)) {
        const candidates = this.neighbors(i, j);
        const id = [1, 1, 1, 1, 1, 1, 1, 1];
        let pointer = 0;
        for (let x = 0; x < candidates.length; x++) {
          const coord = candidates[x];
          const a = this.unpack(coord)[0];
          const b = this.unpack(coord)[1];
          if (!(curr.has(coord) && this.grid[a][b].name == this.grid[i][j].name)) {
            if (pointer % 2 == 0) {
              id[pointer] = 0;
            } else {
              id[pointer] = 0;
              id[pointer + 1] = 0;
              id[pointer + 2] = 0;
            }
          }
          if (pointer % 2 == 1) {
            pointer += 2;
          }
        }
        this.grid[i][j].setFrame(tiles[id.join('')]);
      }
    });
  }
}

export default AlignGrid;
