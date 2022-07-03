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
import Villager from './objects/villager';
import { GameScene } from './scenes/game-scene';

// lots of these functions are really for helping with block movement or burning
function isDynamicTerrain(s: string) {
  return s.includes('crate') || s.includes('steel');
}
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
export interface VillagerHash {
  [details: string]: Villager;
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
export function blockId(block: Terrain) {
  const [i, j] = getTileCenter(block.sprite.x, block.sprite.y);
  return i + ',' + j;
}
//center of tile in pixels, to set crate position, takes in pixel position
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
export function makeTipText(game: GameScene, level: integer, tips: any) {
  if (localStorage.getItem('useleveleditor') == 'false') {
    console.log(level);
    if (tips[level]) {
      for (let x = 0; x < tips[level].length; x++) {
        const textItem = tips[level][x];
        game.add
          .text(textItem.x, textItem.y, textItem.text, {
            color: '#FFFFFF',
            fontStyle: 'bold',
          })
          .setFontSize(20)
          .setDepth(2);
      }
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
    if (x >= 0 && x < game.yTiles && y >= 0 && y < game.xTiles && game.tiles[x][y]) {
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
export function updateDynamic(game: GameScene) {
  //TODO: FIX THIS CRAP AND MAKE SURE BLOCKS ABOVE A DESTROYED BLOCK WILL BE CHECKED IF ALSO BURNING OR NOT, PLUS CORRECTLY SET STATIC OR NOT
  const seen = new Set<Terrain>();
  game.staticBlockQueue.forEach((block: Terrain) => {
    seen.add(block);
    const [bx, by] = getTileCenter(block.sprite.x, block.sprite.y);
    //remove block from static blocks map
    delete game.blocks[bx + ',' + by]; // perhaps its not always in the map? might be due to bug
    ///

    block.sprite.setStatic(false);
    // ownedBlock.sprite.setPosition(bx, by);
    // ownedBlock.sprite.setStatic(true);
    ///
    block.sprite.tint = 0xffffff;
    game.dynamicBlockQueue.add(block);
    // block.owner.blocks.forEach((ownedBlock: Terrain) => {
    //   if (ownedBlock.sprite.active && ownedBlock.sprite.isStatic() && !seen.has(ownedBlock)) {
    //     seen.add(ownedBlock);
    //     const [bx, by] = getTileCenter(ownedBlock.sprite.x, ownedBlock.sprite.y);
    //     //remove block from static blocks map
    //     delete game.blocks[bx + ',' + by]; // perhaps its not always in the map? might be due to bug
    //     ///

    //     ownedBlock.sprite.setStatic(false);
    //     // ownedBlock.sprite.setPosition(bx, by);
    //     console.log(ownedBlock);
    //     // ownedBlock.sprite.setStatic(true);
    //     ///
    //     ownedBlock.sprite.tint = 0xffffff;
    //     game.dynamicBlockQueue.add(ownedBlock);
    //   }
    // });
  });
  game.staticBlockQueue.clear();
}
// export function updateDynamic(game: GameScene) {
//   //TODO: FIX THIS CRAP AND MAKE SURE BLOCKS ABOVE A DESTROYED BLOCK WILL BE CHECKED IF ALSO BURNING OR NOT, PLUS CORRECTLY SET STATIC OR NOT
//   const nextQueue: Array<Terrain> = [];
//   game.staticBlockQueue.forEach((block: Terrain) => {
//     let cont = true;
//     let counter = 0;
//     while (cont) {
//       //the above block
//       const [px, py] = getTileCenter(block.sprite.x, block.sprite.y - counter * 50);
//       const aboveBlock = game.blocks[px + ',' + py];
//       if (
//         aboveBlock &&
//         aboveBlock.sprite.active &&
//         aboveBlock.name != 'dirt' &&
//         !checkOwnerGrounded(game, aboveBlock)
//       ) {
//         //add all blocks to dynamicqueue until u hit a dirt?
//         //TODO make queue to set dynamic in order to sync
//         game.staticBlockQueue.push(aboveBlock);
//       } else {
//         // if a block is supported by something else
//         //TODO still need to consider connectors, only using compounds rn
//         cont = false;
//       }
//       counter += 1;
//     }

//     block.sprite.setStatic(false);
//     block.sprite.tint = 0xffffff;
//     game.dynamicBlockQueue.add(block);
//     //remove block from static blocks map
//     const [px, py] = getTileCenter(block.sprite.x, block.sprite.y);
//     delete game.blocks[px + ',' + py];
//   });
// }
//TODO: MOVE TO CRATE CLASS OR UTILS
export function igniteCrate(game: GameScene, currCrate: Crate) {
  if (currCrate.onFire) {
    return;
  }
  currCrate.onFire = true;
  currCrate.fireSprite = game.add.sprite(currCrate.sprite.x, currCrate.sprite.y - 10, 'squareFire');
  currCrate.fireSprite.anims.play('squareFire', false);
  currCrate.fireSprite.alpha = 0.7;
  game.time.delayedCall(600, () => {
    // TODO: move this fire stuff to the crate class
    if (currCrate.fireSprite.active && !currCrate.isLava) {
      currCrate.fireSprite.alpha = 0;
    }
    if (currCrate.sprite.active) {
      const pos = getTile(currCrate.sprite.x, currCrate.sprite.y);
      const x = pos[0];
      const y = pos[1];
      if (!currCrate.isLava) {
        const fireDisappear = game.add.sprite(currCrate.sprite.x, currCrate.sprite.y - 10, 'fireDisappear');
        fireDisappear.anims.play('fireDisappear', false);
        fireDisappear.once('animationcomplete', () => {
          fireDisappear.alpha = 0;
        });
        // currCrate.owner.blocks.forEach((crate: Crate) => {
        //   game.destroyQueue.add(crate);
        //   //remove destroyed crate, might need to do this for all other crates too
        //   delete game.blocks[blockId(crate)];
        // });
        currCrate.owner.blocks.forEach((e: Crate) => {
          game.destroyQueue.add(e);
        });
        game.destroyQueue.add(currCrate);
        //remove destroyed crate, might need to do this for all other crates too
        if (game.blocks[blockId(currCrate)] == currCrate) {
          delete game.blocks[blockId(currCrate)];
        }
        ///////////////////////////////
        let curr: Set<Terrain>;
        let next = new Set<Terrain>();
        const seen = new Set<Terrain>();
        const tempQueue = new Set<Terrain>();
        // const [px, py] = getTileCenter(currCrate.sprite.x, currCrate.sprite.y - 50);
        // const aboveBlock = game.blocks[px + ',' + py];
        currCrate.getConnected(new Set<Terrain>(), game).forEach((connectedToCrate: Terrain) => {
          if (
            connectedToCrate && // is not undefined
            !seen.has(connectedToCrate) &&
            connectedToCrate.sprite.active &&
            isDynamicTerrain(connectedToCrate.sprite.name) &&
            // !currBlock.owner.blocks.has(aboveBlock) && //REDUNDANT?
            !checkOwnerGrounded(game, connectedToCrate, tempQueue) &&
            connectedToCrate.sprite.name != 'dirt'
          ) {
            next.add(connectedToCrate);
            seen.add(connectedToCrate);
            game.staticBlockQueue.add(connectedToCrate);
          }
        });
        next.add(currCrate);
        seen.add(currCrate);
        while (next.size > 0) {
          curr = next;
          next = new Set<Terrain>();
          curr.forEach((currBlock: Terrain) => {
            //the above block
            if (currBlock && currBlock.sprite.active) {
              const [px, py] = getTileCenter(currBlock.sprite.x, currBlock.sprite.y - 50);
              const aboveBlock: Terrain = game.blocks[px + ',' + py];
              if (
                aboveBlock &&
                !seen.has(aboveBlock) &&
                aboveBlock.sprite.active &&
                isDynamicTerrain(aboveBlock.sprite.name) &&
                // !currBlock.owner.blocks.has(aboveBlock) && //REDUNDANT?
                !checkOwnerGrounded(game, aboveBlock, tempQueue) &&
                currBlock.sprite.name != 'dirt'
              ) {
                // check compound blocks
                aboveBlock.owner.blocks.forEach((block: Terrain) => {
                  if (!seen.has(block) && block.sprite.name != 'dirt') {
                    next.add(block);
                    seen.add(block);
                    game.staticBlockQueue.add(block);
                  }
                });
                // check any block connected with connectors
                aboveBlock.owner.getConnected(game).forEach((block: Terrain) => {
                  if (!seen.has(block) && block.sprite.name != 'dirt') {
                    next.add(block);
                    seen.add(block);
                    game.staticBlockQueue.add(block);
                  }
                });

                // next.add(aboveBlock);
                // seen.add(aboveBlock);
                // game.staticBlockQueue.add(aboveBlock);

                //CHANGE TO SET SINCE LIST NOT CASH MONEY, REVISE THIS GARBAGE
                // game.staticBlockQueue.add(aboveBlock);
              }
            }
          });
        }
        // tempQueue.forEach((elem: Terrain) => game.staticBlockQueue.add(elem));
        ////////////////////////////////
      }
      igniteNeighbors(game, x, y, currCrate);
    }
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
    //LEFT OFF HERE CHECK IF CRATE THEN PRINT
    if (isDynamicTerrain((block as Terrain).sprite.name)) {
      const connected = (block as Terrain).owner.getConnected(game);
      let connectedToStatic = false;
      connected.forEach((connectedBlock: Terrain) => {
        // console.log(connectedBlock);
        if (connectedBlock.sprite.active && connectedBlock.sprite.isStatic()) {
          connectedToStatic = true;
        }
      });
      if (connectedToStatic) {
        (block as Terrain).setGrounded();
      }
      if (!(block as Terrain).sprite.isStatic()) {
        game.dynamicBlockQueue.add(block as Terrain);
        delete game.blocks[pos];
      }
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
    const [dx, dy] = getDiffFromTileCenter(block.sprite.x, block.sprite.y);
    const [px, py] = getTileCenter(block.sprite.x, block.sprite.y);
    const downId = px + ',' + (py + 50);
    // console.log(game.blocks);
    if (block.sprite.active) {
      //TODO MAYBE CHECK IF IN MAP ALREADY, add both curr and already in map block back into the queue to guarantee no bugs if slot is already occupied, or replace with grounded check
      if (
        dy < 17 &&
        game.blocks[downId] &&
        game.blocks[downId].sprite.active &&
        // !block.sprite.isStatic() && // block itself is not static already
        !game.blocks[downId].owner.blocks.has(block) &&
        !game.blocks[downId].owner.getConnected(game).has(block) &&
        game.blocks[downId].sprite.isStatic() &&
        !game.destroyQueue.has(game.blocks[downId])
      ) {
        block.owner.setAllGrounded(game);
        //TODO add all blocks in compound instead of just this, to enforce precondition of all blocks being dynamic in queue
        toAddToMap[px + ',' + py] = block;
      } else if (!block.sprite.isStatic()) {
        if (block.sprite.body.velocity.y > 8) block.sprite.setVelocityY(8);
        nextQueue.add(block);
      } else if (block.sprite.active && block.sprite.isStatic()) {
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
// check if to make block non static in case blocks are destroyed
function checkBlockGrounded(
  game: GameScene,
  block: Terrain,
  tempQueue: Set<Terrain>,
  connectedBlocks: Set<Terrain>,
): boolean {
  //const [dx, dy] = getDiffFromTileCenter(block.sprite.x, block.sprite.y);
  // TODO EDGE CASE OF OTHER BLOCKS ABOVE ONE THAT FELL DOWN IF A SPECIAL LONG SHAPE
  // TODO ALSO IF [][][]
  //                [][]
  //                  [] MIGHT HAVE ISSUES CHECKING GROUNDED
  const [px, py] = getTileCenter(block.sprite.x, block.sprite.y);
  const downId = px + ',' + (py + 50);
  const downBlock = game.blocks[downId];
  // console.log(game.blocks[downId]);
  if (block.sprite.active) {
    return (
      downBlock &&
      downBlock.sprite.active &&
      downBlock.sprite.isStatic() &&
      !game.staticBlockQueue.has(downBlock) && // not in queue to become unstatic
      !tempQueue.has(downBlock) &&
      !game.destroyQueue.has(downBlock) && // not about to be destroyed
      isDynamicTerrain(downBlock.sprite.name) && // can't become unstatic if is dirt
      !block.owner.blocks.has(downBlock) &&
      !connectedBlocks.has(downBlock)
    );
  }
}

// since this checks if all blocks except the ones above the one destroyed (given in parameters),
// we remove that block. and check the other blocks in its compound
function checkOwnerGrounded(game: GameScene, block: Terrain, tempQueue: Set<Terrain>): boolean {
  let result = false;
  const owner = block.owner;
  const blocks = new Set(owner.blocks);
  blocks.delete(block);
  const connected = owner.getConnected(game);
  // TODO: might actually have to combine all blocks for the check
  blocks.forEach((block: Terrain) => {
    //if any blocks are grounded in a compound, the whole compound is grounded
    if (checkBlockGrounded(game, block, tempQueue, connected)) {
      result = true;
    }
  });
  // TODO: this might be redundant, might want to fix this, for the connected blocks if they should ground too
  connected.forEach((block: Terrain) => {
    if (checkBlockGrounded(game, block, tempQueue, connected)) {
      result = true;
    }
  });
  // console.log(result);
  return result;
}
