import * as Phaser from 'phaser';
import { tiles, indexes } from './clump';
const TILE_SIZE = 50;
const clumpables = new Set<string>(['dirt', 'lava', 'crate', 'steel']);
class AlignGrid {
  h: integer;
  w: integer;
  rows: integer;
  cols: integer;
  scene: any;
  graphics: any;
  grid: Array<Array<Phaser.Physics.Matter.Image>>;
  connectors: Set<string>;
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
    console.log(objName);
    const row = Math.floor(x1 / TILE_SIZE);
    const col = Math.floor(y1 / TILE_SIZE);
    const x2 = row * TILE_SIZE + TILE_SIZE / 2;
    const y2 = col * TILE_SIZE + TILE_SIZE / 2;
    //if clearing instead
    if (objName == 'clear') {
      if (this.grid[row][col]) {
        const name = this.grid[row][col].name;
        const frame = this.grid[row][col].frame.name;
        if (name == 'player') {
          return;
        }
        this.grid[row][col].destroy();
        this.grid[row][col] = null;
        if (clumpables.has(name) && frame != 0) {
          this.neighbors(row, col).forEach((e) => {
            const nx = this.unpack(e)[0];
            const ny = this.unpack(e)[1];
            if (this.grid[nx][ny] && this.grid[nx][ny].frame.name != 0) {
              this.clump(nx, ny, nx, ny);
            }
          });
        }
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
  neighbors4(i, j): Array<string> {
    // eslint-disable-next-line prettier/prettier
    return [i + ',' + (j - 1), i + 1 + ',' + j, i + ',' + (j + 1), i - 1 + ',' + j];
  }
  unpack(coord: string): Array<integer> {
    const split = coord.indexOf(',');
    const i = parseInt(coord.substring(0, split));
    const j = parseInt(coord.substring(split + 1));
    return [i, j];
  }
  /**
   * start and end of rectangle drawn by mouse to clump selected tiles
   * FIX TO TAKE SET OF TILES INSTEAD OF RECTANGLE? TODO
   * @param sx start x pixel coordinate
   * @param sy start y pixel coordinate
   * @param ex end x pixel coordinate
   * @param ey end y pixel coordinate
   */
  clump(sr, sc, er, ec): void {
    const curr = new Set<string>();
    const check = new Set<string>();
    // DO BFS
    for (let i = sr; i <= er; i++) {
      for (let j = sc; j <= ec; j++) {
        if (this.grid[i][j]) {
          curr.add(i + ',' + j);
          check.add(i + ',' + j);
          if (this.grid[i][j].frame.name != 0) {
            this.neighbors(i, j).forEach((e) => {
              const nx = this.unpack(e)[0];
              const ny = this.unpack(e)[1];
              if (this.grid[nx][ny] && this.grid[nx][ny].frame.name != 0) {
                check.add(e);
              }
            });
          }
        }
      }
    }
    // figure out which tile texture to use based on spritesheet
    // ensured that none are null in curr
    curr.forEach((e) => {
      const i = this.unpack(e)[0];
      const j = this.unpack(e)[1];
      if (clumpables.has(this.grid[i][j].name)) {
        const candidates = this.neighbors(i, j);
        // all sides of the tile grabbed from the tilesheets
        const id = [1, 1, 1, 1, 1, 1, 1, 1];
        let pointer = 0;
        for (let x = 0; x < candidates.length; x++) {
          const coord = candidates[x];
          const a = this.unpack(coord)[0];
          const b = this.unpack(coord)[1];
          if (!(check.has(coord) && this.grid[a][b].name == this.grid[i][j].name)) {
            if (x % 2 == 0) {
              id[pointer] = 0;
            } else {
              id[pointer] = 0;
              id[pointer + 1] = 0;
              // wrap around to 7
              if (pointer + 2 > 7) {
                id[0] = 0;
              } else {
                id[pointer + 2] = 0;
              }
            }
          }
          // console.log(pointer);
          if (x % 2 == 1) {
            pointer += 2;
          }
        }
        this.grid[i][j].setFrame(tiles[id.join('')]);
      }
    });
  }
  connect(sr, sc, er, ec): void {
    const curr = new Set<string>();
    const check = new Set<string>();
    // DO BFS and add tiles to initalized bfs
    for (let i = sr; i <= er; i++) {
      for (let j = sc; j <= ec; j++) {
        if (this.grid[i][j]) {
          curr.add(i + ',' + j);
        }
      }
    }
    // figure out which tile texture to use based on spritesheet
    // ensured that none are null in curr
    curr.forEach((e) => {
      const i = this.unpack(e)[0];
      const j = this.unpack(e)[1];
      if (clumpables.has(this.grid[i][j].name)) {
        const candidates = this.neighbors(i, j);
        // all sides of the tile grabbed from the tilesheets
        const id: Array<string> = indexes[parseInt(this.grid[i][j].frame.name)].split('');
        for (let x = 0; x < candidates.length; x++) {
          const coord = candidates[x];
          const a = this.getPixel(this.unpack(coord)[0]);
          const b = this.getPixel(this.unpack(coord)[1]);
          const neighborId = indexes[parseInt(this.grid[a][b].frame.name)];
          let ip = this.getPixel(i);
          let jp = this.getPixel(j);
          const coordId = ip + ',' + jp;
          // find the id of the frame to use and what sides are available to join
          LEFTOFF HERE CHECK ALL SIDES
          if (chec)
          ip += (a - i) * 25;
          jp += (b - j) * 25;
          }
        }
      }
    });
  }
}

export default AlignGrid;
