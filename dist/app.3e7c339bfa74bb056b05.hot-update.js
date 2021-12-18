webpackHotUpdate("app",{

/***/ "./src/helpers/init.ts":
/*!*****************************!*\
  !*** ./src/helpers/init.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.connectorBlocks = exports.jointBlocks = exports.initAnims = void 0;\nvar clump_1 = __webpack_require__(/*! ../helpers/clump */ \"./src/helpers/clump.ts\");\nvar connector_1 = __webpack_require__(/*! ../objects/connector */ \"./src/objects/connector.ts\");\nvar initAnims = function (game) {\n    game.anims.create({\n        key: 'squareFire',\n        frames: game.anims.generateFrameNumbers('squareFire', { start: 0, end: 4 }),\n        frameRate: 60,\n        repeat: -1,\n    });\n    game.anims.create({\n        key: 'fireball',\n        frames: game.anims.generateFrameNumbers('fireball', { start: 0, end: 1 }),\n        frameRate: 10,\n        repeat: -1,\n    });\n    game.anims.create({\n        key: 'fireDisappear',\n        frames: game.anims.generateFrameNumbers('fireDisappear', { start: 0, end: 39 }),\n        frameRate: 60,\n    });\n    game.anims.create({\n        key: 'lizard',\n        frames: game.anims.generateFrameNumbers('lizard', { start: 0, end: 29 }),\n        frameRate: 30,\n        repeat: -1,\n    });\n    game.anims.create({\n        key: 'left',\n        frames: game.anims.generateFrameNumbers('player', { start: 0, end: 3 }),\n        frameRate: 10,\n        repeat: -1,\n    });\n    game.anims.create({\n        key: 'turn',\n        frames: [{ key: 'player', frame: 4 }],\n        frameRate: 20,\n    });\n    game.anims.create({\n        key: 'right',\n        frames: game.anims.generateFrameNumbers('player', { start: 5, end: 8 }),\n        frameRate: 10,\n        repeat: -1,\n    });\n    game.anims.create({\n        key: 'spider',\n        frames: game.anims.generateFrameNumbers('spider', { start: 0, end: 5 }),\n        frameRate: 10,\n        repeat: -1,\n    });\n    game.anims.create({\n        key: 'spiderArmored',\n        frames: game.anims.generateFrameNumbers('spiderArmored', { start: 0, end: 5 }),\n        frameRate: 10,\n        repeat: -1,\n    });\n};\nexports.initAnims = initAnims;\nfunction makeJoint(game, ax, ay, bx, by, body1, body2) {\n    game.matter.add.joint(body1, body2, 0, 1, {\n        pointA: { x: ax, y: ay },\n        pointB: { x: bx, y: by },\n        angularStiffness: 1,\n        stiffness: 1,\n        damping: 1,\n    });\n}\nvar jointBlocks = function (game, blocks, data) {\n    var track = new Set();\n    var items = [];\n    data.steel.forEach(function (e) { return items.push(e); });\n    data.crate.forEach(function (e) { return items.push(e); });\n    data.lava.forEach(function (e) { return items.push(e); });\n    items.forEach(function (e) {\n        track.add(blocks[e.x + ',' + e.y]);\n        var sprite = blocks[e.x + ',' + e.y].sprite;\n        var id = clump_1.indexes[e.frame];\n        // odd numbers are sides\n        var sides = id.split('');\n        var upId = e.x + ',' + (e.y - 50);\n        var rightId = e.x + 50 + ',' + e.y;\n        var downId = e.x + ',' + (e.y + 50);\n        var leftId = e.x - 50 + ',' + e.y;\n        var upJId = e.x + ',' + (e.y - 25);\n        var rightJId = e.x + 25 + ',' + e.y;\n        var downJId = e.x + ',' + (e.y + 25);\n        var leftJId = e.x - 25 + ',' + e.y;\n        if (sides[1] == 1 && !track.has(upJId)) {\n            var up = blocks[upId];\n            for (var p = -24; p < 25; p++) {\n                makeJoint(game, p, -25, p, 25, sprite.body, up.sprite.body);\n            }\n            // makeJoint(game, 20, -25, 20, 25, sprite.body, up.sprite.body);\n            // makeJoint(game, 0, -25, 0, 25, sprite.body, up.sprite.body);\n            // makeJoint(game, -20, -25, -20, 25, sprite.body, up.sprite.body);\n            track.add(upJId);\n        }\n        if (sides[3] == 1 && !track.has(rightJId)) {\n            var right = blocks[rightId];\n            for (var p = -24; p < 25; p++) {\n                makeJoint(game, 25, p, -25, p, sprite.body, right.sprite.body);\n            }\n            // makeJoint(game, 25, 20, -25, 20, sprite.body, right.sprite.body);\n            // makeJoint(game, 25, 0, -25, 0, sprite.body, right.sprite.body);\n            // makeJoint(game, 25, -20, -25, -20, sprite.body, right.sprite.body);\n            track.add(rightJId);\n        }\n        if (sides[5] == 1 && !track.has(downJId)) {\n            var down = blocks[downId];\n            for (var p = -24; p < 25; p++) {\n                makeJoint(game, p, 25, p, -25, sprite.body, down.sprite.body);\n            }\n            // makeJoint(game, -20, 25, -20, -25, sprite.body, down.sprite.body);\n            // makeJoint(game, 0, 25, 0, -25, sprite.body, down.sprite.body);\n            // makeJoint(game, 20, 25, 20, -25, sprite.body, down.sprite.body);\n            track.add(downJId);\n        }\n        if (sides[7] == 1 && !track.has(leftJId)) {\n            var left = blocks[leftId];\n            for (var p = -24; p < 25; p++) {\n                makeJoint(game, -25, p, 25, p, sprite.body, left.sprite.body);\n            }\n            // makeJoint(game, -25, 20, 25, 20, sprite.body, left.sprite.body);\n            // makeJoint(game, -25, 0, 25, 0, sprite.body, left.sprite.body);\n            // makeJoint(game, -25, -20, 25, -20, sprite.body, left.sprite.body);\n            track.add(leftJId);\n        }\n    });\n};\nexports.jointBlocks = jointBlocks;\nvar connectorBlocks = function (game, blocks, data) {\n    data.connector.forEach(function (e) {\n        var x = parseInt(e.substring(0, e.indexOf(',')));\n        var y = parseInt(e.substring(e.indexOf(',') + 1));\n        if (x % 50 == 0) {\n            new connector_1.default(blocks[x - 25 + ',' + y], blocks[x + 25 + ',' + y], game);\n        }\n        else {\n            new connector_1.default(blocks[x + ',' + (y - 25)], blocks[x + ',' + (y + 25)], game);\n        }\n    });\n};\nexports.connectorBlocks = connectorBlocks;\n\n\n//# sourceURL=webpack:///./src/helpers/init.ts?");

/***/ }),

/***/ "./src/objects/connector.ts":
/*!**********************************!*\
  !*** ./src/objects/connector.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar crate_1 = __webpack_require__(/*! ./crate */ \"./src/objects/crate.ts\");\nvar Connector = /** @class */ (function () {\n    function Connector(obj1, obj2, game) {\n        var x1 = obj1.sprite.x;\n        var x2 = obj2.sprite.x;\n        var y1 = obj1.sprite.y;\n        var y2 = obj2.sprite.y;\n        var posx = (Math.max(x2, x1) - Math.min(x2, x1)) / 2;\n        var posy = (Math.max(y2, y1) - Math.min(y2, y1)) / 2;\n        var connector = game.matter.add.image(x2 + (x1 - x2) / 2, y2 + (y1 - y2) / 2, 'connector', null, {\n            isSensor: true,\n            ignoreGravity: true,\n        });\n        var constraints = [];\n        for (var p = -24; p < 25; p++) {\n            var px = x2 - x1 == 0;\n            var py = y2 - y1 == 0;\n            constraints.push(game.matter.add.joint(obj1.sprite.body, obj2.sprite.body, 0, 1, {\n                pointA: { x: px ? p : (x2 - x1) / 2, y: py ? p : (y2 - y1) / 2 },\n                pointB: { x: px ? p : (x1 - x2) / 2, y: py ? p : (y1 - y2) / 2 },\n                angularStiffness: 1,\n                stiffness: 1,\n                damping: 1,\n            }));\n        }\n        this.constraints = constraints;\n        if (x2 - x1 == 0) {\n            connector.angle = 90;\n        }\n        this.connectorPin = game.matter.add.joint(obj1.sprite.body, connector.body, 0, 1, {\n            pointA: { x: 0, y: 0 },\n            pointB: { x: (x1 - x2) / 2, y: (y1 - y2) / 2 },\n            angularStiffness: 1,\n            stiffness: 1,\n            damping: 1,\n        });\n        this.sprite = connector;\n        if (obj1 instanceof crate_1.default) {\n            obj1.connectors.add(this);\n        }\n        if (obj2 instanceof crate_1.default) {\n            obj2.connectors.add(this);\n        }\n    }\n    Connector.prototype.destroy = function (game) {\n        this.sprite.destroy();\n        this.constraints.forEach(function (e) {\n            console.log(e);\n            game.matter.world.removeConstraint(e);\n        });\n        game.matter.world.removeConstraint(this.connectorPin);\n    };\n    return Connector;\n}());\nexports.default = Connector;\n\n\n//# sourceURL=webpack:///./src/objects/connector.ts?");

/***/ }),

/***/ "./src/objects/crate.ts":
/*!******************************!*\
  !*** ./src/objects/crate.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Crate = /** @class */ (function () {\n    // timeIgnite: number;\n    function Crate(x, y, id, game, frame, isLava) {\n        if (frame === void 0) { frame = 0; }\n        var rec = game.matter.bodies.rectangle(x, y, 50, 50, {\n            label: 'crate' + id,\n            inertia: Infinity,\n        });\n        var imageString = isLava ? 'lava' : 'crate';\n        var crate = game.matter.add.sprite(x, y, imageString, frame);\n        crate.setExistingBody(rec);\n        // this.crate.setRectangle(100, 50, {\n        //   render: { sprite: { xOffset: 0, yOffset: 0.15 } },\n        //   label: label,\n        //   inertia: Infinity,\n        // });\n        crate.setCollisionCategory(0x0100);\n        crate.setBounce(0);\n        crate.setFriction(1);\n        crate.setFrictionStatic(100);\n        this.sprite = crate;\n        this.onFire = false;\n        this.fireSprite = null;\n        this.connectors = new Set();\n        this.isLava = isLava;\n        // this.timeIgnite = null;\n    }\n    Crate.prototype.syncFire = function () {\n        if (this.sprite.active) {\n            this.fireSprite.x = this.sprite.x;\n            this.fireSprite.y = this.sprite.y - 10;\n        }\n    };\n    Crate.prototype.destroy = function (game) {\n        if (!this.isLava) {\n            this.sprite.destroy();\n            this.connectors.forEach(function (e) {\n                e.destroy(game);\n            });\n        }\n    };\n    return Crate;\n}());\nexports.default = Crate;\n\n\n//# sourceURL=webpack:///./src/objects/crate.ts?");

/***/ }),

/***/ "./src/scenes/game-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/game-scene.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.GameScene = void 0;\nvar player_1 = __webpack_require__(/*! ../objects/player */ \"./src/objects/player.ts\");\nvar crate_1 = __webpack_require__(/*! ../objects/crate */ \"./src/objects/crate.ts\");\nvar compoundCrate_1 = __webpack_require__(/*! ../objects/compoundCrate */ \"./src/objects/compoundCrate.ts\");\nvar lizard_1 = __webpack_require__(/*! ../objects/lizard */ \"./src/objects/lizard.ts\");\nvar spider_1 = __webpack_require__(/*! ../objects/spider */ \"./src/objects/spider.ts\");\nvar dirt_1 = __webpack_require__(/*! ../objects/dirt */ \"./src/objects/dirt.ts\");\nvar steel_1 = __webpack_require__(/*! ../objects/steel */ \"./src/objects/steel.ts\");\nvar menu_button_1 = __webpack_require__(/*! ../ui/menu-button */ \"./src/ui/menu-button.ts\");\nvar clump_1 = __webpack_require__(/*! ../helpers/clump */ \"./src/helpers/clump.ts\");\nvar exit_1 = __webpack_require__(/*! ../objects/exit */ \"./src/objects/exit.ts\");\nvar init_1 = __webpack_require__(/*! ../helpers/init */ \"./src/helpers/init.ts\");\nvar collision_controller_1 = __webpack_require__(/*! ../helpers/collision-controller */ \"./src/helpers/collision-controller.ts\");\nvar bomb_1 = __webpack_require__(/*! ../objects/bomb */ \"./src/objects/bomb.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'Game',\n};\nvar cursors;\nvar wasd;\nvar world_bound_width = 1200;\nvar world_bound_height = 600;\nfunction getTile(x, y) {\n    return [Math.floor(x / 50), Math.floor(y / 50)];\n}\nfunction clearTiles(game) {\n    for (var i = 0; i < game.tiles.length; i++) {\n        for (var j = 0; j < game.tiles[0].length; j++) {\n            game.tiles[i][j].clear();\n        }\n    }\n}\nvar GameScene = /** @class */ (function (_super) {\n    __extends(GameScene, _super);\n    function GameScene() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        _this.lizards = {};\n        _this.spiders = {};\n        _this.lavas = {};\n        _this.crates = {};\n        _this.bombs = {};\n        _this.fireActive = false;\n        _this.fireCooldown = false;\n        _this.tiles = [];\n        _this.blocks = {};\n        _this.TILE_SIZE = 50;\n        _this.xTiles = Math.floor(world_bound_width / _this.TILE_SIZE);\n        _this.yTiles = Math.floor(world_bound_height / _this.TILE_SIZE);\n        // public compounds = {};\n        _this.level = 'level' + localStorage.getItem('level');\n        return _this;\n    }\n    GameScene.prototype.preload = function () {\n        this.load.json('level' + localStorage.getItem('level'), 'assets/levels/' + localStorage.getItem('level') + '.json');\n    };\n    GameScene.prototype.create = function () {\n        var _this = this;\n        init_1.initAnims(this);\n        var background = this.add.tileSprite(world_bound_width / 2, world_bound_height / 2, world_bound_width, world_bound_height, 'backgroundDirt');\n        // background.setScale(world_bound_width / background.width);\n        background.setDepth(-10);\n        this.matter.world.setBounds(0, 0, world_bound_width, world_bound_height, 32, true, true, false, true);\n        this.cameras.main.setBounds(0, 0, world_bound_width, world_bound_height).setName('main');\n        var data = localStorage.getItem('useleveleditor') == 'true'\n            ? JSON.parse(localStorage.getItem('leveleditorlevel'))\n            : this.cache.json.get('level' + localStorage.getItem('level'));\n        this.xTiles = Math.floor(world_bound_width / this.TILE_SIZE);\n        this.yTiles = Math.floor(world_bound_height / this.TILE_SIZE);\n        this.fire = null;\n        this.fireActive = false;\n        this.fireCooldown = false;\n        for (var i = 0; i < this.xTiles; i++) {\n            var row = [];\n            for (var j = 0; j < this.yTiles; j++) {\n                row.push(new Set());\n            }\n            this.tiles.push(row);\n        }\n        this.player = new player_1.default(data.player[0].x, data.player[0].y, this);\n        this.cameras.main.startFollow(this.player.sprite, false, 0.2, 0.2);\n        this.cameras.main.fadeIn(100, 0, 0, 0);\n        // make lizards\n        this.lizards = {};\n        for (var i = 0; i < data.lizard.length; i++) {\n            var e = data.lizard[i];\n            this.lizards['lizard' + i] = new lizard_1.default(e.x, e.y, this, i);\n        }\n        // make spiders\n        this.spiders = {};\n        var spiderCounter = 0;\n        data.spider.forEach(function (e) {\n            _this.spiders['spider' + spiderCounter] = new spider_1.default(e.x, e.y, _this, spiderCounter, false);\n            spiderCounter += 1;\n        });\n        data.spiderArmored.forEach(function (e) {\n            _this.spiders['spider' + spiderCounter] = new spider_1.default(e.x, e.y, _this, spiderCounter, true);\n            spiderCounter += 1;\n        });\n        this.blocks = {};\n        // make steels\n        data.steel.forEach(function (e) {\n            _this.blocks[e.x + ',' + e.y] = new steel_1.default(e.x, e.y, _this, e.frame);\n        });\n        // make dirts\n        data.dirt.forEach(function (e) {\n            _this.blocks[e.x + ',' + e.y] = new dirt_1.default(e.x, e.y, _this, e.frame);\n        });\n        //make bombs\n        this.bombs = {};\n        for (var i = 0; i < data.bomb.length; i++) {\n            var e = data.bomb[i];\n            this.bombs['bomb' + i] = new bomb_1.default(e.x, e.y, i, this);\n            this.blocks[e.x + ',' + e.y] = this.bombs['bomb' + i];\n        }\n        var crates = new Set();\n        var counter = 0;\n        this.crates = {};\n        data.crate.forEach(function (e) {\n            _this.blocks[e.x + ',' + e.y] = new crate_1.default(e.x, e.y, counter, _this, e.frame, false);\n            crates.add(_this.blocks[e.x + ',' + e.y]);\n            _this.crates['crate' + counter] = _this.blocks[e.x + ',' + e.y];\n            counter += 1;\n        });\n        data.lava.forEach(function (e) {\n            _this.blocks[e.x + ',' + e.y] = new crate_1.default(e.x, e.y, counter, _this, e.frame, true);\n            crates.add(_this.blocks[e.x + ',' + e.y]);\n            _this.crates['crate' + counter] = _this.blocks[e.x + ',' + e.y];\n            counter += 1;\n        });\n        // new Connector(this.crates['crate' + 0], this.crates['crate' + 1], this);\n        data.exit.forEach(function (e) {\n            new exit_1.default(e.x, e.y, _this);\n        });\n        // compound the crates\n        var trackCrates = new Set();\n        var crateAndLava = data.crate.concat(data.lava);\n        crateAndLava.forEach(function (e) {\n            var name = e.x + ',' + e.y;\n            if (!trackCrates.has(name)) {\n                var curr = [name];\n                var next_1 = [];\n                var toCompound_1 = new Set();\n                while (curr.length != 0) {\n                    curr.forEach(function (i) {\n                        var id = clump_1.indexes[parseInt(_this.blocks[i].sprite.frame.name)];\n                        // odd numbers are sides\n                        var sides = id.split('');\n                        trackCrates.add(i);\n                        toCompound_1.add(_this.blocks[i]);\n                        var x = _this.blocks[i].sprite.x;\n                        var y = _this.blocks[i].sprite.y;\n                        var up = x + ',' + (y - 50);\n                        var right = x + 50 + ',' + y;\n                        var down = x + ',' + (y + 50);\n                        var left = x - 50 + ',' + y;\n                        function compoundCrates(tile, game) {\n                            next_1.push(tile);\n                            trackCrates.add(tile);\n                            toCompound_1.add(game.blocks[tile]);\n                        }\n                        if (sides[1] == 1 && !trackCrates.has(up)) {\n                            compoundCrates(up, _this);\n                        }\n                        if (sides[3] == 1 && !trackCrates.has(right)) {\n                            compoundCrates(right, _this);\n                        }\n                        if (sides[5] == 1 && !trackCrates.has(down)) {\n                            compoundCrates(down, _this);\n                        }\n                        if (sides[7] == 1 && !trackCrates.has(left)) {\n                            compoundCrates(left, _this);\n                        }\n                    });\n                    curr = next_1;\n                    next_1 = [];\n                }\n                new compoundCrate_1.default(_this, toCompound_1, 'compound');\n            }\n        });\n        // const compoundTest = new CompoundCrate(this, crates, 'test1');\n        // for (let i = 0; i < data.lava.length; i++) {\n        //   const e = data.lava[i];\n        //   const temp = new Lava(e.x, e.y, this, e.frame, i);\n        //   this.lavas['lava' + i] = temp;\n        //   this.blocks[e.x + ',' + e.y] = temp;\n        // }\n        init_1.jointBlocks(this, this.blocks, data);\n        collision_controller_1.createCollisions(this);\n        init_1.connectorBlocks(this, this.blocks, data);\n        cursors = this.input.keyboard.createCursorKeys();\n        wasd = this.input.keyboard.addKeys('W,S,A,D');\n        new menu_button_1.MenuButton(this, 10, 10, 'Back to Menu', function () {\n            _this.scene.start('MainMenu');\n        });\n    };\n    GameScene.prototype.update = function () {\n        var _this = this;\n        // add crates to tiles\n        clearTiles(this);\n        Object.keys(this.crates).forEach(function (key) {\n            var curr = _this.crates[key];\n            if (curr.sprite.active) {\n                var pos = getTile(curr.sprite.x, curr.sprite.y);\n                _this.tiles[pos[0]][pos[1]].add(curr);\n            }\n        });\n        // add lavas to tiles\n        Object.keys(this.lavas).forEach(function (key) {\n            var curr = _this.lavas[key];\n            if (curr.sprite.active) {\n                var pos = getTile(curr.sprite.x, curr.sprite.y);\n                _this.tiles[pos[0]][pos[1]].add(curr);\n            }\n        });\n        for (var _i = 0, _a = Object.entries(this.lizards); _i < _a.length; _i++) {\n            var _b = _a[_i], key = _b[0], lizard = _b[1];\n            lizard.update();\n        }\n        for (var _c = 0, _d = Object.entries(this.spiders); _c < _d.length; _c++) {\n            var _e = _d[_c], key = _e[0], spider = _e[1];\n            spider.update();\n        }\n        if (wasd.A.isDown) {\n            this.player.moveLeft();\n        }\n        else if (wasd.D.isDown) {\n            this.player.moveRight();\n        }\n        else {\n            this.player.turn();\n        }\n        if (wasd.W.isDown && this.player.touchingGround) {\n            this.player.jump();\n        }\n        //shooting fire and setting the direction\n        if ((cursors.right.isDown || cursors.down.isDown || cursors.up.isDown || cursors.left.isDown) &&\n            !this.fireActive &&\n            !this.fireCooldown) {\n            this.fireCooldown = true;\n            this.fire = this.matter.add.sprite(this.player.getX(), this.player.getY(), 'fireball', null, {\n                isSensor: true,\n                label: 'fire',\n            });\n            this.fire.setCollisionCategory(0x0100);\n            if (cursors.left.isDown) {\n                this.fire.setRotation(Math.PI);\n            }\n            if (cursors.down.isDown) {\n                this.fire.setRotation(Math.PI / 2);\n            }\n            if (cursors.up.isDown) {\n                this.fire.setRotation((3 * Math.PI) / 2);\n            }\n            this.fire.anims.play('fireball', true);\n            this.fire.setIgnoreGravity(true);\n            var xDir = cursors.right.isDown ? 1 : -1;\n            var xVel = cursors.right.isDown || cursors.left.isDown ? 10 : 0;\n            this.fire.setVelocityX(xVel * xDir);\n            var yDir = cursors.down.isDown ? 1 : -1;\n            var yVel = cursors.down.isDown || cursors.up.isDown ? 10 : 0;\n            this.fire.setVelocityY(yVel * yDir);\n            this.fireActive = true;\n            setTimeout(function () {\n                if (_this.fireActive) {\n                    _this.fireActive = false;\n                    _this.fire.destroy();\n                }\n                _this.fireCooldown = false;\n            }, 500);\n        }\n        Object.keys(this.crates).forEach(function (key) {\n            var crate = _this.crates[key];\n            if (crate.fireSprite != null) {\n                crate.syncFire();\n            }\n        });\n    };\n    return GameScene;\n}(Phaser.Scene));\nexports.GameScene = GameScene;\n\n\n//# sourceURL=webpack:///./src/scenes/game-scene.ts?");

/***/ })

})