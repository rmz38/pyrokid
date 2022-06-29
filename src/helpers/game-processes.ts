import { GameScene } from '../scenes/game-scene';
import { numLevels } from './init';
// TODO: move crate burning here later or refactor code
export const progressLevel = (game: GameScene): void => {
  if (localStorage.getItem('useleveleditor') == 'false') {
    const currLevel = parseInt(localStorage.getItem('level'));
    const nextLevel = currLevel + 1;
    if (nextLevel > numLevels) {
      game.scene.start('Credits');
    } else {
      localStorage.setItem('level', nextLevel.toString());
      game.scene.restart();
    }
  } else {
    game.scene.restart();
  }
};
