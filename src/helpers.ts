import * as Phaser from 'phaser';
import { indexes } from './helpers/clump';
import Bomb from './objects/bomb';
import Compound from './objects/compound';
import Crate from './objects/crate';
import Dirt from './objects/dirt';
import Lava from './objects/lava';
import Lizard from './objects/lizard';
import Spider from './objects/spider';
import Terrain from './objects/terrain';
import { GameScene } from './scenes/game-scene';

export const getGameWidth = (scene: Phaser.Scene): number => {
  return scene.game.scale.width;
};

export const getGameHeight = (scene: Phaser.Scene): number => {
  return scene.game.scale.height;
};

export interface CrateHash {
  [details: string]: Crate;
}
export interface LavaHash {
  [details: string]: Lava;
}
export interface LizardHash {
  [details: string]: Lizard;
}
export interface SpiderHash {
  [details: string]: Spider;
}
export interface BombHash {
  [details: string]: Bomb;
}
export interface DirtHash {
  [details: string]: Dirt;
}

export function getTile(x: number, y: number) {
  return [Math.floor(x / 50), Math.floor(y / 50)];
}
export function getDiffFromTileCenter(x: number, y: number) {
  const [i, j] = getTile(x, y);
  return [Math.abs(i * 50 + 25 - x), Math.abs(j * 50 + 25 - y)];
}
//center of tile in pixels, to set crate position
export function getTileCenter(x: number, y: number) {
  const [i, j] = getTile(x, y);
  return [i * 50 + 25, j * 50 + 25];
}
export function clearTiles(game: GameScene) {
  for (let i = 0; i < game.tiles.length; i++) {
    for (let j = 0; j < game.tiles[0].length; j++) {
      game.tiles[i][j].clear();
    }
  }
}
export function igniteCompound(game, curr: Compound) {
  if (curr.onFire) {
    return;
  }
  curr.onFire = true;
  curr.blocks.forEach((e: Crate) => {
    igniteCrate(game, e);
  });
  game.time.delayedCall(1000, () => {
    curr.blocks.forEach((e: Crate) => {
      e.destroy(game);
    });
  });
}
// function igniteLava(game, currLava: Lava) {

// }
// TODO ADD ABOVE BLOCKS TO DYNAMIC QUEUE WHEN CONNECTED CRATE IS DESTROYED
export function igniteNeighbors(game, x, y, currCrate) {
  const candidates = [
    [x - 1, y],
    [x + 1, y],
    [x, y + 1],
    [x, y - 1],
  ];
  for (let i = 0; i < candidates.length; i++) {
    const x = candidates[i][0];
    const y = candidates[i][1];
    if (x >= 0 && x < game.xTiles && y >= 0 && y < game.yTiles && game.tiles[x][y]) {
      game.tiles[x][y].forEach((e) => {
        game.burnQueue.add(e.owner);
      });
    }
  }
  if (currCrate.isLava) {
    game.time.delayedCall(1000, () => {
      const pos = getTile(currCrate.sprite.x, currCrate.sprite.y);
      const xi = pos[0];
      const yi = pos[1];
      igniteNeighbors(game, xi, yi, currCrate);
    });
  }
}
//TODO: MOVE TO CRATE CLASS OR UTILS
export function igniteCrate(game, currCrate: Crate) {
  if (currCrate.onFire) {
    return;
  }
  currCrate.onFire = true;
  currCrate.fireSprite = game.add.sprite(currCrate.sprite.x, currCrate.sprite.y - 10, 'squareFire');
  currCrate.fireSprite.anims.play('squareFire', false);
  currCrate.fireSprite.alpha = 0.7;
  game.time.delayedCall(1000, () => {
    if (currCrate.fireSprite.active && !currCrate.isLava) {
      currCrate.fireSprite.alpha = 0;
    }
    if (!currCrate.isLava) {
      const fireDisappear = game.add.sprite(currCrate.sprite.x, currCrate.sprite.y - 10, 'fireDisappear');
      fireDisappear.anims.play('fireDisappear', false, true);
      fireDisappear.once('animationcomplete', () => {
        fireDisappear.alpha = 0;
      });
    }
    const pos = getTile(currCrate.sprite.x, currCrate.sprite.y);
    const x = pos[0];
    const y = pos[1];
    igniteNeighbors(game, x, y, currCrate);
  });
}
// assumes valid set of blocks given eg only crates or only steel blocks
export function compoundBlocks(game, blocks) {
  const trackBlocks = new Set<string>();
  blocks.forEach((e) => {
    const name = e.x + ',' + e.y;
    if (!trackBlocks.has(name)) {
      let curr = [name];
      let next = [];
      const toCompound = new Set<Terrain>();
      while (curr.length != 0) {
        curr.forEach((i) => {
          const id = indexes[parseInt(game.blocks[i].sprite.frame.name)];
          // odd numbers are sides
          const sides = id.split('');
          trackBlocks.add(i);
          toCompound.add(game.blocks[i]);
          const x = game.blocks[i].sprite.x;
          const y = game.blocks[i].sprite.y;
          const up = x + ',' + (y - 50);
          const right = x + 50 + ',' + y;
          const down = x + ',' + (y + 50);
          const left = x - 50 + ',' + y;
          function compoundCrates(tile, game) {
            next.push(tile);
            trackBlocks.add(tile);
            toCompound.add(game.blocks[tile]);
          }
          if (sides[1] == 1 && !trackBlocks.has(up)) {
            compoundCrates(up, game);
          }
          if (sides[3] == 1 && !trackBlocks.has(right)) {
            compoundCrates(right, game);
          }
          if (sides[5] == 1 && !trackBlocks.has(down)) {
            compoundCrates(down, game);
          }
          if (sides[7] == 1 && !trackBlocks.has(left)) {
            compoundCrates(left, game);
          }
        });
        curr = next;
        next = [];
      }
      new Compound(game, toCompound);
    }
  });
}
function unpack(coord: string): Array<integer> {
  const split = coord.indexOf(',');
  const i = parseInt(coord.substring(0, split));
  const j = parseInt(coord.substring(split + 1));
  return [i, j];
}

//CALL AFTER ALL COMPOUNDING IS DONE SINCE GAME.BLOCKS IS USED THERE TOO
export function initDynamicAndStaticQueues(game: GameScene) {
  game.dynamicBlockQueue.clear();
  for (const [pos, block] of Object.entries(game.blocks)) {
    //const [x, y] = unpack(pos);
    if (!(block as Terrain).sprite.isStatic()) {
      game.dynamicBlockQueue.add(block as Terrain);
      delete game.blocks[pos];
    }
  }
}
export function updateStatic(game: GameScene) {
  //HAVE TO MAKE COPY OF BLOCK MAP OR ELSE OLD POSITION GETS ERASED BY NEW THINGS?
  //OTHER BLOCKS CONFLICT ATM
  const toDeleteInMap = new Set<Terrain>();
  const toAddToMap = {};
  const nextQueue = new Set<Terrain>();
  game.dynamicBlockQueue.forEach((block: Terrain) => {
    //ACTUALLY JUST ADD THE BLOCK ITSELF CAUSE STRING AINT WORKING
    //HAVE BLOCKPOS ONLY CONTAIN BLOCKS THAT ARE STATIC
    //MAKE BLOCKS HOMELESS LELELELEL
    //console.log(blockPos);
    //console.log(game.blocks);
    const [dx, dy] = getDiffFromTileCenter(block.sprite.x, block.sprite.y);
    const [px, py] = getTileCenter(block.sprite.x, block.sprite.y);
    const downId = px + ',' + (py + 50);
    console.log(game.blocks);
    if (block.sprite.active) {
      if (dy < 17 && game.blocks[downId] && game.blocks[downId].sprite.isStatic()) {
        block.owner.setAllGrounded();
        // toDeleteInMap.add(block);
        toAddToMap[px + ',' + py] = block;
      } else if (!block.sprite.isStatic()) {
        // toDeleteInMap.add(block);
        // toAddToMap[px + ',' + py] = block;
        if (block.sprite.body.velocity.y > 12) block.sprite.setVelocityY(12);
        nextQueue.add(block);
      } else if (block.sprite.isStatic()) {
        toAddToMap[px + ',' + py] = block;
      }
    }
  });
  for (const [key, value] of Object.entries(toAddToMap)) {
    game.blocks[key] = value;
  }
  game.dynamicBlockQueue = nextQueue;
  //ultimate test, single crates and lots of clumped up crates
}

export function updateDyanmic(game: GameScene) {}
