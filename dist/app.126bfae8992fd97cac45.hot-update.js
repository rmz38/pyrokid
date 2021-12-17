webpackHotUpdate("app",{

/***/ "./src/scenes/game-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/game-scene.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.GameScene = void 0;\nvar player_1 = __webpack_require__(/*! ../objects/player */ \"./src/objects/player.ts\");\nvar crate_1 = __webpack_require__(/*! ../objects/crate */ \"./src/objects/crate.ts\");\nvar compoundCrate_1 = __webpack_require__(/*! ../objects/compoundCrate */ \"./src/objects/compoundCrate.ts\");\nvar lizard_1 = __webpack_require__(/*! ../objects/lizard */ \"./src/objects/lizard.ts\");\nvar spider_1 = __webpack_require__(/*! ../objects/spider */ \"./src/objects/spider.ts\");\nvar dirt_1 = __webpack_require__(/*! ../objects/dirt */ \"./src/objects/dirt.ts\");\nvar steel_1 = __webpack_require__(/*! ../objects/steel */ \"./src/objects/steel.ts\");\nvar lava_1 = __webpack_require__(/*! ../objects/lava */ \"./src/objects/lava.ts\");\nvar fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'fs'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'Game',\n};\nvar player;\nvar lizard;\nvar platforms;\nvar cursors;\nvar wasd;\nvar dirtTiles;\nvar lava;\nvar world_bound_width = 1200;\nvar world_bound_height = 600;\n// interface Crate {\n//   crate: any;\n//   onFire: boolean;\n//   neighbors: Set<Crate>;\n//   fireSprite: Phaser.GameObjects.Sprite;\n// }\nvar crates = {};\nvar compounds = {};\nvar monsterCollisionLabels = new Set(['lizard', 'spider', 'fire']);\nvar fire;\nvar fireActive = false;\nvar fireCooldown = false;\nvar house;\nvar spider;\nvar TILE_SIZE = 50;\nvar xTiles = Math.floor(world_bound_width / TILE_SIZE);\nvar yTiles = Math.floor(world_bound_height / TILE_SIZE);\nvar tiles = [];\nfor (var i = 0; i < xTiles; i++) {\n    var row = [];\n    for (var j = 0; j < yTiles; j++) {\n        row.push(new Set());\n    }\n    tiles.push(row);\n}\nfunction getTile(x, y) {\n    return [Math.floor(x / 50), Math.floor(y / 50)];\n}\nfunction clearTiles() {\n    for (var i = 0; i < tiles.length; i++) {\n        for (var j = 0; j < tiles[0].length; j++) {\n            tiles[i][j].clear();\n        }\n    }\n}\n// function igniteLizard(game, curr, destroyFire) {\n//   return null;\n// }\nfunction igniteCompound(game, curr, destroyFire) {\n    if (destroyFire) {\n        fire.destroy();\n    }\n    if (curr.onFire) {\n        return;\n    }\n    curr.onFire = true;\n    curr.crates.forEach(function (e) {\n        igniteCrate(game, e);\n    });\n    game.time.delayedCall(1000, function () {\n        if (curr.sprite.active) {\n            curr.sprite.destroy();\n        }\n    });\n}\nfunction igniteCrate(game, currCrate) {\n    if (currCrate.onFire) {\n        return;\n    }\n    currCrate.onFire = true;\n    currCrate.fireSprite = game.add.sprite(currCrate.crate.position.x, currCrate.crate.position.y - 10, 'squareFire');\n    currCrate.fireSprite.anims.play('squareFire', false);\n    currCrate.fireSprite.alpha = 0.7;\n    game.time.delayedCall(1000, function () {\n        if (currCrate.fireSprite.active) {\n            currCrate.fireSprite.destroy();\n        }\n        var fireDisappear = game.add.sprite(currCrate.crate.position.x, currCrate.crate.position.y - 10, 'fireDisappear');\n        fireDisappear.anims.play('fireDisappear', false, true);\n        fireDisappear.once('animationcomplete', function () {\n            fireDisappear.destroy();\n        });\n        var pos = getTile(currCrate.crate.position.x, currCrate.crate.position.y);\n        var x = pos[0];\n        var y = pos[1];\n        var candidates = [\n            [x - 1, y],\n            [x + 1, y],\n            [x, y + 1],\n            [x, y - 1],\n        ];\n        for (var i = 0; i < candidates.length; i++) {\n            var x_1 = candidates[i][0];\n            var y_1 = candidates[i][1];\n            if (x_1 >= 0 && x_1 < xTiles && y_1 >= 0 && y_1 < yTiles) {\n                tiles[x_1][y_1].forEach(function (e) {\n                    igniteCompound(game, e.owner, false);\n                });\n            }\n        }\n        // if (currCrate.crate) {\n        //   currCrate.crate.destroy();\n        // }\n    });\n}\nvar GameScene = /** @class */ (function (_super) {\n    __extends(GameScene, _super);\n    function GameScene() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        return _this;\n    }\n    GameScene.prototype.preload = function () {\n        this.load.image('background', 'assets/backgrounds/TutorialBackground1.png');\n        this.load.image('ground', 'assets/squares/platform.png');\n        this.load.image('house', 'assets/squares/house.png');\n        this.load.spritesheet('crate', 'assets/clumpables/crateTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('dirt', 'assets/clumpables/dirtTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('steel', 'assets/clumpables/steelTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('lava', 'assets/clumpables/lavaTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 38, frameHeight: 19 });\n        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });\n        this.load.spritesheet('lizard', 'assets/monsters/lizard.png', { frameWidth: 70, frameHeight: 50 });\n        this.load.spritesheet('spider', 'assets/monsters/spider.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('spiderArmored', 'assets/monsters/spiderArmored.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('squareFire', 'assets/squares/squareFire.png', { frameWidth: 79, frameHeight: 80 });\n        this.load.spritesheet('fireDisappear', 'assets/squares/fireDisappear.png', { frameWidth: 84, frameHeight: 133 });\n    };\n    GameScene.prototype.create = function () {\n        this.add.image(400, 300, 'background');\n        this.matter.world.setBounds(0, 0, world_bound_width, world_bound_height, 32, true, true, false, true);\n        this.cameras.main.setBounds(0, 0, world_bound_width, world_bound_height).setName('main');\n        // platforms = this.matter.add.sprite(400, 568, 'ground');\n        fs.readFileSync('../levels/testlevel.json', 'utf8', function (err, jsonString) {\n            if (err) {\n                console.log('File read failed:', err);\n                return;\n            }\n            console.log('File data:', jsonString);\n        });\n        var jsonData = JSON.parse();\n        player = new player_1.default(0, 0, this);\n        this.cameras.main.startFollow(player.player, false, 0.2, 0.2);\n        lizard = new lizard_1.default(this);\n        spider = new spider_1.default(this, true);\n        this.anims.create({\n            key: 'cratepic',\n            frames: this.anims.generateFrameNumbers('crate', { start: 0, end: 0 }),\n            frameRate: 10,\n            repeat: -1,\n        });\n        this.anims.create({\n            key: 'squareFire',\n            frames: this.anims.generateFrameNumbers('squareFire', { start: 0, end: 5 }),\n            frameRate: 30,\n            repeat: -1,\n        });\n        this.anims.create({\n            key: 'fireball',\n            frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 1 }),\n            frameRate: 10,\n            repeat: -1,\n        });\n        this.anims.create({\n            key: 'fireDisappear',\n            frames: this.anims.generateFrameNumbers('fireDisappear', { start: 0, end: 39 }),\n            frameRate: 60,\n        });\n        cursors = this.input.keyboard.createCursorKeys();\n        wasd = this.input.keyboard.addKeys('W,S,A,D');\n        for (var i = 0; i < 5; i += 1) {\n            var label = 'crate_' + i;\n            crates[label] = new crate_1.default(this, 400, 550 - i * 50, label, null);\n            compounds[label] = new compoundCrate_1.default(this, new Set([crates[label]]), 'crate', label);\n            // hash instead, tileize\n        }\n        for (var i = 0; i < 20; i += 1) {\n            var test = new dirt_1.default(this, i * 50, 600);\n        }\n        //demo house\n        var tempowner = [];\n        for (var i = 0; i < 3; i += 1) {\n            for (var j = 0; j < 4; j += 1) {\n                var label = 'cratehouse_' + i + j;\n                crates[label] = new crate_1.default(this, 500 + i * 50, 550 - j * 50, label, null);\n                tempowner.push(crates[label]);\n            }\n        }\n        compounds['house'] = new compoundCrate_1.default(this, new Set(tempowner), 'house', 'house');\n        var game = this;\n        var steel = new steel_1.default(game, 750, 500);\n        lava = new lava_1.default(game, 700, 550);\n        console.log(lava);\n        this.matter.world.on('collisionstart', function (event) {\n            //  Loop through all of the collision pairs\n            Object.keys(crates).forEach(function (key) {\n                var crate = crates[key];\n                crate.neighbors.clear();\n            });\n            var pairs = event.pairs;\n            var _loop_1 = function (i) {\n                var bodyA = pairs[i].bodyA;\n                var bodyB = pairs[i].bodyB;\n                if ((bodyB.label === 'lizard' && bodyA.label === 'fire') ||\n                    (bodyA.label === 'lizard' && bodyB.label === 'fire')) {\n                    fire.destroy();\n                    fireActive = false;\n                    lizard.ignite(game);\n                }\n                if ((bodyB.label === 'spider' && bodyA.label === 'fire') ||\n                    (bodyA.label === 'spider' && bodyB.label === 'fire')) {\n                    fire.destroy();\n                    fireActive = false;\n                    spider.hitFire();\n                }\n                if ((bodyB.label.includes('lizard') && bodyA.label === 'lava') ||\n                    (bodyA.label.includes('lizard') && bodyB.label === 'lava')) {\n                    console.log('lavahit');\n                    lava.ignite(game);\n                }\n                if ((bodyB.label.includes('spider') && bodyA.label.includes('lizard')) ||\n                    (bodyA.label.includes('spider') && bodyB.label.includes('lizard'))) {\n                    console.log('lizardspider');\n                    if (lizard.onFire) {\n                        spider.hitFire();\n                    }\n                }\n                if (bodyB.label.includes('lizard') && bodyA.label.includes('crate') && lizard.onFire) {\n                    igniteCompound(game, crates[bodyA.label].owner, false);\n                }\n                if (bodyA.label.includes('lizard') && bodyB.label.includes('crate') && lizard.onFire) {\n                    igniteCompound(game, crates[bodyB.label].owner, false);\n                }\n                //  sensor collisions\n                if (pairs[i].isSensor) {\n                    var playerBody = void 0;\n                    var otherBody = void 0;\n                    if (bodyA.isSensor) {\n                        playerBody = bodyA;\n                        otherBody = bodyB;\n                    }\n                    else if (bodyB.isSensor) {\n                        playerBody = bodyB;\n                        otherBody = bodyB;\n                    }\n                    if (playerBody.label === 'groundSensor' && otherBody.label != 'fire') {\n                        player.touchingGround = true;\n                    }\n                }\n                // fire collision\n                if (bodyA.label === 'fire' && bodyB.label.includes('crate')) {\n                    igniteCompound(game, crates[bodyB.label].owner, true);\n                }\n                if (bodyB.label === 'fire' && bodyA.label.includes('crate')) {\n                    igniteCompound(game, crates[bodyA.label].owner, true);\n                }\n                if (bodyA.label.includes('TurnSensor') || bodyB.label.includes('TurnSensor')) {\n                    var monsterBody = bodyA.label.includes('TurnSensor') ? bodyA : bodyB;\n                    var otherBody_1 = bodyA.label.includes('TurnSensor') ? bodyB : bodyA;\n                    var turnFlag_1 = true;\n                    monsterCollisionLabels.forEach(function (label) {\n                        if (otherBody_1.label.includes(label)) {\n                            turnFlag_1 = false;\n                        }\n                    });\n                    if (turnFlag_1) {\n                        if (monsterBody.label.includes('lizard')) {\n                            lizard.flip();\n                        }\n                        else {\n                            spider.flip();\n                        }\n                    }\n                }\n            };\n            for (var i = 0; i < pairs.length; i++) {\n                _loop_1(i);\n            }\n        });\n        // this.matter.world.on('collisionactive', function (event) {\n        //   //  Loop through all of the collision pairs\n        //   const pairs = event.pairs;\n        //   for (let i = 0; i < pairs.length; i++) {\n        //     const bodyA = pairs[i].bodyA;\n        //     const bodyB = pairs[i].bodyB;\n        //     if (bodyA.label.includes('crate') && bodyB.label.includes('crate')) {\n        //       addNeighbor(crates[bodyA.label], crates[bodyB.label]);\n        //     }\n        //   }\n        // });\n    };\n    GameScene.prototype.update = function () {\n        clearTiles();\n        // add to tiles\n        console.log(player);\n        Object.keys(crates).forEach(function (key) {\n            var curr = crates[key];\n            var pos = getTile(curr.crate.position.x, curr.crate.position.y);\n            tiles[pos[0]][pos[1]].add(curr);\n        });\n        console.log(typeof lava);\n        // const pos = getTile(lava.sprite.position.x, lava.sprite.position.y);\n        // tiles[pos[0]][pos[1]].add(lava);\n        // const lizPos = getTile(lizard.sprite.x, lizard.sprite.y);\n        // tiles[lizPos[0]][lizPos[1]].add(lizard);\n        lizard.sprite.setVelocityX(lizard.velocity);\n        if (spider.sprite.active) {\n            spider.sprite.setVelocityX(spider.velocity);\n        }\n        if (wasd.A.isDown) {\n            player.moveLeft();\n        }\n        else if (wasd.D.isDown) {\n            player.moveRight();\n        }\n        else {\n            player.turn();\n        }\n        if (wasd.W.isDown && player.touchingGround) {\n            player.jump();\n        }\n        if ((cursors.right.isDown || cursors.down.isDown || cursors.up.isDown || cursors.left.isDown) &&\n            !fireActive &&\n            !fireCooldown) {\n            fireCooldown = true;\n            fire = this.matter.add.sprite(player.getX(), player.getY(), 'fireball', null, {\n                isSensor: true,\n                label: 'fire',\n            });\n            fire.setCollisionCategory(0x0100);\n            if (cursors.left.isDown) {\n                fire.setRotation(Math.PI);\n            }\n            if (cursors.down.isDown) {\n                fire.setRotation(Math.PI / 2);\n            }\n            if (cursors.up.isDown) {\n                fire.setRotation((3 * Math.PI) / 2);\n            }\n            fire.anims.play('fireball', true);\n            fire.setIgnoreGravity(true);\n            var xDir = cursors.right.isDown ? 1 : -1;\n            var xVel = cursors.right.isDown || cursors.left.isDown ? 10 : 0;\n            fire.setVelocityX(xVel * xDir);\n            var yDir = cursors.down.isDown ? 1 : -1;\n            var yVel = cursors.down.isDown || cursors.up.isDown ? 10 : 0;\n            fire.setVelocityY(yVel * yDir);\n            fireActive = true;\n            setTimeout(function () {\n                if (fireActive) {\n                    fireActive = false;\n                    fire.destroy();\n                }\n                fireCooldown = false;\n            }, 500);\n        }\n        Object.keys(crates).forEach(function (key) {\n            var crate = crates[key];\n            if (crate.fireSprite != null) {\n                crate.syncFire();\n            }\n        });\n        if (lizard.onFire) {\n            lizard.syncFire();\n        }\n    };\n    return GameScene;\n}(Phaser.Scene));\nexports.GameScene = GameScene;\n\n\n//# sourceURL=webpack:///./src/scenes/game-scene.ts?");

/***/ }),

/***/ "./src/scenes/index.ts":
/*!*****************************!*\
  !*** ./src/scenes/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar main_menu_scene_1 = __webpack_require__(/*! ./main-menu-scene */ \"./src/scenes/main-menu-scene.ts\");\nvar boot_scene_1 = __webpack_require__(/*! ./boot-scene */ \"./src/scenes/boot-scene.ts\");\nvar game_scene_1 = __webpack_require__(/*! ./game-scene */ \"./src/scenes/game-scene.ts\");\nvar level_editor_scene_1 = __webpack_require__(/*! ./level-editor-scene */ \"./src/scenes/level-editor-scene.ts\");\nexports.default = [boot_scene_1.BootScene, main_menu_scene_1.MainMenuScene, game_scene_1.GameScene, level_editor_scene_1.LevelEditor];\n\n\n//# sourceURL=webpack:///./src/scenes/index.ts?");

/***/ })

})