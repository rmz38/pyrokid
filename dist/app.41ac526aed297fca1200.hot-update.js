webpackHotUpdate("app",{

/***/ "./src/objects/compoundCrate.ts":
/*!**************************************!*\
  !*** ./src/objects/compoundCrate.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar CompoundCrate = /** @class */ (function () {\n    function CompoundCrate(game, crates, label) {\n        var _this = this;\n        // this.sprite = game.matter.add.sprite(0, 0, image, 0, { label: label });\n        this.crates = crates;\n        // const crateBodies = [];\n        crates.forEach(function (e) {\n            // crateBodies.push(e.sprite);\n            e.owner = _this;\n        });\n        // const yOffset = image == 'crate' ? 0.15 : 0;\n        // const compoundBody = game.matter.body.create({\n        //   parts: crateBodies,\n        //   inertia: Infinity,\n        //   // render: { sprite: { xOffset: 0, yOffset: yOffset } },\n        //   // isStatic: true,\n        //   ignoreGravity: false,\n        //   // frictionStatic: 1.0,\n        //   // friction: 1.0,\n        // });\n        // this.sprite.setExistingBody(compoundBody);\n        // this.sprite.setCollisionCategory(0x0100);\n        // this.sprite.body.render.sprite.xOffset = 0;\n        // this.sprite.body.render.sprite.yOffset = -10;\n        // this.sprite.setPosition(x, y);\n        this.onFire = false;\n    }\n    return CompoundCrate;\n}());\nexports.default = CompoundCrate;\n\n\n//# sourceURL=webpack:///./src/objects/compoundCrate.ts?");

/***/ }),

/***/ "./src/objects/crate.ts":
/*!******************************!*\
  !*** ./src/objects/crate.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Crate = /** @class */ (function () {\n    // timeIgnite: number;\n    function Crate(x, y, id, game, frame) {\n        if (frame === void 0) { frame = 0; }\n        var rec = game.matter.bodies.rectangle(x, y, 50, 50, {\n            label: 'crate' + id,\n            inertia: Infinity,\n        });\n        var crate = game.matter.add.sprite(x, y, 'crate', frame);\n        crate.setExistingBody(rec);\n        // this.crate.setRectangle(100, 50, {\n        //   render: { sprite: { xOffset: 0, yOffset: 0.15 } },\n        //   label: label,\n        //   inertia: Infinity,\n        // });\n        crate.setCollisionCategory(0x0100);\n        crate.setBounce(0);\n        this.sprite = crate;\n        this.onFire = false;\n        this.fireSprite = null;\n        console.log(this.sprite);\n        // this.timeIgnite = null;\n    }\n    Crate.prototype.syncFire = function () {\n        if (this.sprite.active) {\n            this.fireSprite.x = this.sprite.x;\n            this.fireSprite.y = this.sprite.y - 10;\n        }\n    };\n    Crate.prototype.destroy = function () {\n        this.sprite.destroy();\n    };\n    return Crate;\n}());\nexports.default = Crate;\n\n\n//# sourceURL=webpack:///./src/objects/crate.ts?");

/***/ }),

/***/ "./src/objects/dirt.ts":
/*!*****************************!*\
  !*** ./src/objects/dirt.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Dirt = /** @class */ (function () {\n    function Dirt(x, y, game, frame) {\n        console.log(game);\n        var sprite = game.matter.add.sprite(x, y, 'dirt', frame, { isStatic: true });\n        sprite.setPosition(x, y);\n        sprite.setStatic(true);\n        sprite.setCollisionCategory(0x0100);\n        this.sprite = sprite;\n    }\n    return Dirt;\n}());\nexports.default = Dirt;\n\n\n//# sourceURL=webpack:///./src/objects/dirt.ts?");

/***/ }),

/***/ "./src/objects/lava.ts":
/*!*****************************!*\
  !*** ./src/objects/lava.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Lava = /** @class */ (function () {\n    function Lava(x, y, game, frame, id) {\n        var rec = game.matter.bodies.rectangle(x, y, 50, 50, {\n            inertia: Infinity,\n            isStatic: true,\n            label: 'lava' + id,\n        });\n        var lava = game.matter.add.sprite(x, y, 'lava', frame, { label: 'lava' + id });\n        lava.setExistingBody(rec);\n        lava.setCollisionCategory(0x0100);\n        lava.setPosition(x, y);\n        this.sprite = lava;\n    }\n    Lava.prototype.ignite = function (game) {\n        if (this.onFire) {\n            return;\n        }\n        this.onFire = true;\n        this.fireSprite = game.add.sprite(this.sprite.x, this.sprite.y, 'squareFire');\n        this.fireSprite.play('squareFire', false);\n        this.fireSprite.alpha = 0.7;\n        this.fireSprite.y = this.sprite.y - 10;\n    };\n    return Lava;\n}());\nexports.default = Lava;\n\n\n//# sourceURL=webpack:///./src/objects/lava.ts?");

/***/ }),

/***/ "./src/objects/lizard.ts":
/*!*******************************!*\
  !*** ./src/objects/lizard.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Lizard = /** @class */ (function () {\n    function Lizard(x, y, game, id) {\n        var lizRight = game.matter.bodies.rectangle(20, 0, 10, 10, { isSensor: true, label: 'lizard' + id });\n        var lizLeft = game.matter.bodies.rectangle(-20, 0, 10, 10, { isSensor: true, label: 'lizard' + id });\n        var lizardBody = game.matter.bodies.rectangle(0, 0, 40, 50, { label: 'lizard' + id });\n        // const collisionBody = game.matter.bodies.rectangle(0, 0, 1, 40, { isSensor: true, label: 'lizard' + id });\n        this.collisionSensor = game.matter.add.sprite(0, 0, 'lizard', null, {\n            isSensor: true,\n            label: 'lizard' + id,\n            ignoreGravity: true,\n        });\n        // this.collisionSensor.setExistingBody(collisionBody);\n        // this.collisionSensor = game.matter.add.sprite(0, 0, 'lizard', null, {\n        //   isSensor: true,\n        //   label: 'lizard' + id,\n        //   ignoreGravity: true,\n        // });\n        this.collisionSensor.alpha = 0;\n        console.log(this.collisionSensor.body);\n        // const spiderSensor = game.matter.bodies.rectangle(0, 0, 70, 50, { label: 'lizard' });\n        var compound = game.matter.body.create({\n            parts: [lizardBody, lizRight, lizLeft],\n            inertia: Infinity,\n            render: { sprite: { xOffset: 0, yOffset: 0 } },\n        });\n        this.velocity = 1;\n        var lizard = game.matter.add.sprite(0, 0, 'lizard');\n        lizard.setExistingBody(compound);\n        lizard.setPosition(x, y);\n        lizard.setCollisionCategory(0x001);\n        lizard.setCollidesWith(0x0100);\n        console.log(lizard);\n        console.log(lizLeft);\n        lizLeft.collisionFilter.category = 0x0100;\n        this.sprite = lizard;\n        this.createAnims(game);\n        this.sprite.anims.play('lizard', true);\n        this.onFire = false;\n        this.fireSprite = null;\n    }\n    Lizard.prototype.createAnims = function (game) {\n        game.anims.create({\n            key: 'lizard',\n            frames: game.anims.generateFrameNumbers('lizard', { start: 0, end: 29 }),\n            frameRate: 30,\n            repeat: -1,\n        });\n    };\n    Lizard.prototype.flip = function () {\n        this.sprite.flipX = !this.sprite.flipX;\n        this.velocity = -1 * this.velocity;\n    };\n    Lizard.prototype.ignite = function (game) {\n        if (this.onFire) {\n            return;\n        }\n        this.onFire = true;\n        this.fireSprite = game.add.sprite(this.sprite.x, this.sprite.y, 'squareFire');\n        this.fireSprite.play('squareFire', false);\n        this.fireSprite.alpha = 0.7;\n    };\n    Lizard.prototype.syncFire = function () {\n        if (this.onFire) {\n            this.fireSprite.x = this.sprite.x;\n            this.fireSprite.y = this.sprite.y - 10;\n        }\n    };\n    Lizard.prototype.syncSensor = function () {\n        if (this.sprite.active) {\n            this.collisionSensor.setPosition(this.sprite.x, this.sprite.y);\n            // this.collisionSensor.position.x = this.sprite.x;\n            // this.collisionSensor.position.y = this.sprite.y;\n        }\n    };\n    Lizard.prototype.move = function () {\n        if (this.sprite.active) {\n            this.sprite.setVelocityX(this.velocity);\n        }\n    };\n    return Lizard;\n}());\nexports.default = Lizard;\n\n\n//# sourceURL=webpack:///./src/objects/lizard.ts?");

/***/ }),

/***/ "./src/objects/player.ts":
/*!*******************************!*\
  !*** ./src/objects/player.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Player = /** @class */ (function () {\n    function Player(x, y, game) {\n        var rec = game.matter.bodies.rectangle(0, 24, 10, 1, { isSensor: true, label: 'groundSensor' });\n        var playerBody = game.matter.bodies.rectangle(0, 0, 32, 48);\n        var compound = game.matter.body.create({\n            parts: [playerBody, rec],\n            inertia: Infinity,\n            render: { sprite: { xOffset: 0.5, yOffset: 0.5 } },\n        });\n        var player = game.matter.add.sprite(0, 0, 'dude');\n        player.setExistingBody(compound);\n        player.setFriction(0);\n        player.body.render.sprite.xOffset = 0;\n        player.body.render.sprite.yOffset = 0;\n        player.setPosition(x, y);\n        player.setCollisionCategory(0x0100);\n        this.sprite = player;\n        this.createAnims(game);\n    }\n    Player.prototype.createAnims = function (game) {\n        game.anims.create({\n            key: 'left',\n            frames: game.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),\n            frameRate: 10,\n            repeat: -1,\n        });\n        game.anims.create({\n            key: 'turn',\n            frames: [{ key: 'dude', frame: 4 }],\n            frameRate: 20,\n        });\n        game.anims.create({\n            key: 'right',\n            frames: game.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),\n            frameRate: 10,\n            repeat: -1,\n        });\n    };\n    Player.prototype.moveLeft = function () {\n        this.sprite.setVelocityX(-3);\n        this.sprite.anims.play('left', true);\n    };\n    Player.prototype.moveRight = function () {\n        this.sprite.setVelocityX(3);\n        this.sprite.anims.play('right', true);\n    };\n    Player.prototype.turn = function () {\n        this.sprite.setVelocityX(0);\n        this.sprite.anims.play('turn');\n    };\n    Player.prototype.jump = function () {\n        this.sprite.setVelocityY(-7);\n        this.touchingGround = false;\n    };\n    Player.prototype.getX = function () {\n        return this.sprite.body.position.x;\n    };\n    Player.prototype.getY = function () {\n        return this.sprite.body.position.y;\n    };\n    return Player;\n}());\nexports.default = Player;\n\n\n//# sourceURL=webpack:///./src/objects/player.ts?");

/***/ }),

/***/ "./src/objects/spider.ts":
/*!*******************************!*\
  !*** ./src/objects/spider.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Spider = /** @class */ (function () {\n    function Spider(x, y, game, id, armored) {\n        var spiderRight = game.matter.bodies.rectangle(37, 0, 10, 10, { isSensor: true, label: 'spider' + id });\n        var spiderLeft = game.matter.bodies.rectangle(-37, 0, 10, 10, { isSensor: true, label: 'spider' + id });\n        this.collisionSensor = game.matter.add.rectangle(0, 0, 60, 50, { isSensor: true, label: 'spider' + id });\n        this.collisionSensor.ignoreGravity = true;\n        this.collisionSensor.position.x = x;\n        this.collisionSensor.position.y = y;\n        // spiderLeft.collisionFilter.category = 0x0100;\n        var spiderBody = game.matter.bodies.rectangle(0, 0, 77, 50, { label: 'spider' + id });\n        var compound = game.matter.body.create({\n            parts: [spiderBody, spiderRight, spiderLeft],\n            inertia: Infinity,\n            render: { sprite: { xOffset: 0, yOffset: 0 } },\n        });\n        this.velocity = 1;\n        var spider = game.matter.add.sprite(0, 0, 'spider');\n        spider.setCollisionCategory(0x0001);\n        spider.setExistingBody(compound);\n        spider.setPosition(x, y);\n        spider.setCollidesWith(0x0100);\n        this.sprite = spider;\n        this.createAnims(game);\n        if (armored) {\n            this.sprite.anims.play('spiderArmored', true);\n        }\n        else {\n            this.sprite.anims.play('spider', true);\n        }\n        this.armored = true;\n    }\n    Spider.prototype.createAnims = function (game) {\n        game.anims.create({\n            key: 'spider',\n            frames: game.anims.generateFrameNumbers('spider', { start: 0, end: 9 }),\n            frameRate: 10,\n            repeat: -1,\n        });\n        game.anims.create({\n            key: 'spiderArmored',\n            frames: game.anims.generateFrameNumbers('spiderArmored', { start: 0, end: 9 }),\n            frameRate: 10,\n            repeat: -1,\n        });\n    };\n    Spider.prototype.flip = function () {\n        this.sprite.flipX = !this.sprite.flipX;\n        this.velocity = -1 * this.velocity;\n    };\n    Spider.prototype.hitFire = function () {\n        if (this.armored) {\n            this.armored = false;\n            var lastIndex = this.sprite.anims.currentFrame.index;\n            this.sprite.anims.play({ key: 'spider', startFrame: lastIndex - 1 });\n            //change sprite\n        }\n        else {\n            this.sprite.destroy();\n        }\n    };\n    Spider.prototype.hitLizard = function () {\n        // just dies because fire lizard one shots\n        this.armored = false;\n        this.sprite.destroy();\n        // this.collisionSensor.destroy();\n    };\n    Spider.prototype.syncSensor = function () {\n        if (this.sprite.active) {\n            this.collisionSensor.position.x = this.sprite.x;\n            this.collisionSensor.position.y = this.sprite.y;\n        }\n    };\n    Spider.prototype.move = function () {\n        if (this.sprite.active) {\n            this.sprite.setVelocityX(this.velocity);\n        }\n    };\n    return Spider;\n}());\nexports.default = Spider;\n\n\n//# sourceURL=webpack:///./src/objects/spider.ts?");

/***/ }),

/***/ "./src/objects/steel.ts":
/*!******************************!*\
  !*** ./src/objects/steel.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Steel = /** @class */ (function () {\n    function Steel(x, y, game, frame) {\n        var rec = game.matter.bodies.rectangle(x, y, 50, 50, {\n            inertia: Infinity,\n        });\n        var steel = game.matter.add.sprite(x, y, 'steel', frame);\n        steel.setExistingBody(rec);\n        steel.setCollisionCategory(0x0100);\n        steel.setPosition(x, y);\n        steel.setBounce(0);\n        this.sprite = steel;\n    }\n    return Steel;\n}());\nexports.default = Steel;\n\n\n//# sourceURL=webpack:///./src/objects/steel.ts?");

/***/ }),

/***/ "./src/scenes/game-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/game-scene.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.GameScene = void 0;\nvar player_1 = __webpack_require__(/*! ../objects/player */ \"./src/objects/player.ts\");\nvar crate_1 = __webpack_require__(/*! ../objects/crate */ \"./src/objects/crate.ts\");\nvar compoundCrate_1 = __webpack_require__(/*! ../objects/compoundCrate */ \"./src/objects/compoundCrate.ts\");\nvar lizard_1 = __webpack_require__(/*! ../objects/lizard */ \"./src/objects/lizard.ts\");\nvar spider_1 = __webpack_require__(/*! ../objects/spider */ \"./src/objects/spider.ts\");\nvar dirt_1 = __webpack_require__(/*! ../objects/dirt */ \"./src/objects/dirt.ts\");\nvar steel_1 = __webpack_require__(/*! ../objects/steel */ \"./src/objects/steel.ts\");\nvar lava_1 = __webpack_require__(/*! ../objects/lava */ \"./src/objects/lava.ts\");\nvar menu_button_1 = __webpack_require__(/*! ../ui/menu-button */ \"./src/ui/menu-button.ts\");\nvar clump_1 = __webpack_require__(/*! ../helpers/clump */ \"./src/helpers/clump.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'Game',\n};\nvar player;\nvar cursors;\nvar wasd;\nvar world_bound_width = 1200;\nvar world_bound_height = 600;\n// interface Crate {\n//   crate: any;\n//   onFire: boolean;\n//   neighbors: Set<Crate>;\n//   fireSprite: Phaser.GameObjects.Sprite;\n// }\nvar crates = {};\nvar compounds = {};\nvar monsterCollisionLabels = new Set(['lizard', 'spider', 'fire']);\nvar fire;\nvar fireActive = false;\nvar fireCooldown = false;\nvar house;\nvar TILE_SIZE = 50;\nvar xTiles = Math.floor(world_bound_width / TILE_SIZE);\nvar yTiles = Math.floor(world_bound_height / TILE_SIZE);\nvar tiles = [];\nfor (var i = 0; i < xTiles; i++) {\n    var row = [];\n    for (var j = 0; j < yTiles; j++) {\n        row.push(new Set());\n    }\n    tiles.push(row);\n}\nfunction getTile(x, y) {\n    return [Math.floor(x / 50), Math.floor(y / 50)];\n}\nfunction clearTiles() {\n    for (var i = 0; i < tiles.length; i++) {\n        for (var j = 0; j < tiles[0].length; j++) {\n            tiles[i][j].clear();\n        }\n    }\n}\nfunction igniteCompound(game, curr, destroyFire) {\n    if (destroyFire) {\n        fire.destroy();\n    }\n    if (curr.onFire) {\n        return;\n    }\n    curr.onFire = true;\n    curr.crates.forEach(function (e) {\n        igniteCrate(game, e);\n    });\n    game.time.delayedCall(1000, function () {\n        curr.crates.forEach(function (e) {\n            e.destroy();\n        });\n    });\n}\nfunction igniteCrate(game, currCrate) {\n    if (currCrate.onFire) {\n        return;\n    }\n    currCrate.onFire = true;\n    currCrate.fireSprite = game.add.sprite(currCrate.sprite.x, currCrate.sprite.y - 10, 'squareFire');\n    currCrate.fireSprite.anims.play('squareFire', false);\n    currCrate.fireSprite.alpha = 0.7;\n    game.time.delayedCall(1000, function () {\n        if (currCrate.fireSprite.active) {\n            currCrate.fireSprite.destroy();\n        }\n        var fireDisappear = game.add.sprite(currCrate.sprite.x, currCrate.sprite.y - 10, 'fireDisappear');\n        fireDisappear.anims.play('fireDisappear', false, true);\n        fireDisappear.once('animationcomplete', function () {\n            fireDisappear.destroy();\n        });\n        var pos = getTile(currCrate.sprite.x, currCrate.sprite.y);\n        var x = pos[0];\n        var y = pos[1];\n        var candidates = [\n            [x - 1, y],\n            [x + 1, y],\n            [x, y + 1],\n            [x, y - 1],\n        ];\n        for (var i = 0; i < candidates.length; i++) {\n            var x_1 = candidates[i][0];\n            var y_1 = candidates[i][1];\n            if (x_1 >= 0 && x_1 < xTiles && y_1 >= 0 && y_1 < yTiles) {\n                tiles[x_1][y_1].forEach(function (e) {\n                    igniteCompound(game, e.owner, false);\n                });\n            }\n        }\n    });\n}\nfunction isMonster(s) {\n    return s.includes('spider') || s.includes('lizard');\n}\nvar GameScene = /** @class */ (function (_super) {\n    __extends(GameScene, _super);\n    function GameScene() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        _this.lizards = {};\n        _this.spiders = {};\n        _this.lavas = {};\n        _this.crates = {};\n        // public compounds = {};\n        _this.level = 'level' + localStorage.getItem('level');\n        return _this;\n    }\n    GameScene.prototype.jointBlocks = function (blocks, data) {\n        var _this = this;\n        var track = new Set();\n        var items = [];\n        data.steel.forEach(function (e) { return items.push(e); });\n        data.crate.forEach(function (e) { return items.push(e); });\n        items.forEach(function (e) {\n            track.add(blocks[e.x + ',' + e.y]);\n            var sprite = blocks[e.x + ',' + e.y].sprite;\n            var id = clump_1.indexes[e.frame];\n            // odd numbers are sides\n            var sides = id.split('');\n            var up = blocks[e.x + ',' + (e.y - 50)];\n            var right = blocks[e.x + 50 + ',' + e.y];\n            var down = blocks[e.x + ',' + (e.y + 50)];\n            var left = blocks[e.x - 50 + ',' + e.y];\n            if (sides[1] == 1 && !track.has(up)) {\n                var up_1 = blocks[e.x + ',' + (e.y - 50)];\n                _this.matter.add.joint(sprite.body, up_1.sprite.body, 10, 1, {\n                    pointA: { x: 0, y: -25 },\n                    pointB: { x: 0, y: 25 },\n                    angularStiffness: 1,\n                });\n                track.add(up_1);\n            }\n            if (sides[3] == 1 && !track.has(right)) {\n                _this.matter.add.joint(sprite.body, right.sprite.body, 0, 1, {\n                    pointA: { x: 25, y: 0 },\n                    pointB: { x: -25, y: 0 },\n                    angularStiffness: 1,\n                });\n                track.add(right);\n            }\n            if (sides[5] == 1 && !track.has(down)) {\n                _this.matter.add.joint(sprite.body, down.sprite.body, 0, 1, {\n                    pointA: { x: 0, y: 25 },\n                    pointB: { x: 0, y: -25 },\n                    angularStiffness: 1,\n                });\n                track.add(down);\n            }\n            if (sides[7] == 1 && !track.has(left)) {\n                _this.matter.add.joint(sprite.body, left.sprite.body, 0, 1, {\n                    pointA: { x: -25, y: 0 },\n                    pointB: { x: 25, y: 0 },\n                    angularStiffness: 1,\n                });\n                track.add(left);\n            }\n        });\n    };\n    GameScene.prototype.preload = function () {\n        this.load.image('background', 'assets/backgrounds/TutorialBackground1.png');\n        this.load.image('ground', 'assets/squares/platform.png');\n        this.load.image('house', 'assets/squares/house.png');\n        this.load.spritesheet('crate', 'assets/clumpables/crateTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('dirt', 'assets/clumpables/dirtTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('steel', 'assets/clumpables/steelTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('lava', 'assets/clumpables/lavaTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 38, frameHeight: 19 });\n        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });\n        this.load.spritesheet('lizard', 'assets/monsters/lizard.png', { frameWidth: 70, frameHeight: 50 });\n        this.load.spritesheet('spider', 'assets/monsters/spider.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('spiderArmored', 'assets/monsters/spiderArmored.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('squareFire', 'assets/squares/squareFire.png', { frameWidth: 79, frameHeight: 80 });\n        this.load.spritesheet('fireDisappear', 'assets/squares/fireDisappear.png', { frameWidth: 84, frameHeight: 133 });\n        this.load.json('level' + localStorage.getItem('level'), 'assets/levels/' + localStorage.getItem('level') + '.json');\n    };\n    GameScene.prototype.create = function () {\n        var _this = this;\n        var background = this.add.image(world_bound_width / 2, world_bound_height / 2, 'background');\n        background.setScale(world_bound_width / background.width);\n        this.matter.world.setBounds(0, 0, world_bound_width, world_bound_height, 32, true, true, false, true);\n        this.cameras.main.setBounds(0, 0, world_bound_width, world_bound_height).setName('main');\n        var data = localStorage.getItem('useleveleditor') == 'true'\n            ? JSON.parse(localStorage.getItem('leveleditorlevel'))\n            : this.cache.json.get('level' + localStorage.getItem('level'));\n        // const data = this.cache.json.get('level');\n        // const jsonData = JSON.parse();\n        player = new player_1.default(data.player[0].x, data.player[0].y, this);\n        this.cameras.main.startFollow(player.sprite, false, 0.2, 0.2);\n        // make lizards\n        this.lizards = {};\n        for (var i = 0; i < data.lizard.length; i++) {\n            var e = data.lizard[i];\n            this.lizards['lizard' + i] = new lizard_1.default(e.x, e.y, this, i);\n        }\n        // make spiders\n        this.spiders = {};\n        for (var i = 0; i < data.spider.length; i++) {\n            var e = data.spider[i];\n            this.spiders['spider' + i] = new spider_1.default(e.x, e.y, this, i, false);\n        }\n        data.dirt.forEach(function (e) {\n            new dirt_1.default(e.x, e.y, _this, e.frame);\n        });\n        var blocks = {};\n        data.steel.forEach(function (e) {\n            blocks[e.x + ',' + e.y] = new steel_1.default(e.x, e.y, _this, e.frame);\n        });\n        var crates = new Set();\n        var counter = 0;\n        data.crate.forEach(function (e) {\n            blocks[e.x + ',' + e.y] = new crate_1.default(e.x, e.y, counter, _this, e.frame);\n            crates.add(blocks[e.x + ',' + e.y]);\n            _this.crates['crate' + counter] = blocks[e.x + ',' + e.y];\n            counter += 1;\n        });\n        // compound the crates\n        var trackCrates = new Set();\n        data.crate.forEach(function (e) {\n            var name = e.x + ',' + e.y;\n            if (!trackCrates.has(name)) {\n                var curr = [name];\n                var next_1 = [];\n                var toCompound_1 = new Set();\n                while (curr.length != 0) {\n                    curr.forEach(function (i) {\n                        var id = clump_1.indexes[parseInt(blocks[i].sprite.frame.name)];\n                        // odd numbers are sides\n                        var sides = id.split('');\n                        trackCrates.add(i);\n                        toCompound_1.add(blocks[i]);\n                        var x = blocks[i].sprite.x;\n                        var y = blocks[i].sprite.y;\n                        var up = x + ',' + (y - 50);\n                        var right = x + 50 + ',' + y;\n                        var down = x + ',' + (y + 50);\n                        var left = x - 50 + ',' + y;\n                        function compoundCrates(tile) {\n                            next_1.push(tile);\n                            trackCrates.add(tile);\n                            toCompound_1.add(blocks[tile]);\n                        }\n                        if (sides[1] == 1 && !trackCrates.has(up)) {\n                            compoundCrates(up);\n                        }\n                        if (sides[3] == 1 && !trackCrates.has(right)) {\n                            compoundCrates(right);\n                        }\n                        if (sides[5] == 1 && !trackCrates.has(down)) {\n                            compoundCrates(down);\n                        }\n                        if (sides[7] == 1 && !trackCrates.has(left)) {\n                            compoundCrates(left);\n                        }\n                    });\n                    curr = next_1;\n                    next_1 = [];\n                }\n                new compoundCrate_1.default(_this, toCompound_1, 'compound');\n            }\n        });\n        // const compoundTest = new CompoundCrate(this, crates, 'test1');\n        this.jointBlocks(blocks, data);\n        for (var i = 0; i < data.lava.length; i++) {\n            var e = data.lava[i];\n            this.lavas['lava' + i] = new lava_1.default(e.x, e.y, this, e.frame, i);\n        }\n        this.anims.create({\n            key: 'squareFire',\n            frames: this.anims.generateFrameNumbers('squareFire', { start: 0, end: 5 }),\n            frameRate: 30,\n            repeat: -1,\n        });\n        this.anims.create({\n            key: 'fireball',\n            frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 1 }),\n            frameRate: 10,\n            repeat: -1,\n        });\n        this.anims.create({\n            key: 'fireDisappear',\n            frames: this.anims.generateFrameNumbers('fireDisappear', { start: 0, end: 39 }),\n            frameRate: 60,\n        });\n        cursors = this.input.keyboard.createCursorKeys();\n        wasd = this.input.keyboard.addKeys('W,S,A,D');\n        var game = this;\n        this.matter.world.on('collisionstart', function (event) {\n            //  Loop through all of the collision pairs\n            Object.keys(crates).forEach(function (key) {\n                var crate = crates[key];\n                crate.neighbors.clear();\n            });\n            var pairs = event.pairs;\n            var _loop_1 = function (i) {\n                var bodyA = pairs[i].bodyA;\n                var bodyB = pairs[i].bodyB;\n                var a = bodyA.label;\n                var b = bodyB.label;\n                if ((b.includes('lizard') && a === 'fire') || (a.includes('lizard') && b === 'fire')) {\n                    fire.destroy();\n                    fireActive = false;\n                    var lizard = a.includes('lizard') ? a : b;\n                    game.lizards[lizard].ignite(game);\n                }\n                if ((b.includes('spider') && a === 'fire') || (a.includes('spider') && b === 'fire')) {\n                    fire.destroy();\n                    fireActive = false;\n                    var spider = b.includes('spider') ? b : a;\n                    game.spiders[spider].hitFire();\n                }\n                if ((b.includes('lizard') && a.includes('lava')) || (a.includes('lizard') && b.includes('lava'))) {\n                    var lava = a.includes('lava') ? a : b;\n                    var lizard = a.includes('lava') ? b : a;\n                    if (game.lizards[lizard].onFire) {\n                        game.lavas[lava].ignite(game);\n                    }\n                }\n                if (b.includes('lizard') && a.includes('crate') && game.lizards[0].onFire) {\n                    igniteCompound(game, game.crates[a].owner, false);\n                }\n                if (a.includes('lizard') && b.includes('crate') && game.lizards[0].onFire) {\n                    igniteCompound(game, game.crates[b].owner, false);\n                }\n                //  sensor collisions\n                if (pairs[i].isSensor) {\n                    var playerBody = void 0;\n                    var otherBody = void 0;\n                    if (bodyA.isSensor) {\n                        playerBody = bodyA;\n                        otherBody = bodyB;\n                    }\n                    else if (bodyB.isSensor) {\n                        playerBody = bodyB;\n                        otherBody = bodyB;\n                    }\n                    if (playerBody.label === 'groundSensor' && otherBody.label != 'fire') {\n                        player.touchingGround = true;\n                    }\n                }\n                // fire collision\n                if (a === 'fire' && b.includes('crate')) {\n                    igniteCompound(game, game.crates[b].owner, true);\n                }\n                if (b === 'fire' && a.includes('crate')) {\n                    igniteCompound(game, game.crates[a].owner, true);\n                }\n                if ((b.includes('spider') && a.includes('lizard')) || a.includes( true && b.includes('lizard)'))) {\n                    var spider = b.includes('spider') ? b : a;\n                    var lizard = b.includes('lizard') ? b : a;\n                    if (game.lizards[lizard].onFire && game.lizards[lizard].sprite.active) {\n                        game.spiders[spider].hitLizard();\n                    }\n                }\n                if ((bodyA.isSensor && isMonster(a)) || (bodyB.isSensor && isMonster(b))) {\n                    var monsterBody = bodyA.isSensor ? bodyA : bodyB;\n                    var otherBody_1 = bodyA.isSensor ? bodyB : bodyA;\n                    var turnFlag_1 = true;\n                    monsterCollisionLabels.forEach(function (label) {\n                        if (otherBody_1.label.includes(label)) {\n                            turnFlag_1 = false;\n                        }\n                    });\n                    if (turnFlag_1) {\n                        if (monsterBody.label.includes('lizard')) {\n                            game.lizards[monsterBody.label].flip();\n                        }\n                        else {\n                            game.spiders[monsterBody.label].flip();\n                        }\n                    }\n                }\n            };\n            for (var i = 0; i < pairs.length; i++) {\n                _loop_1(i);\n            }\n        });\n        new menu_button_1.MenuButton(this, 10, 10, 'Back to Menu', function () {\n            _this.scene.start('MainMenu');\n        });\n    };\n    GameScene.prototype.update = function () {\n        var _this = this;\n        clearTiles();\n        // add to tiles\n        Object.keys(this.crates).forEach(function (key) {\n            var curr = _this.crates[key];\n            if (curr.sprite.active) {\n                var pos = getTile(curr.sprite.x, curr.sprite.y);\n                tiles[pos[0]][pos[1]].add(curr);\n            }\n        });\n        for (var _i = 0, _a = Object.entries(this.lizards); _i < _a.length; _i++) {\n            var _b = _a[_i], key = _b[0], lizard = _b[1];\n            lizard.move();\n            lizard.syncSensor(); //weird bug not syncing\n            // console.log(lizard);\n            if (lizard.sprite.active) {\n                // lizard.collisionSensor.position.x = lizard.sprite.x;\n                // lizard.collisionSensor.position.y = lizard.sprite.y;\n            }\n            lizard.syncFire();\n        }\n        for (var _c = 0, _d = Object.entries(this.spiders); _c < _d.length; _c++) {\n            var _e = _d[_c], key = _e[0], spider = _e[1];\n            spider.syncSensor(); //weird bug not syncing\n            if (spider.sprite.active) {\n                // spider.collisionSensor.position.x = spider.sprite.x;\n                // spider.collisionSensor.position.y = spider.sprite.y;\n                spider.collisionSensor.position.x = 100;\n                spider.collisionSensor.position.y = 100;\n            }\n            spider.move();\n        }\n        if (wasd.A.isDown) {\n            player.moveLeft();\n        }\n        else if (wasd.D.isDown) {\n            player.moveRight();\n        }\n        else {\n            player.turn();\n        }\n        if (wasd.W.isDown && player.touchingGround) {\n            player.jump();\n        }\n        if ((cursors.right.isDown || cursors.down.isDown || cursors.up.isDown || cursors.left.isDown) &&\n            !fireActive &&\n            !fireCooldown) {\n            fireCooldown = true;\n            fire = this.matter.add.sprite(player.getX(), player.getY(), 'fireball', null, {\n                isSensor: true,\n                label: 'fire',\n            });\n            fire.setCollisionCategory(0x0100);\n            if (cursors.left.isDown) {\n                fire.setRotation(Math.PI);\n            }\n            if (cursors.down.isDown) {\n                fire.setRotation(Math.PI / 2);\n            }\n            if (cursors.up.isDown) {\n                fire.setRotation((3 * Math.PI) / 2);\n            }\n            fire.anims.play('fireball', true);\n            fire.setIgnoreGravity(true);\n            var xDir = cursors.right.isDown ? 1 : -1;\n            var xVel = cursors.right.isDown || cursors.left.isDown ? 10 : 0;\n            fire.setVelocityX(xVel * xDir);\n            var yDir = cursors.down.isDown ? 1 : -1;\n            var yVel = cursors.down.isDown || cursors.up.isDown ? 10 : 0;\n            fire.setVelocityY(yVel * yDir);\n            fireActive = true;\n            setTimeout(function () {\n                if (fireActive) {\n                    fireActive = false;\n                    fire.destroy();\n                }\n                fireCooldown = false;\n            }, 500);\n        }\n        Object.keys(this.crates).forEach(function (key) {\n            var crate = _this.crates[key];\n            if (crate.fireSprite != null) {\n                crate.syncFire();\n            }\n        });\n    };\n    return GameScene;\n}(Phaser.Scene));\nexports.GameScene = GameScene;\n\n\n//# sourceURL=webpack:///./src/scenes/game-scene.ts?");

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