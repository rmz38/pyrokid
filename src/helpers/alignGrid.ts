import * as Phaser from 'phaser';
import { tiles, indexes } from './clump';
const TILE_SIZE = 50;
const clumpables = new Set<string>(['dirt', 'lava', 'crate', 'steel']);
interface ConnectorHash {
  [details: string]: Phaser.GameObjects.Image;
}
function isTerrain(s: string) {
  return s.includes('crate') || s.includes('steel') || s.includes('lava') || s.includes('dirt');
}
class AlignGrid {
  h: integer;
  w: integer;
  rows: integer;
  cols: integer;
  scene: any;
  graphics: any;
  grid: Array<Array<Phaser.GameObjects.Image>>;
  connectors: ConnectorHash;
  selected: string;
  playerTile: Array<integer>;
  public counter: integer = 0;
  // public clumps = new Map<integer, Set<string>>();
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
    this.grid = new Array(this.cols);
    this.connectors = {};
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
  clearConnector(row, col) {
    this.neighbors4(row, col).forEach((e) => {
      const a = this.unpack(e)[0];
      const b = this.unpack(e)[1];
      const ip = this.getPixel(row);
      const jp = this.getPixel(col);
      const xp = ip + (a - row) * 25;
      const yp = jp + (b - col) * 25;
      const id = xp + ',' + yp;
      if (id in this.connectors) {
        this.connectors[id].destroy();
        delete this.connectors[id];
      }
    });
  }
  clearTile(row, col, game) {
    if (this.grid[row][col]) {
      const name = this.grid[row][col].name;
      const frame = this.grid[row][col].frame.name;
      if (name == 'player') {
        return;
      }
      this.grid[row][col].destroy();
      this.grid[row][col] = null;
      //@ts-ignore
      if (clumpables.has(name) && frame != 0) {
        this.neighbors(row, col).forEach((e) => {
          const [nx, ny] = this.unpack(e);
          //@ts-ignore
          if (nx >= 0 && nx < this.grid.length && ny >= 0 && ny < this.grid[0].length && this.grid[nx][ny]) {
            this.clumpBox(nx, ny, nx, ny);
          }
        });
      }
    }
    this.grid[row][col] = null;
    this.clearConnector(row, col);
  }
  // placeAtPreset(x1, y1, objName, game) {
  //   this.placeAt(x1, y1, objName, game);
  //   const row = Math.floor(x1 / TILE_SIZE);
  //   const col = Math.floor(y1 / TILE_SIZE);
  // }
  placeAtPreset(x1, y1, objName, frame: string, game) {
    this.placeAt(x1, y1, objName, game);
    const row = Math.floor(x1 / TILE_SIZE);
    const col = Math.floor(y1 / TILE_SIZE);
    this.grid[row][col].setFrame(frame);
  }
  placeAt(x1, y1, objName, game: Phaser.Scene): void {
    //converted centered coordinates in pixels to place in grid square
    const row = Math.floor(x1 / TILE_SIZE);
    const col = Math.floor(y1 / TILE_SIZE);
    const x2 = row * TILE_SIZE + TILE_SIZE / 2;
    const y2 = col * TILE_SIZE + TILE_SIZE / 2;
    //if clearing instead
    if (objName == 'clear') {
      this.clearTile(row, col, game);
      return;
    }

    if (this.grid[row][col]) {
      if (this.playerTile && this.playerTile[0] == row && this.playerTile[1] == col) {
        return;
      }
    }
    this.clearTile(row, col, game);
    if (objName == 'player') {
      if (this.playerTile) {
        const [a, b] = this.playerTile;
        this.grid[a][b].destroy();
        this.grid[a][b] = null;
      }
      this.playerTile = [row, col];
    }
    const obj = game.add.image(x2, y2, objName);
    if (objName == 'lizard' || objName.includes('spider')) {
      obj.scaleX = 0.7;
      if (objName.includes('spider')) {
        obj.scaleY = 0.9;
      }
    }
    obj.name = objName;
    this.grid[row][col] = obj;
    obj.x = x2;
    obj.y = y2;
    //auto clump dirt tiles
    if (objName == 'dirt') {
      const neighbors = this.neighbors4(row, col);
      const autoClumpSet: Set<string> = new Set();
      for (let x = 0; x < neighbors.length; x++) {
        const [nx, ny] = this.unpack(neighbors[x]);
        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < this.grid.length &&
          ny < this.grid[0].length &&
          this.grid[nx][ny] &&
          this.grid[nx][ny].name == 'dirt'
        ) {
          const sr = Math.min(row, nx);
          const sc = Math.min(col, ny);
          const er = Math.max(row, nx);
          const ec = Math.max(col, ny);
          this.clumpBox(sr, sc, er, ec);
        }
      }
    }
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
  checkConnected(nx, ny, i, j, checkId) {
    if (checkId == undefined) {
      return false;
    }
    return (
      (ny < j && nx == i && checkId.charAt(5) == '1') || // top
      // (ny < j && nx > i && checkId.charAt(4) == '1') || // top right
      (ny > j && nx == i && checkId.charAt(1) == '1') || // bottom
      // (ny > j && nx > i && checkId.charAt(0) == '1') || // bottom right
      (nx > i && ny == j && checkId.charAt(7) == '1') || // right
      (nx < i && ny == j && checkId.charAt(3) == '1') // left
      // (nx < i && ny > j && checkId.charAt(2) == '1') || // bottom left
      // (nx < i && ny < j && checkId.charAt(4) == '1') // top left
    );
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
   * @param sx start x row coordinate
   * @param sy start y col coordinate
   * @param ex end x row coordinate
   * @param ey end y col coordinate
   */
  clumpBox(sr, sc, er, ec) {
    // sr = sr < er ? sr : er;
    // er = sr < er ? sr : er;
    // sc = sc < ec ? sc : ec;
    // ec = sc < ec ? sc : ec;
    const highlighted = new Set<string>();
    const check = new Set<string>(); // bascially seen set in bfs
    let curr = new Set<string>();
    let next = new Set<string>();
    // DO BFS
    for (let i = sr; i <= er; i++) {
      for (let j = sc; j <= ec; j++) {
        if (this.grid[i][j]) {
          highlighted.add(i + ',' + j);
          check.add(i + ',' + j);
          this.neighbors(i, j).forEach((e) => {
            const [nx, ny] = this.unpack(e);
            if (nx >= 0 && nx < this.cols && ny >= 0 && ny < this.rows) {
              if (this.grid[nx][ny] && this.grid[nx][ny].frame.name != '0') {
                const checkId = indexes[parseInt(this.grid[nx][ny].frame.name)];
                if (this.checkConnected(nx, ny, i, j, checkId)) {
                  //NEED TO BFS AGAIN
                  if (!check.has(e)) {
                    next.add(e);
                  }
                  check.add(e);
                }
              }
            }
          });
        }
      }
    }
    while (next.size > 0) {
      curr = next;
      next = new Set<string>();
      curr.forEach((node) => {
        const [i, j] = this.unpack(node);
        this.neighbors(i, j).forEach((e) => {
          const [nx, ny] = this.unpack(e);
          if (nx >= 0 && nx < this.cols && ny >= 0 && ny < this.rows) {
            if (this.grid[nx][ny] && this.grid[nx][ny].frame.name != '0') {
              const checkId = indexes[parseInt(this.grid[nx][ny].frame.name)];
              if (this.checkConnected(nx, ny, i, j, checkId)) {
                //NEED TO BFS AGAIN, need to add compound blocks to highlighted?
                if (!check.has(e)) {
                  next.add(e);
                  check.add(e);
                }
              }
            }
          }
        });
      });
    }
    this.clump(check, check);
  }
  clump(curr: Set<string>, check: Set<string>): void {
    // figure out which tile texture to use based on spritesheet
    // ensured that none are null in curr
    curr.forEach((e) => {
      const [i, j] = this.unpack(e);
      this.clearConnector(i, j);
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
          if (x % 2 == 1) {
            pointer += 2;
          }
        }
        this.grid[i][j].setFrame(tiles[id.join('')]);
      }
    });
  }
  connect(sr, sc, er, ec, game: Phaser.Scene): void {
    // sr = sr < er ? sr : er;
    // er = sr < er ? sr : er;
    // sc = sc < ec ? sc : ec;
    // ec = sc < ec ? sc : ec;
    if (er >= this.grid.length || ec > this.grid[0].length) {
      return;
    }
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
      const [i, j] = this.unpack(e);
      if (clumpables.has(this.grid[i][j].name)) {
        const candidates = this.neighbors4(i, j);
        // all sides of the tile grabbed from the tilesheets
        const id: Array<string> = indexes[parseInt(this.grid[i][j].frame.name)].split('');
        for (let x = 0; x < candidates.length; x++) {
          const coord = candidates[x];
          const a = this.unpack(coord)[0];
          const b = this.unpack(coord)[1];
          // find the id of the frame to use and what sides are available to join
          let flag = false;
          let rotate = false;
          if (curr.has(coord) && isTerrain(this.grid[a][b].name)) {
            const neighborId = indexes[parseInt(this.grid[a][b].frame.name)];
            const ip = this.getPixel(i);
            const jp = this.getPixel(j);
            const coordId = ip + ',' + jp;
            if (a > i) {
              if (neighborId[7] == '0' && id[3] == '0') {
                flag = true;
              }
            } else if (a < i) {
              if (neighborId[3] == '0' && id[7] == '0') {
                flag = true;
              }
            } else if (b > j) {
              if (neighborId[1] == '0' && id[5] == '0') {
                flag = true;
                rotate = true;
              }
            } else if (b < j) {
              if (neighborId[5] == '0' && id[1] == '0') {
                flag = true;
                rotate = true;
              }
            }
            if (flag) {
              const xp = ip + (a - i) * 25;
              const yp = jp + (b - j) * 25;
              const id = xp + ',' + yp;
              if (!(id in this.connectors)) {
                this.connectors[id] = game.add.image(xp, yp, 'connector');
                if (rotate) {
                  this.connectors[id].angle = 90;
                }
              }
            }
          }
        }
      }
    });
  }
}

export default AlignGrid;
