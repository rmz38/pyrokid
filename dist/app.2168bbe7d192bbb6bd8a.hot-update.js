webpackHotUpdate("app",{

/***/ "./src/scenes/game-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/game-scene.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.GameScene = void 0;\nvar player_1 = __webpack_require__(/*! ../objects/player */ \"./src/objects/player.ts\");\nvar crate_1 = __webpack_require__(/*! ../objects/crate */ \"./src/objects/crate.ts\");\nvar compoundCrate_1 = __webpack_require__(/*! ../objects/compoundCrate */ \"./src/objects/compoundCrate.ts\");\nvar lizard_1 = __webpack_require__(/*! ../objects/lizard */ \"./src/objects/lizard.ts\");\nvar spider_1 = __webpack_require__(/*! ../objects/spider */ \"./src/objects/spider.ts\");\nvar dirt_1 = __webpack_require__(/*! ../objects/dirt */ \"./src/objects/dirt.ts\");\nvar steel_1 = __webpack_require__(/*! ../objects/steel */ \"./src/objects/steel.ts\");\nvar lava_1 = __webpack_require__(/*! ../objects/lava */ \"./src/objects/lava.ts\");\nvar menu_button_1 = __webpack_require__(/*! ../ui/menu-button */ \"./src/ui/menu-button.ts\");\nvar clump_1 = __webpack_require__(/*! ../helpers/clump */ \"./src/helpers/clump.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'Game',\n};\nvar player;\nvar cursors;\nvar wasd;\nvar world_bound_width = 1200;\nvar world_bound_height = 600;\n// interface Crate {\n//   crate: any;\n//   onFire: boolean;\n//   neighbors: Set<Crate>;\n//   fireSprite: Phaser.GameObjects.Sprite;\n// }\nvar crates = {};\nvar compounds = {};\nvar monsterCollisionLabels = new Set(['lizard', 'spider', 'fire']);\nvar fire;\nvar fireActive = false;\nvar fireCooldown = false;\nvar house;\nvar TILE_SIZE = 50;\nvar xTiles = Math.floor(world_bound_width / TILE_SIZE);\nvar yTiles = Math.floor(world_bound_height / TILE_SIZE);\nvar tiles = [];\nfor (var i = 0; i < xTiles; i++) {\n    var row = [];\n    for (var j = 0; j < yTiles; j++) {\n        row.push(new Set());\n    }\n    tiles.push(row);\n}\nfunction getTile(x, y) {\n    return [Math.floor(x / 50), Math.floor(y / 50)];\n}\nfunction clearTiles() {\n    for (var i = 0; i < tiles.length; i++) {\n        for (var j = 0; j < tiles[0].length; j++) {\n            tiles[i][j].clear();\n        }\n    }\n}\nfunction igniteCompound(game, curr, destroyFire) {\n    if (destroyFire) {\n        fire.destroy();\n    }\n    if (curr.onFire) {\n        return;\n    }\n    curr.onFire = true;\n    curr.crates.forEach(function (e) {\n        igniteCrate(game, e);\n    });\n    game.time.delayedCall(1000, function () {\n        curr.crates.forEach(function (e) {\n            e.destroy();\n        });\n    });\n}\nfunction igniteCrate(game, currCrate) {\n    if (currCrate.onFire) {\n        return;\n    }\n    currCrate.onFire = true;\n    currCrate.fireSprite = game.add.sprite(currCrate.sprite.x, currCrate.sprite.y - 10, 'squareFire');\n    currCrate.fireSprite.anims.play('squareFire', false);\n    currCrate.fireSprite.alpha = 0.7;\n    game.time.delayedCall(1000, function () {\n        if (currCrate.fireSprite.active) {\n            currCrate.fireSprite.destroy();\n        }\n        var fireDisappear = game.add.sprite(currCrate.sprite.x, currCrate.sprite.y - 10, 'fireDisappear');\n        fireDisappear.anims.play('fireDisappear', false, true);\n        fireDisappear.once('animationcomplete', function () {\n            fireDisappear.destroy();\n        });\n        var pos = getTile(currCrate.sprite.x, currCrate.sprite.y);\n        var x = pos[0];\n        var y = pos[1];\n        var candidates = [\n            [x - 1, y],\n            [x + 1, y],\n            [x, y + 1],\n            [x, y - 1],\n        ];\n        for (var i = 0; i < candidates.length; i++) {\n            var x_1 = candidates[i][0];\n            var y_1 = candidates[i][1];\n            if (x_1 >= 0 && x_1 < xTiles && y_1 >= 0 && y_1 < yTiles) {\n                tiles[x_1][y_1].forEach(function (e) {\n                    igniteCompound(game, e.owner, false);\n                });\n            }\n        }\n    });\n}\nvar GameScene = /** @class */ (function (_super) {\n    __extends(GameScene, _super);\n    function GameScene() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        _this.lizards = {};\n        _this.spiders = {};\n        _this.lavas = {};\n        _this.crates = {};\n        // public compounds = {};\n        _this.level = 'level' + localStorage.getItem('level');\n        return _this;\n    }\n    GameScene.prototype.jointBlocks = function (blocks, data) {\n        var _this = this;\n        var track = new Set();\n        var items = [];\n        data.steel.forEach(function (e) { return items.push(e); });\n        data.crate.forEach(function (e) { return items.push(e); });\n        items.forEach(function (e) {\n            track.add(blocks[e.x + ',' + e.y]);\n            var sprite = blocks[e.x + ',' + e.y].sprite;\n            var id = clump_1.indexes[e.frame];\n            // odd numbers are sides\n            var sides = id.split('');\n            var up = blocks[e.x + ',' + (e.y - 50)];\n            var right = blocks[e.x + 50 + ',' + e.y];\n            var down = blocks[e.x + ',' + (e.y + 50)];\n            var left = blocks[e.x - 50 + ',' + e.y];\n            if (sides[1] == 1 && !track.has(up)) {\n                var up_1 = blocks[e.x + ',' + (e.y - 50)];\n                _this.matter.add.joint(sprite.body, up_1.sprite.body, 10, 1, {\n                    pointA: { x: 0, y: -25 },\n                    pointB: { x: 0, y: 25 },\n                    angularStiffness: 1,\n                });\n                track.add(up_1);\n            }\n            if (sides[3] == 1 && !track.has(right)) {\n                _this.matter.add.joint(sprite.body, right.sprite.body, 0, 1, {\n                    pointA: { x: 25, y: 0 },\n                    pointB: { x: -25, y: 0 },\n                    angularStiffness: 1,\n                });\n                track.add(right);\n            }\n            if (sides[5] == 1 && !track.has(down)) {\n                _this.matter.add.joint(sprite.body, down.sprite.body, 0, 1, {\n                    pointA: { x: 0, y: 25 },\n                    pointB: { x: 0, y: -25 },\n                    angularStiffness: 1,\n                });\n                track.add(down);\n            }\n            if (sides[7] == 1 && !track.has(left)) {\n                _this.matter.add.joint(sprite.body, left.sprite.body, 0, 1, {\n                    pointA: { x: -25, y: 0 },\n                    pointB: { x: 25, y: 0 },\n                    angularStiffness: 1,\n                });\n                track.add(left);\n            }\n        });\n    };\n    GameScene.prototype.preload = function () {\n        this.load.image('background', 'assets/backgrounds/TutorialBackground1.png');\n        this.load.image('ground', 'assets/squares/platform.png');\n        this.load.image('house', 'assets/squares/house.png');\n        this.load.spritesheet('crate', 'assets/clumpables/crateTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('dirt', 'assets/clumpables/dirtTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('steel', 'assets/clumpables/steelTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('lava', 'assets/clumpables/lavaTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 38, frameHeight: 19 });\n        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });\n        this.load.spritesheet('lizard', 'assets/monsters/lizard.png', { frameWidth: 70, frameHeight: 50 });\n        this.load.spritesheet('spider', 'assets/monsters/spider.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('spiderArmored', 'assets/monsters/spiderArmored.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('squareFire', 'assets/squares/squareFire.png', { frameWidth: 79, frameHeight: 80 });\n        this.load.spritesheet('fireDisappear', 'assets/squares/fireDisappear.png', { frameWidth: 84, frameHeight: 133 });\n        this.load.json('level' + localStorage.getItem('level'), 'assets/levels/' + localStorage.getItem('level') + '.json');\n    };\n    GameScene.prototype.create = function () {\n        var _this = this;\n        var background = this.add.image(world_bound_width / 2, world_bound_height / 2, 'background');\n        background.setScale(world_bound_width / background.width);\n        this.matter.world.setBounds(0, 0, world_bound_width, world_bound_height, 32, true, true, false, true);\n        this.cameras.main.setBounds(0, 0, world_bound_width, world_bound_height).setName('main');\n        var data = localStorage.getItem('useleveleditor') == 'true'\n            ? JSON.parse(localStorage.getItem('leveleditorlevel'))\n            : this.cache.json.get('level' + localStorage.getItem('level'));\n        // const data = this.cache.json.get('level');\n        // const jsonData = JSON.parse();\n        player = new player_1.default(data.player[0].x, data.player[0].y, this);\n        this.cameras.main.startFollow(player.sprite, false, 0.2, 0.2);\n        // make lizards\n        for (var i = 0; i < data.lizard.length; i++) {\n            var e = data.lizard[i];\n            this.lizards['lizard' + i] = new lizard_1.default(e.x, e.y, this, i);\n        }\n        // make spiders\n        for (var i = 0; i < data.spider.length; i++) {\n            var e = data.spider[i];\n            this.spiders['spider' + i] = new spider_1.default(e.x, e.y, this, i, false);\n        }\n        data.dirt.forEach(function (e) {\n            new dirt_1.default(e.x, e.y, _this, e.frame);\n        });\n        var blocks = {};\n        data.steel.forEach(function (e) {\n            blocks[e.x + ',' + e.y] = new steel_1.default(e.x, e.y, _this, e.frame);\n        });\n        var crates = new Set();\n        var counter = 0;\n        data.crate.forEach(function (e) {\n            blocks[e.x + ',' + e.y] = new crate_1.default(e.x, e.y, counter, _this, e.frame);\n            crates.add(blocks[e.x + ',' + e.y]);\n            _this.crates['crate' + counter] = blocks[e.x + ',' + e.y];\n            counter += 1;\n        });\n        // compound the crates\n        var trackCrates = new Set();\n        data.crate.forEach(function (e) {\n            var name = e.x + ',' + e.y;\n            if (!trackCrates.has(name)) {\n                var curr = [name];\n                var next_1 = [];\n                var toCompound_1 = new Set();\n                while (curr.length != 0) {\n                    curr.forEach(function (i) {\n                        var id = clump_1.indexes[parseInt(blocks[i].sprite.frame.name)];\n                        // odd numbers are sides\n                        var sides = id.split('');\n                        trackCrates.add(i);\n                        toCompound_1.add(blocks[i]);\n                        var x = blocks[i].sprite.x;\n                        var y = blocks[i].sprite.y;\n                        var up = x + ',' + (y - 50);\n                        var right = x + 50 + ',' + y;\n                        var down = x + ',' + (y + 50);\n                        var left = x - 50 + ',' + y;\n                        function compoundCrates(tile) {\n                            next_1.push(tile);\n                            trackCrates.add(tile);\n                            toCompound_1.add(blocks[tile]);\n                        }\n                        if (sides[1] == 1 && !trackCrates.has(up)) {\n                            compoundCrates(up);\n                        }\n                        if (sides[3] == 1 && !trackCrates.has(right)) {\n                            compoundCrates(right);\n                        }\n                        if (sides[5] == 1 && !trackCrates.has(down)) {\n                            compoundCrates(down);\n                        }\n                        if (sides[7] == 1 && !trackCrates.has(left)) {\n                            compoundCrates(left);\n                        }\n                    });\n                    curr = next_1;\n                    next_1 = [];\n                }\n                new compoundCrate_1.default(_this, toCompound_1, 'compound');\n            }\n        });\n        // const compoundTest = new CompoundCrate(this, crates, 'test1');\n        this.jointBlocks(blocks, data);\n        for (var i = 0; i < data.lava.length; i++) {\n            var e = data.lava[i];\n            this.lavas['lava' + i] = new lava_1.default(e.x, e.y, this, e.frame, i);\n        }\n        this.anims.create({\n            key: 'squareFire',\n            frames: this.anims.generateFrameNumbers('squareFire', { start: 0, end: 5 }),\n            frameRate: 30,\n            repeat: -1,\n        });\n        this.anims.create({\n            key: 'fireball',\n            frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 1 }),\n            frameRate: 10,\n            repeat: -1,\n        });\n        this.anims.create({\n            key: 'fireDisappear',\n            frames: this.anims.generateFrameNumbers('fireDisappear', { start: 0, end: 39 }),\n            frameRate: 60,\n        });\n        cursors = this.input.keyboard.createCursorKeys();\n        wasd = this.input.keyboard.addKeys('W,S,A,D');\n        var game = this;\n        this.matter.world.on('collisionstart', function (event) {\n            //  Loop through all of the collision pairs\n            Object.keys(crates).forEach(function (key) {\n                var crate = crates[key];\n                crate.neighbors.clear();\n            });\n            var pairs = event.pairs;\n            var _loop_1 = function (i) {\n                var bodyA = pairs[i].bodyA;\n                var bodyB = pairs[i].bodyB;\n                var a = bodyA.label;\n                var b = bodyB.label;\n                if ((b.includes('lizard') && a === 'fire') || (a.includes('lizard') && b === 'fire')) {\n                    fire.destroy();\n                    fireActive = false;\n                    var lizard = a.includes('lizard') ? a : b;\n                    game.lizards[lizard].ignite(game);\n                }\n                if ((b.includes('spider') && a === 'fire') || (a.includes('spider') && b === 'fire')) {\n                    fire.destroy();\n                    fireActive = false;\n                    var spider = b.includes('spider') ? b : a;\n                    game.spiders[spider].hitFire();\n                }\n                if ((b.includes('lizard') && a.includes('lava')) || (a.includes('lizard') && b.includes('lava'))) {\n                    var lava = a.includes('lava') ? a : b;\n                    var lizard = a.includes('lava') ? b : a;\n                    if (game.lizards[lizard].onFire) {\n                        game.lavas[lava].ignite(game);\n                    }\n                }\n                if ((b.includes('spider') && a.includes('lizard')) || (a.includes('spider') && b.includes('lizard'))) {\n                    var lizard = a.includes('lizard') ? a : b;\n                    if (game.lizards[lizard].onFire) {\n                        // spider.hitFire();\n                    }\n                }\n                if (b.includes('lizard') && a.includes('crate') && game.lizards[0].onFire) {\n                    igniteCompound(game, game.crates[a].owner, false);\n                }\n                if (a.includes('lizard') && b.includes('crate') && game.lizards[0].onFire) {\n                    igniteCompound(game, game.crates[b].owner, false);\n                }\n                //  sensor collisions\n                if (pairs[i].isSensor) {\n                    var playerBody = void 0;\n                    var otherBody = void 0;\n                    if (bodyA.isSensor) {\n                        playerBody = bodyA;\n                        otherBody = bodyB;\n                    }\n                    else if (bodyB.isSensor) {\n                        playerBody = bodyB;\n                        otherBody = bodyB;\n                    }\n                    if (playerBody.label === 'groundSensor' && otherBody.label != 'fire') {\n                        player.touchingGround = true;\n                    }\n                }\n                // fire collision\n                if (a === 'fire' && b.includes('crate')) {\n                    igniteCompound(game, game.crates[b].owner, true);\n                }\n                if (b === 'fire' && a.includes('crate')) {\n                    igniteCompound(game, game.crates[a].owner, true);\n                }\n                if ((b.includes('spider') && a.includes('lizard')) || a.includes( true && b.includes('lizard)'))) {\n                    var spider = b.includes('spider') ? b : a;\n                    game.spiders[spider].hitLizard();\n                }\n                if ((bodyA.isSensor && a != 'groundSensor' && a != 'fire') ||\n                    (bodyB.isSensor && b != 'groundSensor' && b != 'fire')) {\n                    var monsterBody = bodyA.isSensor ? bodyA : bodyB;\n                    var otherBody_1 = bodyA.isSensor ? bodyB : bodyA;\n                    var turnFlag_1 = true;\n                    monsterCollisionLabels.forEach(function (label) {\n                        if (otherBody_1.label.includes(label)) {\n                            turnFlag_1 = false;\n                        }\n                    });\n                    if (turnFlag_1) {\n                        if (monsterBody.label.includes('lizard')) {\n                            game.lizards[monsterBody.label].flip();\n                        }\n                        else {\n                            game.spiders[monsterBody.label].flip();\n                        }\n                    }\n                }\n            };\n            for (var i = 0; i < pairs.length; i++) {\n                _loop_1(i);\n            }\n        });\n        new menu_button_1.MenuButton(this, 10, 10, 'Back to Menu', function () {\n            _this.scene.start('MainMenu');\n        });\n    };\n    GameScene.prototype.update = function () {\n        var _this = this;\n        clearTiles();\n        // add to tiles\n        Object.keys(this.crates).forEach(function (key) {\n            var curr = _this.crates[key];\n            if (curr.sprite.active) {\n                var pos = getTile(curr.sprite.x, curr.sprite.y);\n                tiles[pos[0]][pos[1]].add(curr);\n            }\n        });\n        for (var _i = 0, _a = Object.entries(this.lizards); _i < _a.length; _i++) {\n            var _b = _a[_i], key = _b[0], lizard = _b[1];\n            lizard.sprite.setVelocityX(lizard.velocity);\n            lizard.syncSensor();\n            lizard.syncFire();\n        }\n        for (var _c = 0, _d = Object.entries(this.spiders); _c < _d.length; _c++) {\n            var _e = _d[_c], key = _e[0], spider = _e[1];\n            spider.syncSensor();\n            spider.collisionSensor.position.x = spider.sprite.x;\n            spider.sprite.setVelocityX(spider.velocity);\n        }\n        if (wasd.A.isDown) {\n            player.moveLeft();\n        }\n        else if (wasd.D.isDown) {\n            player.moveRight();\n        }\n        else {\n            player.turn();\n        }\n        if (wasd.W.isDown && player.touchingGround) {\n            player.jump();\n        }\n        if ((cursors.right.isDown || cursors.down.isDown || cursors.up.isDown || cursors.left.isDown) &&\n            !fireActive &&\n            !fireCooldown) {\n            fireCooldown = true;\n            fire = this.matter.add.sprite(player.getX(), player.getY(), 'fireball', null, {\n                isSensor: true,\n                label: 'fire',\n            });\n            fire.setCollisionCategory(0x0100);\n            if (cursors.left.isDown) {\n                fire.setRotation(Math.PI);\n            }\n            if (cursors.down.isDown) {\n                fire.setRotation(Math.PI / 2);\n            }\n            if (cursors.up.isDown) {\n                fire.setRotation((3 * Math.PI) / 2);\n            }\n            fire.anims.play('fireball', true);\n            fire.setIgnoreGravity(true);\n            var xDir = cursors.right.isDown ? 1 : -1;\n            var xVel = cursors.right.isDown || cursors.left.isDown ? 10 : 0;\n            fire.setVelocityX(xVel * xDir);\n            var yDir = cursors.down.isDown ? 1 : -1;\n            var yVel = cursors.down.isDown || cursors.up.isDown ? 10 : 0;\n            fire.setVelocityY(yVel * yDir);\n            fireActive = true;\n            setTimeout(function () {\n                if (fireActive) {\n                    fireActive = false;\n                    fire.destroy();\n                }\n                fireCooldown = false;\n            }, 500);\n        }\n        Object.keys(this.crates).forEach(function (key) {\n            var crate = _this.crates[key];\n            if (crate.fireSprite != null) {\n                crate.syncFire();\n            }\n        });\n    };\n    return GameScene;\n}(Phaser.Scene));\nexports.GameScene = GameScene;\n\n\n//# sourceURL=webpack:///./src/scenes/game-scene.ts?");

/***/ }),

/***/ "./src/scenes/index.ts":
/*!*****************************!*\
  !*** ./src/scenes/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar main_menu_scene_1 = __webpack_require__(/*! ./main-menu-scene */ \"./src/scenes/main-menu-scene.ts\");\nvar boot_scene_1 = __webpack_require__(/*! ./boot-scene */ \"./src/scenes/boot-scene.ts\");\nvar game_scene_1 = __webpack_require__(/*! ./game-scene */ \"./src/scenes/game-scene.ts\");\nvar level_editor_scene_1 = __webpack_require__(/*! ./level-editor-scene */ \"./src/scenes/level-editor-scene.ts\");\nvar level_select_scene_1 = __webpack_require__(/*! ./level-select-scene */ \"./src/scenes/level-select-scene.ts\");\nexports.default = [boot_scene_1.BootScene, main_menu_scene_1.MainMenuScene, game_scene_1.GameScene, level_editor_scene_1.LevelEditor, level_select_scene_1.LevelSelect];\n\n\n//# sourceURL=webpack:///./src/scenes/index.ts?");

/***/ })

})