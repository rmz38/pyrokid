This project is built off Phaser example code and the Typescript setup found at https://shakuro.com/blog/phaser-js-a-step-by-step-tutorial-on-making-a-phaser-3-game/#part-1

## How to Use

Quoted from the above TypeScript tutorial: You should be able to clone this repository and run `yarn install` to get any of the necessary dependencies.

Once you're done installing, simply run `yarn dev` and the game should begin to run. You'll have to open an internet browser and go to the port that the game is running on (usually `localhost:8080` by default).

Running `yarn dev` runs the game in development mode, which produces larger bundle sizes but compiles faster and provides better debug support. If you desire a smaller game bundle or to host your game on a server, you can use `yarn build:prod` to compile the project into an optimized bundle. You can use `yarn prod` to run your game locally with production compilation, but this will cause your hot reloading to take longer.

TODO:

- kill other objects that fall down holes and hit world bounds, currently objects not destroyed
- have back to menu button show over other blocks.
- level 17 has a bug due to connector + dirt + connector.
- level 33 (26 here) has a bug with the fast burning?
- clean up UI for level select
- fix bug if spider falls while at edge it can get stuck (fixed? need to test more)
- add collision interaction where if crate is already touching enemy, it can also ignite them
- prevent blocks slowing down when they fall on top of enemies and kill them
- fireball zeroes player y velocity bug
- update lab 4 markdown instructions!!!
- add help screen during pause and in main menu

Notes: missing water bat and plated crates, so levels 15, 21, 28 are removed. Levels 27, 29, 30, 31, 37 will be adjusted or removed.

Credits to Sh'yee Meng and Lucien Eckert for creating animations!
