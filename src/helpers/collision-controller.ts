import * as Phaser from 'phaser';
import CompoundCrate from '../objects/compoundCrate';
import Crate from '../objects/crate';
import { GameScene } from '../scenes/game-scene';

function isMonster(s: string) {
  return s.includes('spider') || s.includes('lizard');
}
function isTerrain(s: string) {
  return s.includes('crate') || s.includes('steel') || s.includes('lava') || s.includes('dirt');
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
      e.destroy();
    });
  });
}
// function igniteLava(game, currLava: Lava) {

// }

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
    if (currCrate.fireSprite.active) {
      currCrate.fireSprite.destroy();
    }
    const fireDisappear = game.add.sprite(currCrate.sprite.x, currCrate.sprite.y - 10, 'fireDisappear');
    fireDisappear.anims.play('fireDisappear', false, true);
    fireDisappear.once('animationcomplete', () => {
      fireDisappear.destroy();
    });
    const pos = getTile(currCrate.sprite.x, currCrate.sprite.y);
    const x = pos[0];
    const y = pos[1];
    const candidates = [
      [x - 1, y],
      [x + 1, y],
      [x, y + 1],
      [x, y - 1],
    ];
    for (let i = 0; i < candidates.length; i++) {
      const x = candidates[i][0];
      const y = candidates[i][1];
      if (x >= 0 && x < game.xTiles && y >= 0 && y < game.yTiles) {
        tiles[x][y].forEach((e) => {
          if (e instanceof Crate) {
            igniteCompound(game, e.owner, false);
          } else {
            e.ignite(game, tiles, xTiles, yTiles);
          }
        });
      }
    }
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
      console.log(a);
      console.log(b);
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
      if ((a.includes('lizard') && b == 'player') || (b.includes('lizard') && a == 'player')) {
        game.scene.restart();
      }
      if ((a.includes('spider') && b == 'player') || (b.includes('spider') && a == 'player')) {
        game.scene.restart();
      }
      if ((a.includes('lava') && b == 'player') || (b.includes('lava') && a == 'player')) {
        const lava = a.includes('lava') ? a : b;
        if (game.lavas[lava].onFire) {
          game.scene.restart();
        }
      }
      if ((a.includes('crate') && b == 'player') || (b.includes('crate') && a == 'player')) {
        const crate = a.includes('crate') ? a : b;
        if (game.crates[crate].onFire) {
          game.scene.restart();
        }
      }
      if (a == 'playerTop' || b == 'playerTop') {
        const otherBody = a !== 'playerTop' ? bodyA : bodyB;
        console.log(otherBody);
        if (otherBody.velocity.y > 0) {
          game.scene.restart();
        }
      }
      if ((b.includes('spider') && a === 'fire') || (a.includes('spider') && b === 'fire')) {
        game.fire.destroy();
        game.fireActive = false;
        const spider = b.includes('spider') ? b : a;
        game.spiders[spider].hitFire();
      }
      if ((b.includes('lizard') && a.includes('lava')) || (a.includes('lizard') && b.includes('lava'))) {
        const lava = a.includes('lava') ? a : b;
        const lizard = a.includes('lava') ? b : a;
        console.log(lizard);
        if (game.lizards[lizard].onFire) {
          game.lavas[lava].ignite(game, tiles, game.xTiles, game.yTiles);
        }
        if (game.lavas[lava].onFire) {
          game.lizards[lizard].ignite(game);
        }
      }
      if ((a.includes('lizard') && b.includes('crate')) || (b.includes('lizard') && a.includes('crate'))) {
        const crate = a.includes('crate') ? a : b;
        const lizard = a.includes('lizard') ? a : b;
        if (game.lizards[lizard].onFire) {
          igniteCompound(game, game.crates[crate].owner, false);
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

        if (playerBody.label === 'groundSensor' && otherBody.label != 'fire') {
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
        game.lavas[lava].ignite(game, tiles, game.xTiles, game.yTiles);
        game.fire.destroy();
      }
      if ((b.includes('spider') && a.includes('lizard')) || a.includes('spider' && b.includes('lizard)'))) {
        const spider = b.includes('spider') ? b : a;
        const lizard = b.includes('lizard') ? b : a;
        if (game.lizards[lizard].onFire && game.lizards[lizard].sprite.active) {
          game.spiders[spider].hitLizard();
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
      if ((bodyA.isSensor && isMonster(a)) || (bodyB.isSensor && isMonster(b))) {
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
};
