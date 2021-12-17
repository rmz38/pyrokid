webpackHotUpdate("app",{

/***/ "./src/scenes/game-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/game-scene.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.GameScene = void 0;\nvar player_1 = __webpack_require__(/*! ../objects/player */ \"./src/objects/player.ts\");\nvar crate_1 = __webpack_require__(/*! ../objects/crate */ \"./src/objects/crate.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'Game',\n};\nvar player;\nvar platforms;\nvar cursors;\nvar wasd;\n// interface Crate {\n//   crate: any;\n//   onFire: boolean;\n//   neighbors: Set<Crate>;\n//   fireSprite: Phaser.GameObjects.Sprite;\n// }\nvar crates = {};\nvar fire;\nvar fireActive = false;\nvar TILE_SIZE = 50;\nvar xTiles = Math.floor(800 / TILE_SIZE);\nvar yTiles = Math.floor(600 / TILE_SIZE);\nvar bat;\nvar tiles = [];\nfor (var i = 0; i < xTiles; i++) {\n    var row = [];\n    for (var j = 0; j < yTiles; j++) {\n        row.push(new Set());\n    }\n    tiles.push(row);\n}\nfunction getTile(x, y) {\n    return [Math.floor(x / 50), Math.floor(y / 50)];\n}\nfunction clearTiles() {\n    for (var i = 0; i < tiles.length; i++) {\n        for (var j = 0; j < tiles[0].length; j++) {\n            tiles[i][j].clear();\n        }\n    }\n}\n// let house: House;\nfunction igniteCrate(game, currCrate, destroyFire) {\n    console.log(tiles);\n    console.log(currCrate);\n    if (destroyFire) {\n        fire.destroy();\n    }\n    if (currCrate.onFire) {\n        return;\n    }\n    currCrate.onFire = true;\n    currCrate.fireSprite = game.add.sprite(currCrate.crate.x, currCrate.crate.y - 10, 'squareFire');\n    currCrate.fireSprite.anims.play('squareFire', false);\n    currCrate.fireSprite.alpha = 0.7;\n    game.time.delayedCall(1000, function () {\n        if (currCrate.fireSprite.active) {\n            currCrate.fireSprite.destroy();\n        }\n        var fireDisappear = game.add.sprite(currCrate.crate.x, currCrate.crate.y - 10, 'fireDisappear');\n        fireDisappear.anims.play('fireDisappear', false, true);\n        fireDisappear.once('animationcomplete', function () {\n            fireDisappear.destroy();\n        });\n        var pos = getTile(currCrate.crate.x, currCrate.crate.y);\n        var x = pos[0];\n        var y = pos[1];\n        console.log(pos);\n        var candidates = [\n            [x - 1, y],\n            [x + 1, y],\n            [x, y + 1],\n            [x, y - 1],\n        ];\n        for (var i = 0; i < candidates.length; i++) {\n            var x_1 = candidates[i][0];\n            var y_1 = candidates[i][1];\n            if (x_1 >= 0 && x_1 < xTiles && y_1 >= 0 && y_1 < yTiles) {\n                console.log(candidates);\n                tiles[x_1][y_1].forEach(function (e) {\n                    igniteCrate(game, e, false);\n                });\n            }\n        }\n        if (currCrate.crate.active) {\n            currCrate.crate.destroy();\n        }\n    });\n}\n// function igniteHouse(game, currHouse: House, destroyFire) {\n//   if (destroyFire) {\n//     fire.destroy();\n//   }\n//   if (currHouse.onFire) {\n//     return;\n//   }\n//   currHouse.onFire = true;\n//   house.crates.forEach((crate) => {\n//     igniteCrate(game, crate, true);\n//   });\n//   game.time.delayedCall(1000, () => {\n//     house.house.destroy();\n//   });\n// }\n// setTimeout(() => {\n//   const fireDisappear = game.add.sprite(currCrate.crate.x, currCrate.crate.y - 10, 'fireDisappear');\n//   fireDisappear.anims.play('fireDisappear', false, true);\n//   fireDisappear.once('animationcomplete', () => {\n//     fireDisappear.destroy();\n//   });\n//   currCrate.neighbors.forEach((neighbor) => {\n//     if (neighbor.crate.active) {\n//       igniteCrate(game, neighbor, false);\n//     }\n//   });\n//   currCrate.crate.destroy();\n//   squareFire.destroy();\n// }, 1000);\nfunction addNeighbor(crate1, crate2) {\n    // crate1.neighbors.clear();\n    // crate2.neighbors.clear();\n    var xDiff = Math.abs(Math.floor(crate1.crate.x / xTiles) - Math.floor(crate2.crate.x / xTiles));\n    var yDiff = Math.abs(Math.floor(crate1.crate.y / yTiles) - Math.floor(crate2.crate.y / yTiles));\n    if ((xDiff < 2 && yDiff < 1) || (xDiff < 1 && yDiff < 2)) {\n        if (crate2.crate.active && crate1.crate.active) {\n            if (!crate2.onFire) {\n                crate1.neighbors.add(crate2);\n            }\n            if (!crate1.onFire) {\n                crate2.neighbors.add(crate1);\n            }\n        }\n    }\n}\nvar GameScene = /** @class */ (function (_super) {\n    __extends(GameScene, _super);\n    function GameScene() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        return _this;\n    }\n    GameScene.prototype.preload = function () {\n        this.load.image('background', 'assets/backgrounds/TutorialBackground1.png');\n        this.load.image('ground', 'assets/squares/platform.png');\n        this.load.image('house', 'assets/squares/house.png');\n        this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 38, frameHeight: 19 });\n        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });\n        this.load.spritesheet('crate', 'assets/squares/crate.png', { frameWidth: 79, frameHeight: 80 });\n        this.load.spritesheet('squareFire', 'assets/squares/squareFire.png', { frameWidth: 79, frameHeight: 80 });\n        this.load.spritesheet('fireDisappear', 'assets/squares/fireDisappear.png', { frameWidth: 84, frameHeight: 133 });\n    };\n    GameScene.prototype.create = function () {\n        this.add.image(400, 300, 'background');\n        this.matter.world.setBounds(0, 0, 800, 600, 32, true, true, false, true);\n        // platforms = this.matter.add.sprite(400, 568, 'ground');\n        player = new player_1.default(this);\n        this.anims.create({\n            key: 'cratepic',\n            frames: this.anims.generateFrameNumbers('crate', { start: 0, end: 0 }),\n            frameRate: 10,\n            repeat: -1,\n        });\n        this.anims.create({\n            key: 'squareFire',\n            frames: this.anims.generateFrameNumbers('squareFire', { start: 0, end: 5 }),\n            frameRate: 30,\n            repeat: -1,\n        });\n        this.anims.create({\n            key: 'fireball',\n            frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 1 }),\n            frameRate: 10,\n            repeat: -1,\n        });\n        this.anims.create({\n            key: 'fireDisappear',\n            frames: this.anims.generateFrameNumbers('fireDisappear', { start: 0, end: 39 }),\n            frameRate: 60,\n        });\n        cursors = this.input.keyboard.createCursorKeys();\n        wasd = this.input.keyboard.addKeys('W,S,A,D');\n        for (var i = 0; i < 5; i += 1) {\n            var label = 'crate_' + i;\n            crates[label] = new crate_1.default(this, 400, 550 - i * 50, label);\n            // const top = this.matter.bodies.rectangle(0, -25, 10, 1, { isSensor: true, label: label });\n            // const right = this.matter.bodies.rectangle(25, 0, 1, 10, { isSensor: true, label: label });\n            // const bottom = this.matter.bodies.rectangle(0, 25, 10, 1, { isSensor: true, label: label });\n            // const left = this.matter.bodies.rectangle(-25, 0, 1, 10, { isSensor: true, label: label });\n            // const rec = this.matter.bodies.rectangle(0, 0, 50, 50);\n            // const compound = this.matter.body.create({\n            //   parts: [top, right, bottom, left, rec],\n            //   inertia: Infinity,\n            //   render: { sprite: { xOffset: 0, yOffset: 0.15 } },\n            // });\n            // crates[label].crate.setExistingBody(compound);\n            crates[label].crate.setRectangle(50, 50, { render: { sprite: { xOffset: 0, yOffset: 0.15 } }, label: label });\n            // crates[label].crate.body.setInertia(Infinity);\n            crates[label].crate.setBounce(0);\n            crates[label].crate.setPosition(400, 550 - i * 50);\n            // hash instead, tilize\n        }\n        for (var i = 0; i < 5; i += 1) {\n            var label = 'crate_' + i;\n            crates[label] = new crate_1.default(this, 450, 550 - i * 50, label);\n            // const top = this.matter.bodies.rectangle(0, -25, 10, 1, { isSensor: true, label: label });\n            // const right = this.matter.bodies.rectangle(25, 0, 1, 10, { isSensor: true, label: label });\n            // const bottom = this.matter.bodies.rectangle(0, 25, 10, 1, { isSensor: true, label: label });\n            // const left = this.matter.bodies.rectangle(-25, 0, 1, 10, { isSensor: true, label: label });\n            // const rec = this.matter.bodies.rectangle(0, 0, 50, 50);\n            // const compound = this.matter.body.create({\n            //   parts: [top, right, bottom, left, rec],\n            //   inertia: Infinity,\n            //   render: { sprite: { xOffset: 0, yOffset: 0.15 } },\n            // });\n            // crates[label].crate.setExistingBody(compound);\n            crates[label].crate.setRectangle(50, 50, { render: { sprite: { xOffset: 0, yOffset: 0.15 } }, label: label });\n            // crates[label].crate.body.setInertia(Infinity);\n            crates[label].crate.setBounce(0);\n            crates[label].crate.setPosition(400, 550 - i * 50);\n            // hash instead, tilize\n        }\n        // house = {\n        //   house: this.matter.add.sprite(175, 450, 'house', 0, { label: 'house' }),\n        //   crates: new Set(),\n        //   onFire: false,\n        // };\n        // for (let i = 0; i < 4; i += 1) {\n        //   for (let j = 0; j < 3; j += 1) {\n        //     const label = 'house' + i;\n        //     const currCrate = {\n        //       // crate: this.matter.add.sprite(200, 550 - i * 50, 'crate', null, { label: label, isSensor: true }),\n        //       // crate: this.matter.bodies.rectangle(200, 200, 50, 50, { label: 'rectangle', isSensor: true }),\n        //     //   crate: { x: 200 + j * 50, y: 550 - i * 50 },\n        //     //   onFire: false,\n        //     //   fireSprite: null,\n        //     //   neighbors: new Set<Crate>(),\n        //     // };\n        //     // house.crates.add(currCrate);\n        //     // house.crates[label].crate.setRectangle(50, 50, {\n        //     //   render: { sprite: { xOffset: 0, yOffset: 0.15 } },\n        //     //   label: label,\n        //     // });\n        //     // house.crates[label].crate.setBounce(0);\n        //     // house.crates[label].crate.setPosition(200 + j * 50, 550 - i * 50);\n        //   }\n        // }\n        var game = this;\n        this.matter.world.on('collisionstart', function (event) {\n            //  Loop through all of the collision pairs\n            Object.keys(crates).forEach(function (key) {\n                var crate = crates[key];\n                crate.neighbors.clear();\n            });\n            var pairs = event.pairs;\n            for (var i = 0; i < pairs.length; i++) {\n                var bodyA = pairs[i].bodyA;\n                var bodyB = pairs[i].bodyB;\n                //  sensor collisions\n                if (pairs[i].isSensor) {\n                    var playerBody = void 0;\n                    var otherBody = void 0;\n                    if (bodyA.isSensor) {\n                        playerBody = bodyA;\n                        otherBody = bodyB;\n                    }\n                    else if (bodyB.isSensor) {\n                        playerBody = bodyB;\n                        otherBody = bodyB;\n                    }\n                    if (playerBody.label === 'groundSensor' && otherBody.label != 'fire') {\n                        player.touchingGround = true;\n                    }\n                }\n                // fire collision\n                if (bodyA.label === 'fire' && bodyB.label.includes('crate')) {\n                    igniteCrate(game, crates[bodyB.label], true);\n                }\n                if (bodyB.label === 'fire' && bodyA.label.includes('crate')) {\n                    igniteCrate(game, crates[bodyA.label], true);\n                }\n                if (bodyA.label === 'fire' && bodyB.label.includes('house')) {\n                    // Object.keys(house.crates).forEach((key) => {\n                    // igniteCrate(game, house.crates[key], true);\n                    // });\n                }\n                if (bodyB.label === 'fire' && bodyA.label.includes('house')) {\n                    // igniteHouse(game, house, true);\n                }\n                // if (bodyA.label.includes('crate') && bodyB.label.includes('crate')) {\n                //   addNeighbor(crates[bodyA.label], crates[bodyB.label]);\n                // }\n            }\n        });\n        this.matter.world.on('collisionactive', function (event) {\n            //  Loop through all of the collision pairs\n            var pairs = event.pairs;\n            for (var i = 0; i < pairs.length; i++) {\n                var bodyA = pairs[i].bodyA;\n                var bodyB = pairs[i].bodyB;\n                if (bodyA.label.includes('crate') && bodyB.label.includes('crate')) {\n                    addNeighbor(crates[bodyA.label], crates[bodyB.label]);\n                }\n            }\n        });\n    };\n    GameScene.prototype.update = function () {\n        clearTiles();\n        // add to tiles\n        Object.keys(crates).forEach(function (key) {\n            var curr = crates[key];\n            if (curr.crate.active) {\n                var pos = getTile(curr.crate.x, curr.crate.y);\n                tiles[pos[0]][pos[1]].add(curr);\n            }\n        });\n        if (wasd.A.isDown) {\n            player.moveLeft();\n        }\n        else if (wasd.D.isDown) {\n            player.moveRight();\n        }\n        else {\n            player.turn();\n        }\n        if (wasd.W.isDown && player.touchingGround) {\n            player.jump();\n        }\n        if ((cursors.right.isDown || cursors.down.isDown || cursors.up.isDown || cursors.left.isDown) &&\n            fireActive === false) {\n            fire = this.matter.add.sprite(player.getX(), player.getY(), 'fireball', null, {\n                isSensor: true,\n                label: 'fire',\n            });\n            if (cursors.left.isDown) {\n                fire.setRotation(Math.PI);\n            }\n            if (cursors.down.isDown) {\n                fire.setRotation(Math.PI / 2);\n            }\n            if (cursors.up.isDown) {\n                fire.setRotation((3 * Math.PI) / 2);\n            }\n            fire.anims.play('fireball', true);\n            fire.setIgnoreGravity(true);\n            var xDir = cursors.right.isDown ? 1 : -1;\n            var xVel = cursors.right.isDown || cursors.left.isDown ? 10 : 0;\n            fire.setVelocityX(xVel * xDir);\n            var yDir = cursors.down.isDown ? 1 : -1;\n            var yVel = cursors.down.isDown || cursors.up.isDown ? 10 : 0;\n            fire.setVelocityY(yVel * yDir);\n            fireActive = true;\n            setTimeout(function () {\n                if (fireActive) {\n                    fireActive = false;\n                    fire.destroy();\n                }\n            }, 500);\n        }\n        Object.keys(crates).forEach(function (key) {\n            var crate = crates[key];\n            if (crate.fireSprite != null && crate.crate.active) {\n                crate.fireSprite.x = crate.crate.x;\n                crate.fireSprite.y = crate.crate.y - 10;\n            }\n        });\n    };\n    return GameScene;\n}(Phaser.Scene));\nexports.GameScene = GameScene;\n\n\n//# sourceURL=webpack:///./src/scenes/game-scene.ts?");

/***/ }),

/***/ "./src/scenes/index.ts":
/*!*****************************!*\
  !*** ./src/scenes/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar main_menu_scene_1 = __webpack_require__(/*! ./main-menu-scene */ \"./src/scenes/main-menu-scene.ts\");\nvar boot_scene_1 = __webpack_require__(/*! ./boot-scene */ \"./src/scenes/boot-scene.ts\");\nvar game_scene_1 = __webpack_require__(/*! ./game-scene */ \"./src/scenes/game-scene.ts\");\nexports.default = [boot_scene_1.BootScene, main_menu_scene_1.MainMenuScene, game_scene_1.GameScene];\n\n\n//# sourceURL=webpack:///./src/scenes/index.ts?");

/***/ })

})