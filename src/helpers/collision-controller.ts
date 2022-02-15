import * as Phaser from 'phaser';
import CompoundCrate from '../objects/compoundCrate';
import Crate from '../objects/crate';
import { GameScene } from '../scenes/game-scene';
const monsterCollisionLabels = new Set<string>(['lizard', 'spider', 'fire', 'exit']);

function isMonster(s: string) {
  return s.includes('spider') || s.includes('lizard');
}
function isTerrain(s: string) {
  return s.includes('crate') || s.includes('steel') || s.includes('lava') || s.includes('dirt');
}
function isNonBurn(s: string) {
  return s.includes('steel') || s.includes('dirt');
}
function getTile(x: number, y: number) {
  return [Math.floor(x / 50), Math.floor(y / 50)];
}
function igniteCompound(game, curr: CompoundCrate, destroyFire) {
  if (destroyFire) {
    game.fire.destroy();
  }
  if (curr.onFire) {
    return;
  }
  curr.onFire = true;
  curr.crates.forEach((e) => {
    igniteCrate(game, e);
  });
  game.time.delayedCall(1000, () => {
    curr.crates.forEach((e) => {
      e.destroy(game);
    });
  });
}
// function igniteLava(game, currLava: Lava) {

// }
function igniteNeighbors(game, x, y, currCrate) {
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
        igniteCompound(game, e.owner, false);
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
function igniteCrate(game, currCrate: Crate) {
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
export const createCollisions = (game: GameScene): void => {
  game.matter.world.on('collisionstart', function (event) {
    const pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      const bodyA = pairs[i].bodyA;
      const bodyB = pairs[i].bodyB;
      const a = bodyA.label;
      const b = bodyB.label;
      if ((b.includes('lizard') && a === 'fire') || (a.includes('lizard') && b === 'fire')) {
        game.fire.destroy();
        game.fireActive = false;
        const lizard = a.includes('lizard') ? a : b;
        game.lizards[lizard].ignite(game);
      }
      if ((a == 'exit' && b == 'player') || (b == 'exit' && a == 'player')) {
        if (localStorage.getItem('useleveleditor') == 'false') {
          const currLevel = parseInt(localStorage.getItem('level'));
          const nextLevel = currLevel + 1;
          localStorage.setItem('level', nextLevel.toString());
        }
        game.scene.restart();
      }
      if ((a == 'fire' && b.includes('bomb')) || (b == 'fire' && a.includes('bomb'))) {
        const bomb = a.includes('bomb') ? a : b;
        game.bombs[bomb].makeExit(game);
        game.fire.destroy();
        game.fireActive = false;
      }
      if ((a == 'fire' && isNonBurn(b)) || (b == 'fire' && isNonBurn(a))) {
        game.fire.destroy();
        game.fireActive = false;
      }
      if ((a.includes('lizard') && b.includes('bomb')) || (b.includes('lizard') && a.includes('bomb'))) {
        const bomb = a.includes('bomb') ? a : b;
        const lizard = a.includes('lizard') ? a : b;
        if (game.lizards[lizard].onFire) {
          game.bombs[bomb].makeExit(game);
        }
      }
      if ((a.includes('lizard') && b == 'player') || (b.includes('lizard') && a == 'player')) {
        game.scene.restart();
      }
      if ((a.includes('spider') && b == 'player') || (b.includes('spider') && a == 'player')) {
        game.scene.restart();
      }
      if ((a.includes('crate') && b == 'player') || (b.includes('crate') && a == 'player')) {
        const crate = a.includes('crate') ? a : b;
        if (game.crates[crate].onFire) {
          game.scene.restart();
        }
      }
      if ((a.includes('crate') && b.includes('player')) || (b.includes('crate') && a.includes('player'))) {
        const crate = a.includes('crate') ? a : b;
        if (game.crates[crate].onFire) {
          game.scene.restart();
        }
      }
      if (
        (isTerrain(a) && b.includes('bomb') && bodyB.isSensor) ||
        (isTerrain(b) && a.includes('bomb') && bodyA.isSensor)
      ) {
        const bomb = a.includes('bomb') ? a : b;
        game.bombs[bomb].makeExit(game);
      }
      if ((a == 'playerRight' && isTerrain(b)) || (b == 'playerRight' && isTerrain(a))) {
        game.player.hittingRight = true;
      }
      if ((a == 'playerLeft' && isTerrain(b)) || (b == 'playerLeft' && isTerrain(a))) {
        game.player.hittingLeft = true;
      }
      if (a == 'playerTop' || b == 'playerTop') {
        const otherBody = a !== 'playerTop' ? bodyA : bodyB;
        if (otherBody.label != 'exit') {
          if (otherBody.velocity.y > 0 && game.player.sprite.body.velocity.y == 0) {
            game.scene.restart();
          } else {
            game.player.sprite.setVelocityY(0);
          }
        }
      }
      if ((b.includes('spider') && a === 'fire') || (a.includes('spider') && b === 'fire')) {
        game.fire.destroy();
        game.fireActive = false;
        const spider = b.includes('spider') ? b : a;
        game.spiders[spider].hitFire();
      }
      if ((b.includes('lizard') && a.includes('crate')) || (a.includes('lizard') && b.includes('crate'))) {
        const crate = a.includes('crate') ? a : b;
        const lizard = a.includes('crate') ? b : a;
        if (game.lizards[lizard].onFire) {
          igniteCompound(game, game.crates[crate].owner, false);
        }
        if (game.crates[crate].onFire) {
          game.lizards[lizard].ignite(game);
        }
      }
      if ((b.includes('spider') && a.includes('crate')) || (a.includes('spider') && b.includes('crate'))) {
        const crate = a.includes('crate') ? a : b;
        const spider = a.includes('crate') ? b : a;
        if (game.crates[crate].onFire) {
          game.spiders[spider].destroy();
        }
      }
      //  sensor collisions
      if (pairs[i].isSensor) {
        let playerBody;
        let otherBody;

        if (bodyA.isSensor) {
          playerBody = bodyA;
          otherBody = bodyB;
        } else if (bodyB.isSensor) {
          playerBody = bodyB;
          otherBody = bodyB;
        }

        if (playerBody.label === 'groundSensor' && otherBody.label != 'fire' && isTerrain(otherBody.label)) {
          game.player.touchingGround = true;
        }
      }
      // fire collision
      if (a === 'fire' && b.includes('crate')) {
        igniteCompound(game, game.crates[b].owner, true);
      }
      if (b === 'fire' && a.includes('crate')) {
        igniteCompound(game, game.crates[a].owner, true);
      }
      // update above section to comply with format
      if ((a === 'fire' && b.includes('lava')) || (b === 'fire' && a.includes('lava'))) {
        const lava = a.includes('lava') ? a : b;
        game.lavas[lava].ignite(game, game.tiles, game.xTiles, game.yTiles);
        game.fire.destroy();
      }
      if ((b.includes('spider') && a.includes('lizard')) || a.includes('spider' && b.includes('lizard)'))) {
        const spider = b.includes('spider') ? b : a;
        const lizard = b.includes('lizard') ? b : a;
        if (game.lizards[lizard].onFire && game.lizards[lizard].sprite.active) {
          game.spiders[spider].destroy();
        }
      }
      if ((isTerrain(a) && b.includes('lizTop')) || (isTerrain(b) && a.includes('lizTop'))) {
        const lizLabel = a.includes('lizTop') ? a : b;
        const lizId = lizLabel.substring(lizLabel.indexOf(',') + 1);
        game.lizards['lizard' + lizId].destroy();
      }
      if ((isTerrain(a) && b.includes('spiTop')) || (isTerrain(b) && a.includes('spiTop'))) {
        const spiLabel = a.includes('spiTop') ? a : b;
        const spiId = spiLabel.substring(spiLabel.indexOf(',') + 1);
        game.spiders['spider' + spiId].destroy();
      }
      if (
        (bodyA.isSensor && bodyA.ignoreGravity == false && isMonster(a)) ||
        (bodyB.isSensor && bodyB.ignoreGravity == false && isMonster(b))
      ) {
        const monsterBody = bodyA.isSensor ? bodyA : bodyB;
        const otherBody = bodyA.isSensor ? bodyB : bodyA;
        let turnFlag = true;
        monsterCollisionLabels.forEach((label) => {
          if (otherBody.label.includes(label)) {
            turnFlag = false;
          }
        });
        if (turnFlag) {
          if (monsterBody.label.includes('lizard')) {
            game.lizards[monsterBody.label].flip();
          } else {
            game.spiders[monsterBody.label].flip();
          }
        }
      }
    }
  });
  game.matter.world.on('collisionend', function (event) {
    const pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      const bodyA = pairs[i].bodyA;
      const bodyB = pairs[i].bodyB;
      const a = bodyA.label;
      const b = bodyB.label;
      if (a == 'playerRight' || b == 'playerRight') {
        game.player.hittingRight = false;
      }
      if (a == 'playerLeft' || b == 'playerLeft') {
        game.player.hittingLeft = false;
      }
    }
  });
  game.matter.world.on('collisionactive', function (event) {
    const pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      const bodyA = pairs[i].bodyA;
      const bodyB = pairs[i].bodyB;
      const a = bodyA.label;
      const b = bodyB.label;
      if ((a == 'playerRight' && isTerrain(b)) || (b == 'playerRight' && isTerrain(b))) {
        game.player.hittingRight = true;
      }
      if ((a == 'playerLeft' && isTerrain(b)) || (b == 'playerLeft' && isTerrain(b))) {
        game.player.hittingLeft = true;
      }
      if ((a.includes('lizard') && b.includes('bomb')) || (b.includes('lizard') && a.includes('bomb'))) {
        const bomb = a.includes('bomb') ? a : b;
        const lizard = a.includes('lizard') ? a : b;
        if (game.lizards[lizard].onFire) {
          game.bombs[bomb].makeExit(game);
        }
      }
      if ((a.includes('crate') && b.includes('bomb')) || (b.includes('crate') && a.includes('bomb'))) {
        const bomb = a.includes('bomb') ? a : b;
        const crate = a.includes('crate') ? a : b;
        if (game.crates[crate].onFire) {
          game.bombs[bomb].makeExit(game);
        }
      }
      if (a == 'playerTop' || b == 'playerTop') {
        const otherBody = a !== 'playerTop' ? bodyA : bodyB;
        if (otherBody.velocity.y >= 0 && game.player.sprite.body.velocity.y == 0) {
          game.scene.restart();
        } else {
          game.player.sprite.setVelocityY(0);
        }
      }
      if ((b.includes('spider') && a.includes('lizard')) || a.includes('spider' && b.includes('lizard)'))) {
        const spider = b.includes('spider') ? b : a;
        const lizard = b.includes('lizard') ? b : a;
        if (game.lizards[lizard].onFire && game.lizards[lizard].sprite.active) {
          game.spiders[spider].destroy();
        }
      }
      if ((a.includes('crate') && b.includes('player')) || (b.includes('crate') && a.includes('player'))) {
        const crate = a.includes('crate') ? a : b;
        if (game.crates[crate].onFire) {
          game.scene.restart();
        }
      }
      if (a.includes('rightEdgeL') || b.includes('rightEdgeL')) {
        const lizard = a.includes('rightEdgeL') ? a : b;
        //grab id number
        const id = parseInt(lizard.substring(lizard.indexOf(',') + 1));
        game.lizards['lizard' + id].rightEdge = true;
      }
      if (a.includes('leftEdgeL') || b.includes('leftEdgeL')) {
        const lizard = a.includes('leftEdgeL') ? a : b;
        //grab id number
        const id = parseInt(lizard.substring(lizard.indexOf(',') + 1));
        game.lizards['lizard' + id].leftEdge = true;
      }
      if (a.includes('rightEdgeS') || b.includes('rightEdgeS')) {
        const spider = a.includes('rightEdgeS') ? a : b;
        //grab id number
        const id = parseInt(spider.substring(spider.indexOf(',') + 1));
        game.spiders['spider' + id].rightEdge = true;
      }
      if (a.includes('lizard') && b.includes('lizard')) {
        if (game.lizards[a].onFire) {
          game.lizards[b].ignite(game);
        }
        if (game.lizards[b].onFire) {
          game.lizards[a].ignite(game);
        }
      }
      if (a.includes('leftEdgeS') || b.includes('leftEdgeS')) {
        const spider = a.includes('leftEdgeS') ? a : b;
        //grab id number
        const id = parseInt(spider.substring(spider.indexOf(',') + 1));
        game.spiders['spider' + id].leftEdge = true;
      }
    }
    // can probably condense the below section or combine lizard and spider object type
    for (const [key, value] of Object.entries(game.lizards)) {
      if (value.rightEdge == false) {
        value.flip();
        value.rightEdge = true;
      } else {
        value.rightEdge = false;
      }
      if (value.leftEdge == false) {
        value.flip();
        value.leftEdge = true;
      } else {
        value.leftEdge = false;
      }
    }
    for (const [key, value] of Object.entries(game.spiders)) {
      if (value.rightEdge == false) {
        value.flip();
        value.rightEdge = true;
      } else {
        value.rightEdge = false;
      }
      if (value.leftEdge == false) {
        value.flip();
        value.leftEdge = true;
      } else {
        value.leftEdge = false;
      }
    }
  });
};
