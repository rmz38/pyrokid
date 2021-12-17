webpackHotUpdate("app",{

/***/ "./src/objects/lizard.ts":
/*!*******************************!*\
  !*** ./src/objects/lizard.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Lizard = /** @class */ (function () {\n    function Lizard(x, y, game, id) {\n        var lizRight = game.matter.bodies.rectangle(37, 0, 10, 10, { isSensor: true, label: 'lizardTurnSensor' });\n        var lizLeft = game.matter.bodies.rectangle(-37, 0, 10, 10, { isSensor: true, label: 'lizardTurnSensor' });\n        var lizardBody = game.matter.bodies.rectangle(0, 0, 70, 50, { label: 'lizard' + id });\n        // const spiderSensor = game.matter.bodies.rectangle(0, 0, 70, 50, { label: 'lizard' });\n        var compound = game.matter.body.create({\n            parts: [lizardBody, lizRight, lizLeft],\n            inertia: Infinity,\n            render: { sprite: { xOffset: 0, yOffset: 0 } },\n        });\n        this.velocity = 1;\n        var lizard = game.matter.add.sprite(0, 0, 'lizard');\n        lizard.setExistingBody(compound);\n        lizard.setPosition(x, y);\n        lizard.setCollisionCategory(0x001);\n        lizard.setCollidesWith(0x0100);\n        console.log(lizard);\n        console.log(lizLeft);\n        lizLeft.collisionFilter.category = 0x0100;\n        this.sprite = lizard;\n        this.createAnims(game);\n        this.sprite.anims.play('lizard', true);\n        this.onFire = false;\n        this.fireSprite = null;\n    }\n    Lizard.prototype.createAnims = function (game) {\n        game.anims.create({\n            key: 'lizard',\n            frames: game.anims.generateFrameNumbers('lizard', { start: 0, end: 29 }),\n            frameRate: 30,\n            repeat: -1,\n        });\n    };\n    Lizard.prototype.flip = function () {\n        this.sprite.flipX = !this.sprite.flipX;\n        this.velocity = -1 * this.velocity;\n    };\n    Lizard.prototype.ignite = function (game) {\n        if (this.onFire) {\n            return;\n        }\n        this.onFire = true;\n        this.fireSprite = game.add.sprite(this.sprite.x, this.sprite.y, 'squareFire');\n        this.fireSprite.play('squareFire', false);\n        this.fireSprite.alpha = 0.7;\n    };\n    Lizard.prototype.syncFire = function () {\n        if (this.onFire) {\n            this.fireSprite.x = this.sprite.x;\n            this.fireSprite.y = this.sprite.y - 10;\n        }\n    };\n    return Lizard;\n}());\nexports.default = Lizard;\n\n\n//# sourceURL=webpack:///./src/objects/lizard.ts?");

/***/ }),

/***/ "./src/scenes/game-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/game-scene.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.GameScene = void 0;\nvar player_1 = __webpack_require__(/*! ../objects/player */ \"./src/objects/player.ts\");\nvar lizard_1 = __webpack_require__(/*! ../objects/lizard */ \"./src/objects/lizard.ts\");\nvar spider_1 = __webpack_require__(/*! ../objects/spider */ \"./src/objects/spider.ts\");\nvar dirt_1 = __webpack_require__(/*! ../objects/dirt */ \"./src/objects/dirt.ts\");\nvar lava_1 = __webpack_require__(/*! ../objects/lava */ \"./src/objects/lava.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'Game',\n};\nvar player;\nvar lizard;\nvar platforms;\nvar cursors;\nvar wasd;\nvar dirtTiles;\nvar lava;\nvar world_bound_width = 1200;\nvar world_bound_height = 600;\n// interface Crate {\n//   crate: any;\n//   onFire: boolean;\n//   neighbors: Set<Crate>;\n//   fireSprite: Phaser.GameObjects.Sprite;\n// }\nvar crates = {};\nvar compounds = {};\nvar monsterCollisionLabels = new Set(['lizard', 'spider', 'fire']);\nvar fire;\nvar fireActive = false;\nvar fireCooldown = false;\nvar house;\nvar spider;\nvar TILE_SIZE = 50;\nvar xTiles = Math.floor(world_bound_width / TILE_SIZE);\nvar yTiles = Math.floor(world_bound_height / TILE_SIZE);\nvar tiles = [];\nfor (var i = 0; i < xTiles; i++) {\n    var row = [];\n    for (var j = 0; j < yTiles; j++) {\n        row.push(new Set());\n    }\n    tiles.push(row);\n}\nfunction getTile(x, y) {\n    return [Math.floor(x / 50), Math.floor(y / 50)];\n}\nfunction clearTiles() {\n    for (var i = 0; i < tiles.length; i++) {\n        for (var j = 0; j < tiles[0].length; j++) {\n            tiles[i][j].clear();\n        }\n    }\n}\n// function igniteLizard(game, curr, destroyFire) {\n//   return null;\n// }\nfunction igniteCompound(game, curr, destroyFire) {\n    if (destroyFire) {\n        fire.destroy();\n    }\n    if (curr.onFire) {\n        return;\n    }\n    curr.onFire = true;\n    curr.crates.forEach(function (e) {\n        igniteCrate(game, e);\n    });\n    game.time.delayedCall(1000, function () {\n        if (curr.sprite.active) {\n            curr.sprite.destroy();\n        }\n    });\n}\nfunction igniteCrate(game, currCrate) {\n    if (currCrate.onFire) {\n        return;\n    }\n    currCrate.onFire = true;\n    currCrate.fireSprite = game.add.sprite(currCrate.crate.position.x, currCrate.crate.position.y - 10, 'squareFire');\n    currCrate.fireSprite.anims.play('squareFire', false);\n    currCrate.fireSprite.alpha = 0.7;\n    game.time.delayedCall(1000, function () {\n        if (currCrate.fireSprite.active) {\n            currCrate.fireSprite.destroy();\n        }\n        var fireDisappear = game.add.sprite(currCrate.crate.position.x, currCrate.crate.position.y - 10, 'fireDisappear');\n        fireDisappear.anims.play('fireDisappear', false, true);\n        fireDisappear.once('animationcomplete', function () {\n            fireDisappear.destroy();\n        });\n        var pos = getTile(currCrate.crate.position.x, currCrate.crate.position.y);\n        var x = pos[0];\n        var y = pos[1];\n        var candidates = [\n            [x - 1, y],\n            [x + 1, y],\n            [x, y + 1],\n            [x, y - 1],\n        ];\n        for (var i = 0; i < candidates.length; i++) {\n            var x_1 = candidates[i][0];\n            var y_1 = candidates[i][1];\n            if (x_1 >= 0 && x_1 < xTiles && y_1 >= 0 && y_1 < yTiles) {\n                tiles[x_1][y_1].forEach(function (e) {\n                    igniteCompound(game, e.owner, false);\n                });\n            }\n        }\n        // if (currCrate.crate) {\n        //   currCrate.crate.destroy();\n        // }\n    });\n}\nvar GameScene = /** @class */ (function (_super) {\n    __extends(GameScene, _super);\n    function GameScene() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        _this.lizards = [];\n        return _this;\n    }\n    GameScene.prototype.preload = function () {\n        this.load.image('background', 'assets/backgrounds/TutorialBackground1.png');\n        this.load.image('ground', 'assets/squares/platform.png');\n        this.load.image('house', 'assets/squares/house.png');\n        this.load.spritesheet('crate', 'assets/clumpables/crateTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('dirt', 'assets/clumpables/dirtTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('steel', 'assets/clumpables/steelTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('lava', 'assets/clumpables/lavaTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 38, frameHeight: 19 });\n        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });\n        this.load.spritesheet('lizard', 'assets/monsters/lizard.png', { frameWidth: 70, frameHeight: 50 });\n        this.load.spritesheet('spider', 'assets/monsters/spider.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('spiderArmored', 'assets/monsters/spiderArmored.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('squareFire', 'assets/squares/squareFire.png', { frameWidth: 79, frameHeight: 80 });\n        this.load.spritesheet('fireDisappear', 'assets/squares/fireDisappear.png', { frameWidth: 84, frameHeight: 133 });\n        this.load.json('level', 'assets/levels/testlevel.json');\n    };\n    GameScene.prototype.create = function () {\n        var _this = this;\n        this.add.image(400, 300, 'background');\n        this.matter.world.setBounds(0, 0, world_bound_width, world_bound_height, 32, true, true, false, true);\n        this.cameras.main.setBounds(0, 0, world_bound_width, world_bound_height).setName('main');\n        // platforms = this.matter.add.sprite(400, 568, 'ground');\n        var data = this.cache.json.get('level');\n        // const jsonData = JSON.parse();\n        player = new player_1.default(data.player[0].x, data.player[0].y, this);\n        this.cameras.main.startFollow(player.player, false, 0.2, 0.2);\n        // make lizards\n        for (var i = 0; i < data.lizard.length; i++) {\n            var e = data.lizard[i];\n            this.lizards.push(new lizard_1.default(e.x, e.y, this, i));\n        }\n        data.dirt.forEach(function (e) {\n            new dirt_1.default(e.x, e.y, _this, e.frame);\n        });\n        // data.steel.forEach((e) => {\n        //   new Steel(e.x, e.y, this, e.frame);\n        // });\n        data.lava.forEach(function (e) {\n            new lava_1.default(e.x, e.y, _this, e.frame);\n        });\n        spider = new spider_1.default(this, true);\n        this.anims.create({\n            key: 'squareFire',\n            frames: this.anims.generateFrameNumbers('squareFire', { start: 0, end: 5 }),\n            frameRate: 30,\n            repeat: -1,\n        });\n        this.anims.create({\n            key: 'fireball',\n            frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 1 }),\n            frameRate: 10,\n            repeat: -1,\n        });\n        this.anims.create({\n            key: 'fireDisappear',\n            frames: this.anims.generateFrameNumbers('fireDisappear', { start: 0, end: 39 }),\n            frameRate: 60,\n        });\n        cursors = this.input.keyboard.createCursorKeys();\n        wasd = this.input.keyboard.addKeys('W,S,A,D');\n        var game = this;\n        this.matter.world.on('collisionstart', function (event) {\n            //  Loop through all of the collision pairs\n            Object.keys(crates).forEach(function (key) {\n                var crate = crates[key];\n                crate.neighbors.clear();\n            });\n            var pairs = event.pairs;\n            var _loop_1 = function (i) {\n                var bodyA = pairs[i].bodyA;\n                var bodyB = pairs[i].bodyB;\n                if ((bodyB.label.includes('lizard') && bodyA.label === 'fire') ||\n                    (bodyA.label.includes('lizard') && bodyB.label === 'fire')) {\n                    fire.destroy();\n                    fireActive = false;\n                    // console.log(this.lizards);\n                    game.lizards[0].ignite(game);\n                }\n                if ((bodyB.label === 'spider' && bodyA.label === 'fire') ||\n                    (bodyA.label === 'spider' && bodyB.label === 'fire')) {\n                    fire.destroy();\n                    fireActive = false;\n                    spider.hitFire();\n                }\n                if ((bodyB.label.includes('lizard') && bodyA.label === 'lava') ||\n                    (bodyA.label.includes('lizard') && bodyB.label === 'lava')) {\n                    console.log('lavahit');\n                    lava.ignite(game);\n                }\n                if ((bodyB.label.includes('spider') && bodyA.label.includes('lizard')) ||\n                    (bodyA.label.includes('spider') && bodyB.label.includes('lizard'))) {\n                    console.log('lizardspider');\n                    if (game.lizards[0].onFire) {\n                        spider.hitFire();\n                    }\n                }\n                if (bodyB.label.includes('lizard') && bodyA.label.includes('crate') && game.lizards[0].onFire) {\n                    igniteCompound(game, crates[bodyA.label].owner, false);\n                }\n                if (bodyA.label.includes('lizard') && bodyB.label.includes('crate') && game.lizards[0].onFire) {\n                    igniteCompound(game, crates[bodyB.label].owner, false);\n                }\n                //  sensor collisions\n                if (pairs[i].isSensor) {\n                    var playerBody = void 0;\n                    var otherBody = void 0;\n                    if (bodyA.isSensor) {\n                        playerBody = bodyA;\n                        otherBody = bodyB;\n                    }\n                    else if (bodyB.isSensor) {\n                        playerBody = bodyB;\n                        otherBody = bodyB;\n                    }\n                    if (playerBody.label === 'groundSensor' && otherBody.label != 'fire') {\n                        player.touchingGround = true;\n                    }\n                }\n                // fire collision\n                if (bodyA.label === 'fire' && bodyB.label.includes('crate')) {\n                    igniteCompound(game, crates[bodyB.label].owner, true);\n                }\n                if (bodyB.label === 'fire' && bodyA.label.includes('crate')) {\n                    igniteCompound(game, crates[bodyA.label].owner, true);\n                }\n                if (bodyA.label.includes('TurnSensor') || bodyB.label.includes('TurnSensor')) {\n                    var monsterBody = bodyA.label.includes('TurnSensor') ? bodyA : bodyB;\n                    var otherBody_1 = bodyA.label.includes('TurnSensor') ? bodyB : bodyA;\n                    var turnFlag_1 = true;\n                    monsterCollisionLabels.forEach(function (label) {\n                        if (otherBody_1.label.includes(label)) {\n                            turnFlag_1 = false;\n                        }\n                    });\n                    if (turnFlag_1) {\n                        if (monsterBody.label.includes('lizard')) {\n                            game.lizards[0].flip();\n                        }\n                        else {\n                            spider.flip();\n                        }\n                    }\n                }\n            };\n            for (var i = 0; i < pairs.length; i++) {\n                _loop_1(i);\n            }\n        });\n        // this.matter.world.on('collisionactive', function (event) {\n        //   //  Loop through all of the collision pairs\n        //   const pairs = event.pairs;\n        //   for (let i = 0; i < pairs.length; i++) {\n        //     const bodyA = pairs[i].bodyA;\n        //     const bodyB = pairs[i].bodyB;\n        //     if (bodyA.label.includes('crate') && bodyB.label.includes('crate')) {\n        //       addNeighbor(crates[bodyA.label], crates[bodyB.label]);\n        //     }\n        //   }\n        // });\n    };\n    GameScene.prototype.update = function () {\n        clearTiles();\n        // add to tiles\n        Object.keys(crates).forEach(function (key) {\n            var curr = crates[key];\n            var pos = getTile(curr.crate.position.x, curr.crate.position.y);\n            tiles[pos[0]][pos[1]].add(curr);\n        });\n        // const pos = getTile(lava.sprite.position.x, lava.sprite.position.y);\n        // tiles[pos[0]][pos[1]].add(lava);\n        // const lizPos = getTile(lizard.sprite.x, lizard.sprite.y);\n        // tiles[lizPos[0]][lizPos[1]].add(lizard);\n        this.lizards.forEach(function (lizard) {\n            lizard.sprite.setVelocityX(lizard.velocity);\n        });\n        if (spider.sprite.active) {\n            spider.sprite.setVelocityX(spider.velocity);\n        }\n        if (wasd.A.isDown) {\n            player.moveLeft();\n        }\n        else if (wasd.D.isDown) {\n            player.moveRight();\n        }\n        else {\n            player.turn();\n        }\n        if (wasd.W.isDown && player.touchingGround) {\n            player.jump();\n        }\n        if ((cursors.right.isDown || cursors.down.isDown || cursors.up.isDown || cursors.left.isDown) &&\n            !fireActive &&\n            !fireCooldown) {\n            fireCooldown = true;\n            fire = this.matter.add.sprite(player.getX(), player.getY(), 'fireball', null, {\n                isSensor: true,\n                label: 'fire',\n            });\n            fire.setCollisionCategory(0x0100);\n            if (cursors.left.isDown) {\n                fire.setRotation(Math.PI);\n            }\n            if (cursors.down.isDown) {\n                fire.setRotation(Math.PI / 2);\n            }\n            if (cursors.up.isDown) {\n                fire.setRotation((3 * Math.PI) / 2);\n            }\n            fire.anims.play('fireball', true);\n            fire.setIgnoreGravity(true);\n            var xDir = cursors.right.isDown ? 1 : -1;\n            var xVel = cursors.right.isDown || cursors.left.isDown ? 10 : 0;\n            fire.setVelocityX(xVel * xDir);\n            var yDir = cursors.down.isDown ? 1 : -1;\n            var yVel = cursors.down.isDown || cursors.up.isDown ? 10 : 0;\n            fire.setVelocityY(yVel * yDir);\n            fireActive = true;\n            setTimeout(function () {\n                if (fireActive) {\n                    fireActive = false;\n                    fire.destroy();\n                }\n                fireCooldown = false;\n            }, 500);\n        }\n        Object.keys(crates).forEach(function (key) {\n            var crate = crates[key];\n            if (crate.fireSprite != null) {\n                crate.syncFire();\n            }\n        });\n        this.lizards.forEach(function (lizard) {\n            if (lizard.onFire) {\n                lizard.syncFire();\n            }\n        });\n    };\n    return GameScene;\n}(Phaser.Scene));\nexports.GameScene = GameScene;\n\n\n//# sourceURL=webpack:///./src/scenes/game-scene.ts?");

/***/ }),

/***/ "./src/scenes/level-editor-scene.ts":
/*!******************************************!*\
  !*** ./src/scenes/level-editor-scene.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.LevelEditor = void 0;\nvar alignGrid_1 = __webpack_require__(/*! ../helpers/alignGrid */ \"./src/helpers/alignGrid.ts\");\nvar levelEditorButton_1 = __webpack_require__(/*! ../helpers/levelEditorButton */ \"./src/helpers/levelEditorButton.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'LevelEditor',\n};\nvar W_WIDTH = 1200;\nvar W_HEIGHT = 600;\nvar FileSaver = __webpack_require__(/*! file-saver */ \"./node_modules/file-saver/dist/FileSaver.min.js\");\nvar cursors;\nvar controls;\nvar grid;\nvar pointer;\nvar aGrid;\nvar graphics;\n// let menuPositions = [];\n// let menuNames = []\n// for (let i = 0; i < 8; i++) {\n//   menuPositions.push(200 + i * 36);\n// }\nvar LevelEditor = /** @class */ (function (_super) {\n    __extends(LevelEditor, _super);\n    function LevelEditor() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        _this.selected = 'crate';\n        _this.onButton = false;\n        return _this;\n    }\n    LevelEditor.prototype.preload = function () {\n        this.load.image('background', 'assets/backgrounds/level-editor.png');\n        this.load.image('house', 'assets/squares/house.png');\n        this.load.spritesheet('crate', 'assets/clumpables/crateTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('dirt', 'assets/clumpables/dirtTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('steel', 'assets/clumpables/steelTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('lava', 'assets/clumpables/lavaTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 38, frameHeight: 19 });\n        this.load.spritesheet('player', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });\n        this.load.spritesheet('lizard', 'assets/monsters/lizard.png', { frameWidth: 70, frameHeight: 50 });\n        this.load.spritesheet('spider', 'assets/monsters/spider.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('spiderArmored', 'assets/monsters/spiderArmored.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('squareFire', 'assets/squares/squareFire.png', { frameWidth: 79, frameHeight: 80 });\n        this.load.spritesheet('fireDisappear', 'assets/squares/fireDisappear.png', { frameWidth: 84, frameHeight: 133 });\n    };\n    LevelEditor.prototype.create = function () {\n        // const graphics = this.add.graphics();\n        var sx = 0;\n        var sy = 0;\n        var draw = false;\n        pointer = this.input.activePointer;\n        var background = this.add.image(W_WIDTH / 2, W_HEIGHT / 2, 'background');\n        background.setScale(W_WIDTH / background.width);\n        cursors = this.input.keyboard.createCursorKeys();\n        this.matter.world.setBounds(0, 0, W_WIDTH, W_HEIGHT, 32, true, true, false, true);\n        this.cameras.main.setBounds(0, 0, W_WIDTH, W_HEIGHT);\n        var controlConfig = {\n            camera: this.cameras.main,\n            left: cursors.left,\n            right: cursors.right,\n            up: cursors.up,\n            down: cursors.down,\n            acceleration: 0.3,\n            drag: 0.0005,\n            maxSpeed: 0.3,\n        };\n        var gridConfig = {\n            scene: this,\n            cols: W_WIDTH / 50,\n            rows: W_HEIGHT / 50,\n        };\n        aGrid = new alignGrid_1.default(gridConfig);\n        controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);\n        new levelEditorButton_1.default(550, 100, 'Download', '#fff', 'download', this);\n        new levelEditorButton_1.default(550, 150, 'Clump', '#fff', 'clump', this);\n        var menuNames = ['Clear', 'Crate', 'Lava', 'Dirt', 'Steel', 'Lizard', 'Spider', 'Player', 'Armored\\n Spider'];\n        var menuSelects = ['clear', 'crate', 'lava', 'dirt', 'steel', 'lizard', 'spider', 'player', 'spiderArmored'];\n        var menuButtons = [];\n        for (var i = 0; i < 8; i++) {\n            menuButtons.push(new levelEditorButton_1.default(550, 200 + i * 36, menuNames[i], '#fff', menuSelects[i], this));\n        }\n        this.input.on('pointerdown', function (pointer) {\n            sx = pointer.worldX;\n            sy = pointer.worldY;\n            if (game.selected == 'clump') {\n                draw = true;\n            }\n        });\n        // initalize graphics to draw highlighting rectangle and be drawn on top\n        this.graphics = this.add.graphics();\n        this.graphics.depth = 2;\n        // eslint-disable-next-line @typescript-eslint/no-this-alias\n        var game = this;\n        this.input.on('pointerup', function () {\n            draw = false;\n            game.graphics.clear();\n            if (game.selected == 'clump') {\n                var sr = aGrid.getRowOrCol(Math.min(sx, pointer.worldX));\n                var sc = aGrid.getRowOrCol(Math.min(sy, pointer.worldY));\n                var er = aGrid.getRowOrCol(Math.max(sx, pointer.worldX));\n                var ec = aGrid.getRowOrCol(Math.max(sy, pointer.worldY));\n                aGrid.clump(sr, sc, er, ec);\n            }\n        });\n        this.input.on('pointermove', function (pointer) {\n            if (draw && pointer.noButtonDown() === false && game.selected == 'clump') {\n                // graphics.clear();\n                var graphics_1 = game.graphics;\n                graphics_1.clear();\n                graphics_1.fillStyle(0x0000ff, 0.4);\n                graphics_1.lineStyle(2, 0x0000ff, 0.75);\n                graphics_1.fillRect(sx, sy, pointer.worldX - sx, pointer.worldY - sy);\n                graphics_1.strokeRect(sx, sy, pointer.worldX - sx, pointer.worldY - sy);\n            }\n        });\n        // const crateButton = new LevelEditorButton(550, , 'Crate', '#fff', 'crate', this);\n        // const lavaButton = new LevelEditorButton(550, 236, 'Lava', '#fff', 'lava', this);\n        // const dirtButton = new LevelEditorButton(550, 272, 'Dirt', '#fff', 'dirt', this);\n        // const steelButton = new LevelEditorButton(550, 308, 'Steel', '#fff', 'steel', this);\n        // const lizardButton = new LevelEditorButton(550, 308, 'Lizard', '#fff', 'lizard', this);\n        // const spiderButton = new LevelEditorButton(550, 308, 'Spider', '#fff', 'spider', this);\n        // const armorSpiderButton = new LevelEditorButton(550, 308, 'Armored Spider', '#fff', 'spiderArmored', this);\n        // const playerButton = new LevelEditorButton(550, 308, 'Player', '#fff', 'player', this);\n        aGrid.show();\n        aGrid.placeAt(350, 350, 'player', this);\n    };\n    LevelEditor.prototype.generateJson = function () {\n        var clumpables = new Set(['crate', 'lava', 'dirt', 'steel']);\n        var json = {\n            player: [],\n            lizard: [],\n            spider: [],\n            armoredSpider: [],\n            dirt: [],\n            lava: [],\n            crate: [],\n            steel: [],\n        };\n        var grid = aGrid.grid;\n        for (var i = 0; i < grid.length; i++) {\n            for (var j = 0; j < grid[0].length; j++) {\n                if (grid[i][j]) {\n                    var obj = grid[i][j];\n                    // if (clumpables.has(obj.name)) {\n                    //   json[obj.name].push({\n                    //     x: obj.x,\n                    //     y: obj.y,\n                    //     frame: obj.frame.name,\n                    //   });\n                    // }\n                    console.log(obj.name);\n                    json[obj.name].push({\n                        x: obj.x,\n                        y: obj.y,\n                        frame: obj.frame.name,\n                    });\n                }\n            }\n        }\n        // const download = JSON.stringify(json, null, 2);\n        var fileToSave = new Blob([JSON.stringify(json, null, 4)], {\n            type: 'application/json',\n        });\n        FileSaver(fileToSave, 'level.json');\n    };\n    LevelEditor.prototype.update = function (time, delta) {\n        controls.update(delta);\n        if (pointer.isDown) {\n            if (this.selected == 'clump') {\n                // this.graphics.clear();\n                // this.graphics.clear();\n                // let graphics = this.add.graphics();\n                // graphics.lineStyle(2, 0x0000ff, 0.75);\n                // graphics.strokeRect(this.sx, this.sy, pointer.x - this.sx, pointer.y - this.sy);\n                // graphics.strokeRect(0, 0, 100, 100);\n            }\n            else if (!this.onButton) {\n                aGrid.placeAt(pointer.worldX, pointer.worldY, this.selected, this);\n            }\n        }\n    };\n    return LevelEditor;\n}(Phaser.Scene));\nexports.LevelEditor = LevelEditor;\n\n\n//# sourceURL=webpack:///./src/scenes/level-editor-scene.ts?");

/***/ })

})