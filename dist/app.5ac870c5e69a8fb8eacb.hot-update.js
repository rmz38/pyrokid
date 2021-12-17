webpackHotUpdate("app",{

/***/ "./src/helpers/collision-controller.ts":
/*!*********************************************!*\
  !*** ./src/helpers/collision-controller.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.createCollisions = void 0;\nvar crate_1 = __webpack_require__(/*! ../objects/crate */ \"./src/objects/crate.ts\");\nvar monsterCollisionLabels = new Set(['lizard', 'spider', 'fire']);\nfunction isMonster(s) {\n    return s.includes('spider') || s.includes('lizard');\n}\nfunction isTerrain(s) {\n    return s.includes('crate') || s.includes('steel') || s.includes('lava') || s.includes('dirt');\n}\nfunction getTile(x, y) {\n    return [Math.floor(x / 50), Math.floor(y / 50)];\n}\nfunction igniteCompound(game, curr, destroyFire) {\n    if (destroyFire) {\n        game.fire.destroy();\n    }\n    if (curr.onFire) {\n        return;\n    }\n    curr.onFire = true;\n    curr.crates.forEach(function (e) {\n        igniteCrate(game, e);\n    });\n    game.time.delayedCall(1000, function () {\n        curr.crates.forEach(function (e) {\n            e.destroy(game);\n        });\n    });\n}\n// function igniteLava(game, currLava: Lava) {\n// }\n//TODO: MOVE TO CRATE CLASS OR UTILS\nfunction igniteCrate(game, currCrate) {\n    if (currCrate.onFire) {\n        return;\n    }\n    currCrate.onFire = true;\n    currCrate.fireSprite = game.add.sprite(currCrate.sprite.x, currCrate.sprite.y - 10, 'squareFire');\n    currCrate.fireSprite.anims.play('squareFire', false);\n    currCrate.fireSprite.alpha = 0.7;\n    game.time.delayedCall(1000, function () {\n        if (currCrate.fireSprite.active) {\n            currCrate.fireSprite.destroy();\n        }\n        var fireDisappear = game.add.sprite(currCrate.sprite.x, currCrate.sprite.y - 10, 'fireDisappear');\n        fireDisappear.anims.play('fireDisappear', false, true);\n        fireDisappear.once('animationcomplete', function () {\n            fireDisappear.destroy();\n        });\n        var pos = getTile(currCrate.sprite.x, currCrate.sprite.y);\n        var x = pos[0];\n        var y = pos[1];\n        var candidates = [\n            [x - 1, y],\n            [x + 1, y],\n            [x, y + 1],\n            [x, y - 1],\n        ];\n        for (var i = 0; i < candidates.length; i++) {\n            var x_1 = candidates[i][0];\n            var y_1 = candidates[i][1];\n            if (x_1 >= 0 && x_1 < game.xTiles && y_1 >= 0 && y_1 < game.yTiles) {\n                game.tiles[x_1][y_1].forEach(function (e) {\n                    if (e instanceof crate_1.default) {\n                        igniteCompound(game, e.owner, false);\n                    }\n                    else {\n                        e.ignite(game, game.tiles, game.xTiles, game.yTiles);\n                    }\n                });\n            }\n        }\n    });\n}\nvar createCollisions = function (game) {\n    game.matter.world.on('collisionstart', function (event) {\n        var pairs = event.pairs;\n        var _loop_1 = function (i) {\n            var bodyA = pairs[i].bodyA;\n            var bodyB = pairs[i].bodyB;\n            var a = bodyA.label;\n            var b = bodyB.label;\n            console.log(a);\n            console.log(b);\n            if ((b.includes('lizard') && a === 'fire') || (a.includes('lizard') && b === 'fire')) {\n                game.fire.destroy();\n                game.fireActive = false;\n                var lizard = a.includes('lizard') ? a : b;\n                game.lizards[lizard].ignite(game);\n            }\n            if ((a == 'exit' && b == 'player') || (b == 'exit' && a == 'player')) {\n                if (localStorage.getItem('useleveleditor') == 'false') {\n                    var currLevel = parseInt(localStorage.getItem('level'));\n                    var nextLevel = currLevel + 1;\n                    localStorage.setItem('level', nextLevel.toString());\n                }\n                game.scene.restart();\n            }\n            if ((a == 'fire' && b.includes('bomb')) || (b == 'fire' && a.includes('bomb')))\n                if ((a.includes('lizard') && b == 'player') || (b.includes('lizard') && a == 'player')) {\n                    game.scene.restart();\n                }\n            if ((a.includes('spider') && b == 'player') || (b.includes('spider') && a == 'player')) {\n                game.scene.restart();\n            }\n            if ((a.includes('lava') && b == 'player') || (b.includes('lava') && a == 'player')) {\n                var lava = a.includes('lava') ? a : b;\n                if (game.lavas[lava].onFire) {\n                    game.scene.restart();\n                }\n            }\n            if ((a.includes('crate') && b == 'player') || (b.includes('crate') && a == 'player')) {\n                var crate = a.includes('crate') ? a : b;\n                if (game.crates[crate].onFire) {\n                    game.scene.restart();\n                }\n            }\n            if (a == 'playerTop' || b == 'playerTop') {\n                var otherBody = a !== 'playerTop' ? bodyA : bodyB;\n                if (otherBody.velocity.y > 0) {\n                    game.scene.restart();\n                }\n            }\n            if ((b.includes('spider') && a === 'fire') || (a.includes('spider') && b === 'fire')) {\n                game.fire.destroy();\n                game.fireActive = false;\n                var spider = b.includes('spider') ? b : a;\n                game.spiders[spider].hitFire();\n            }\n            if ((b.includes('lizard') && a.includes('lava')) || (a.includes('lizard') && b.includes('lava'))) {\n                var lava = a.includes('lava') ? a : b;\n                var lizard = a.includes('lava') ? b : a;\n                if (game.lizards[lizard].onFire) {\n                    game.lavas[lava].ignite(game, game.tiles, game.xTiles, game.yTiles);\n                }\n                if (game.lavas[lava].onFire) {\n                    game.lizards[lizard].ignite(game);\n                }\n            }\n            if ((a.includes('lizard') && b.includes('crate')) || (b.includes('lizard') && a.includes('crate'))) {\n                var crate = a.includes('crate') ? a : b;\n                var lizard = a.includes('lizard') ? a : b;\n                if (game.lizards[lizard].onFire) {\n                    igniteCompound(game, game.crates[crate].owner, false);\n                }\n            }\n            //  sensor collisions\n            if (pairs[i].isSensor) {\n                var playerBody = void 0;\n                var otherBody = void 0;\n                if (bodyA.isSensor) {\n                    playerBody = bodyA;\n                    otherBody = bodyB;\n                }\n                else if (bodyB.isSensor) {\n                    playerBody = bodyB;\n                    otherBody = bodyB;\n                }\n                if (playerBody.label === 'groundSensor' && otherBody.label != 'fire') {\n                    game.player.touchingGround = true;\n                }\n            }\n            // fire collision\n            if (a === 'fire' && b.includes('crate')) {\n                igniteCompound(game, game.crates[b].owner, true);\n            }\n            if (b === 'fire' && a.includes('crate')) {\n                igniteCompound(game, game.crates[a].owner, true);\n            }\n            // update above section to comply with format\n            if ((a === 'fire' && b.includes('lava')) || (b === 'fire' && a.includes('lava'))) {\n                var lava = a.includes('lava') ? a : b;\n                game.lavas[lava].ignite(game, game.tiles, game.xTiles, game.yTiles);\n                game.fire.destroy();\n            }\n            if ((b.includes('spider') && a.includes('lizard')) || a.includes( true && b.includes('lizard)'))) {\n                var spider = b.includes('spider') ? b : a;\n                var lizard = b.includes('lizard') ? b : a;\n                if (game.lizards[lizard].onFire && game.lizards[lizard].sprite.active) {\n                    game.spiders[spider].hitLizard();\n                }\n            }\n            if ((isTerrain(a) && b.includes('lizTop')) || (isTerrain(b) && a.includes('lizTop'))) {\n                var lizLabel = a.includes('lizTop') ? a : b;\n                var lizId = lizLabel.substring(lizLabel.indexOf(',') + 1);\n                game.lizards['lizard' + lizId].destroy();\n            }\n            if ((isTerrain(a) && b.includes('spiTop')) || (isTerrain(b) && a.includes('spiTop'))) {\n                var spiLabel = a.includes('spiTop') ? a : b;\n                var spiId = spiLabel.substring(spiLabel.indexOf(',') + 1);\n                game.spiders['spider' + spiId].destroy();\n            }\n            if ((bodyA.isSensor && isMonster(a)) || (bodyB.isSensor && isMonster(b))) {\n                var monsterBody = bodyA.isSensor ? bodyA : bodyB;\n                var otherBody_1 = bodyA.isSensor ? bodyB : bodyA;\n                var turnFlag_1 = true;\n                monsterCollisionLabels.forEach(function (label) {\n                    if (otherBody_1.label.includes(label)) {\n                        turnFlag_1 = false;\n                    }\n                });\n                if (turnFlag_1) {\n                    if (monsterBody.label.includes('lizard')) {\n                        game.lizards[monsterBody.label].flip();\n                    }\n                    else {\n                        game.spiders[monsterBody.label].flip();\n                    }\n                }\n            }\n        };\n        for (var i = 0; i < pairs.length; i++) {\n            _loop_1(i);\n        }\n    });\n};\nexports.createCollisions = createCollisions;\n\n\n//# sourceURL=webpack:///./src/helpers/collision-controller.ts?");

/***/ }),

/***/ "./src/scenes/game-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/game-scene.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.GameScene = void 0;\nvar player_1 = __webpack_require__(/*! ../objects/player */ \"./src/objects/player.ts\");\nvar crate_1 = __webpack_require__(/*! ../objects/crate */ \"./src/objects/crate.ts\");\nvar compoundCrate_1 = __webpack_require__(/*! ../objects/compoundCrate */ \"./src/objects/compoundCrate.ts\");\nvar lizard_1 = __webpack_require__(/*! ../objects/lizard */ \"./src/objects/lizard.ts\");\nvar spider_1 = __webpack_require__(/*! ../objects/spider */ \"./src/objects/spider.ts\");\nvar dirt_1 = __webpack_require__(/*! ../objects/dirt */ \"./src/objects/dirt.ts\");\nvar steel_1 = __webpack_require__(/*! ../objects/steel */ \"./src/objects/steel.ts\");\nvar lava_1 = __webpack_require__(/*! ../objects/lava */ \"./src/objects/lava.ts\");\nvar menu_button_1 = __webpack_require__(/*! ../ui/menu-button */ \"./src/ui/menu-button.ts\");\nvar clump_1 = __webpack_require__(/*! ../helpers/clump */ \"./src/helpers/clump.ts\");\nvar exit_1 = __webpack_require__(/*! ../objects/exit */ \"./src/objects/exit.ts\");\nvar init_1 = __webpack_require__(/*! ../helpers/init */ \"./src/helpers/init.ts\");\nvar collision_controller_1 = __webpack_require__(/*! ../helpers/collision-controller */ \"./src/helpers/collision-controller.ts\");\nvar bomb_1 = __webpack_require__(/*! ../objects/bomb */ \"./src/objects/bomb.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'Game',\n};\nvar cursors;\nvar wasd;\nvar world_bound_width = 1200;\nvar world_bound_height = 600;\nfunction getTile(x, y) {\n    return [Math.floor(x / 50), Math.floor(y / 50)];\n}\nfunction clearTiles(game) {\n    for (var i = 0; i < game.tiles.length; i++) {\n        for (var j = 0; j < game.tiles[0].length; j++) {\n            game.tiles[i][j].clear();\n        }\n    }\n}\nvar GameScene = /** @class */ (function (_super) {\n    __extends(GameScene, _super);\n    function GameScene() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        _this.lizards = {};\n        _this.spiders = {};\n        _this.lavas = {};\n        _this.crates = {};\n        _this.bombs = {};\n        _this.fireActive = false;\n        _this.fireCooldown = false;\n        _this.tiles = [];\n        _this.blocks = {};\n        _this.TILE_SIZE = 50;\n        _this.xTiles = Math.floor(world_bound_width / _this.TILE_SIZE);\n        _this.yTiles = Math.floor(world_bound_height / _this.TILE_SIZE);\n        // public compounds = {};\n        _this.level = 'level' + localStorage.getItem('level');\n        return _this;\n    }\n    GameScene.prototype.create = function () {\n        var _this = this;\n        var background = this.add.image(world_bound_width / 2, world_bound_height / 2, 'background');\n        background.setScale(world_bound_width / background.width);\n        background.setDepth(-10);\n        this.matter.world.setBounds(0, 0, world_bound_width, world_bound_height, 32, true, true, false, true);\n        this.cameras.main.setBounds(0, 0, world_bound_width, world_bound_height).setName('main');\n        var data = localStorage.getItem('useleveleditor') == 'true'\n            ? JSON.parse(localStorage.getItem('leveleditorlevel'))\n            : this.cache.json.get('level' + localStorage.getItem('level'));\n        this.xTiles = Math.floor(world_bound_width / this.TILE_SIZE);\n        this.yTiles = Math.floor(world_bound_height / this.TILE_SIZE);\n        this.fire = null;\n        this.fireActive = false;\n        this.fireCooldown = false;\n        for (var i = 0; i < this.xTiles; i++) {\n            var row = [];\n            for (var j = 0; j < this.yTiles; j++) {\n                row.push(new Set());\n            }\n            this.tiles.push(row);\n        }\n        this.player = new player_1.default(data.player[0].x, data.player[0].y, this);\n        this.cameras.main.startFollow(this.player.sprite, false, 0.2, 0.2);\n        this.cameras.main.fadeIn(100, 0, 0, 0);\n        // make lizards\n        this.lizards = {};\n        for (var i = 0; i < data.lizard.length; i++) {\n            var e = data.lizard[i];\n            this.lizards['lizard' + i] = new lizard_1.default(e.x, e.y, this, i);\n        }\n        // make spiders\n        this.spiders = {};\n        for (var i = 0; i < data.spider.length; i++) {\n            var e = data.spider[i];\n            this.spiders['spider' + i] = new spider_1.default(e.x, e.y, this, i, false);\n        }\n        // make dirts\n        data.dirt.forEach(function (e) {\n            new dirt_1.default(e.x, e.y, _this, e.frame);\n        });\n        this.blocks = {};\n        // make steels\n        data.steel.forEach(function (e) {\n            _this.blocks[e.x + ',' + e.y] = new steel_1.default(e.x, e.y, _this, e.frame);\n        });\n        //make bombs\n        for (var i = 0; i < data.bomb.length; i++) {\n            var e = data.bomb[i];\n            this.bombs['bomb' + i] = new bomb_1.default(e.x, e.y, i, this);\n        }\n        var crates = new Set();\n        var counter = 0;\n        data.crate.forEach(function (e) {\n            _this.blocks[e.x + ',' + e.y] = new crate_1.default(e.x, e.y, counter, _this, e.frame);\n            crates.add(_this.blocks[e.x + ',' + e.y]);\n            _this.crates['crate' + counter] = _this.blocks[e.x + ',' + e.y];\n            counter += 1;\n        });\n        // new Connector(this.crates['crate' + 0], this.crates['crate' + 1], this);\n        data.exit.forEach(function (e) {\n            new exit_1.default(e.x, e.y, _this);\n        });\n        // compound the crates\n        var trackCrates = new Set();\n        data.crate.forEach(function (e) {\n            var name = e.x + ',' + e.y;\n            if (!trackCrates.has(name)) {\n                var curr = [name];\n                var next_1 = [];\n                var toCompound_1 = new Set();\n                while (curr.length != 0) {\n                    curr.forEach(function (i) {\n                        var id = clump_1.indexes[parseInt(_this.blocks[i].sprite.frame.name)];\n                        // odd numbers are sides\n                        var sides = id.split('');\n                        trackCrates.add(i);\n                        toCompound_1.add(_this.blocks[i]);\n                        var x = _this.blocks[i].sprite.x;\n                        var y = _this.blocks[i].sprite.y;\n                        var up = x + ',' + (y - 50);\n                        var right = x + 50 + ',' + y;\n                        var down = x + ',' + (y + 50);\n                        var left = x - 50 + ',' + y;\n                        function compoundCrates(tile, game) {\n                            next_1.push(tile);\n                            trackCrates.add(tile);\n                            toCompound_1.add(game.blocks[tile]);\n                        }\n                        if (sides[1] == 1 && !trackCrates.has(up)) {\n                            compoundCrates(up, _this);\n                        }\n                        if (sides[3] == 1 && !trackCrates.has(right)) {\n                            compoundCrates(right, _this);\n                        }\n                        if (sides[5] == 1 && !trackCrates.has(down)) {\n                            compoundCrates(down, _this);\n                        }\n                        if (sides[7] == 1 && !trackCrates.has(left)) {\n                            compoundCrates(left, _this);\n                        }\n                    });\n                    curr = next_1;\n                    next_1 = [];\n                }\n                new compoundCrate_1.default(_this, toCompound_1, 'compound');\n            }\n        });\n        // const compoundTest = new CompoundCrate(this, crates, 'test1');\n        for (var i = 0; i < data.lava.length; i++) {\n            var e = data.lava[i];\n            var temp = new lava_1.default(e.x, e.y, this, e.frame, i);\n            this.lavas['lava' + i] = temp;\n            this.blocks[e.x + ',' + e.y] = temp;\n        }\n        init_1.jointBlocks(this, this.blocks, data);\n        init_1.initAnims(this);\n        collision_controller_1.createCollisions(this);\n        init_1.connectorBlocks(this, this.blocks, data);\n        cursors = this.input.keyboard.createCursorKeys();\n        wasd = this.input.keyboard.addKeys('W,S,A,D');\n        new menu_button_1.MenuButton(this, 10, 10, 'Back to Menu', function () {\n            _this.scene.start('MainMenu');\n        });\n    };\n    GameScene.prototype.update = function () {\n        var _this = this;\n        // add crates to tiles\n        clearTiles(this);\n        Object.keys(this.crates).forEach(function (key) {\n            var curr = _this.crates[key];\n            if (curr.sprite.active) {\n                var pos = getTile(curr.sprite.x, curr.sprite.y);\n                _this.tiles[pos[0]][pos[1]].add(curr);\n            }\n        });\n        // add lavas to tiles\n        Object.keys(this.lavas).forEach(function (key) {\n            var curr = _this.lavas[key];\n            if (curr.sprite.active) {\n                var pos = getTile(curr.sprite.x, curr.sprite.y);\n                _this.tiles[pos[0]][pos[1]].add(curr);\n            }\n        });\n        for (var _i = 0, _a = Object.entries(this.lizards); _i < _a.length; _i++) {\n            var _b = _a[_i], key = _b[0], lizard = _b[1];\n            lizard.update();\n        }\n        for (var _c = 0, _d = Object.entries(this.spiders); _c < _d.length; _c++) {\n            var _e = _d[_c], key = _e[0], spider = _e[1];\n            spider.update();\n        }\n        if (wasd.A.isDown) {\n            this.player.moveLeft();\n        }\n        else if (wasd.D.isDown) {\n            this.player.moveRight();\n        }\n        else {\n            this.player.turn();\n        }\n        if (wasd.W.isDown && this.player.touchingGround) {\n            this.player.jump();\n        }\n        //shooting fire and setting the direction\n        if ((cursors.right.isDown || cursors.down.isDown || cursors.up.isDown || cursors.left.isDown) &&\n            !this.fireActive &&\n            !this.fireCooldown) {\n            this.fireCooldown = true;\n            this.fire = this.matter.add.sprite(this.player.getX(), this.player.getY(), 'fireball', null, {\n                isSensor: true,\n                label: 'fire',\n            });\n            this.fire.setCollisionCategory(0x0100);\n            if (cursors.left.isDown) {\n                this.fire.setRotation(Math.PI);\n            }\n            if (cursors.down.isDown) {\n                this.fire.setRotation(Math.PI / 2);\n            }\n            if (cursors.up.isDown) {\n                this.fire.setRotation((3 * Math.PI) / 2);\n            }\n            this.fire.anims.play('fireball', true);\n            this.fire.setIgnoreGravity(true);\n            var xDir = cursors.right.isDown ? 1 : -1;\n            var xVel = cursors.right.isDown || cursors.left.isDown ? 10 : 0;\n            this.fire.setVelocityX(xVel * xDir);\n            var yDir = cursors.down.isDown ? 1 : -1;\n            var yVel = cursors.down.isDown || cursors.up.isDown ? 10 : 0;\n            this.fire.setVelocityY(yVel * yDir);\n            this.fireActive = true;\n            setTimeout(function () {\n                if (_this.fireActive) {\n                    _this.fireActive = false;\n                    _this.fire.destroy();\n                }\n                _this.fireCooldown = false;\n            }, 500);\n        }\n        Object.keys(this.crates).forEach(function (key) {\n            var crate = _this.crates[key];\n            if (crate.fireSprite != null) {\n                crate.syncFire();\n            }\n        });\n    };\n    return GameScene;\n}(Phaser.Scene));\nexports.GameScene = GameScene;\n\n\n//# sourceURL=webpack:///./src/scenes/game-scene.ts?");

/***/ })

})