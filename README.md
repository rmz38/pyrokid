This project is built off Phaser example code and the Typescript setup found at https://shakuro.com/blog/phaser-js-a-step-by-step-tutorial-on-making-a-phaser-3-game/#part-1

## How to Use

Quoted from the above TypeScript tutorial: You should be able to clone this repository and run `yarn install` to get any of the necessary dependencies.

Once you're done installing, simply run `yarn dev` and the game should begin to run. You'll have to open an internet browser and go to the port that the game is running on (usually `localhost:8080` by default).

Running `yarn dev` runs the game in development mode, which produces larger bundle sizes but compiles faster and provides better debug support. If you desire a smaller game bundle or to host your game on a server, you can use `yarn build:prod` to compile the project into an optimized bundle. You can use `yarn prod` to run your game locally with production compilation, but this will cause your hot reloading to take longer.

TODO:
kill player and other objects that fall down holes and hit world bounds.
