webpackHotUpdate("app",{

/***/ "./src/helpers/alignGrid.ts":
/*!**********************************!*\
  !*** ./src/helpers/alignGrid.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar clump_1 = __webpack_require__(/*! ./clump */ \"./src/helpers/clump.ts\");\nvar TILE_SIZE = 50;\nvar clumpables = new Set(['dirt', 'lava', 'crate', 'steel']);\nvar AlignGrid = /** @class */ (function () {\n    function AlignGrid(config) {\n        this.counter = 0;\n        this.clumps = new Map();\n        if (!config.scene) {\n            console.log('missing scene!');\n            return;\n        }\n        if (!config.rows) {\n            console.log('no rows given wee woo');\n        }\n        if (!config.cols) {\n            console.log('no columns given wee woo');\n        }\n        this.h = config.rows * TILE_SIZE;\n        this.w = config.cols * TILE_SIZE;\n        this.rows = config.rows;\n        this.cols = config.cols;\n        this.scene = config.scene;\n        this.grid = new Array(this.rows);\n        this.selected = 'lavaTile';\n        for (var i = 0; i < this.cols; i++) {\n            this.grid[i] = new Array(this.rows);\n        }\n        this.playerTile = null;\n    }\n    AlignGrid.prototype.show = function (a) {\n        if (a === void 0) { a = 0.7; }\n        this.graphics = this.scene.add.graphics();\n        this.graphics.lineStyle(1, 0xff0000, a);\n        for (var i = 0; i < this.w; i += TILE_SIZE) {\n            this.graphics.moveTo(i, 0);\n            this.graphics.lineTo(i, this.h);\n        }\n        for (var i = 0; i < this.h; i += TILE_SIZE) {\n            this.graphics.moveTo(0, i);\n            this.graphics.lineTo(this.w, i);\n        }\n        this.graphics.strokePath();\n    };\n    AlignGrid.prototype.placeAt = function (x1, y1, objName, game) {\n        //converted centered coordinates in pixels to place in grid square\n        var row = Math.floor(x1 / TILE_SIZE);\n        var col = Math.floor(y1 / TILE_SIZE);\n        var x2 = row * TILE_SIZE + TILE_SIZE / 2;\n        var y2 = col * TILE_SIZE + TILE_SIZE / 2;\n        if (objName == 'clear') {\n            if (this.grid[row][col]) {\n                this.grid[row][col].destroy();\n            }\n            this.grid[row][col] = null;\n            return;\n        }\n        var obj = game.add.image(x2, y2, objName);\n        obj.name = objName;\n        if (this.grid[row][col]) {\n            if (this.playerTile && this.playerTile[0] == row && this.playerTile[1] == col) {\n                this.playerTile = null;\n            }\n            this.grid[row][col].destroy();\n        }\n        if (objName == 'player') {\n            if (this.playerTile) {\n                this.grid[this.playerTile[0]][this.playerTile[1]].destroy();\n            }\n            this.playerTile = [row, col];\n        }\n        this.grid[row][col] = obj;\n        obj.x = x2;\n        obj.y = y2;\n    };\n    AlignGrid.prototype.getRowOrCol = function (pixel) {\n        return Math.floor(pixel / TILE_SIZE);\n    };\n    AlignGrid.prototype.getPixel = function (rowOrCol) {\n        return rowOrCol * TILE_SIZE + TILE_SIZE / 2;\n    };\n    AlignGrid.prototype.neighbors = function (i, j) {\n        return [\n            i - 1 + ',' + (j - 1),\n            i + ',' + (j - 1),\n            i + 1 + ',' + (j - 1),\n            i + 1 + ',' + j,\n            i + 1 + ',' + (j + 1),\n            i + ',' + (j + 1),\n            i - 1 + ',' + (j + 1),\n            i - 1 + ',' + j,\n        ];\n    };\n    AlignGrid.prototype.unpack = function (coord) {\n        var split = coord.indexOf(',');\n        var i = parseInt(coord.substring(0, split));\n        var j = parseInt(coord.substring(split + 1));\n        return [i, j];\n    };\n    /**\n     * start and end of rectangle drawn by mouse to clump selected tiles\n     * @param sx start x pixel coordinate\n     * @param sy start y pixel coordinate\n     * @param ex end x pixel coordinate\n     * @param ey end y pixel coordinate\n     */\n    AlignGrid.prototype.clump = function (sx, sy, ex, ey) {\n        var _this = this;\n        var curr = new Set();\n        var check = new Set();\n        var sr = this.getRowOrCol(sx);\n        var sc = this.getRowOrCol(sy);\n        var er = this.getRowOrCol(ex);\n        var ec = this.getRowOrCol(ey);\n        // const sr = 0;\n        // const sc = 0;\n        // const er = 10;\n        // const ec = 10;\n        for (var i = sr; i <= er; i++) {\n            for (var j = sc; j <= ec; j++) {\n                if (this.grid[i][j]) {\n                    curr.add(i + ',' + j);\n                    check.add(i + ',' + j);\n                    if (this.grid[i][j].frame != 0) {\n                        this.neighbors(i, j).forEach(function (e) {\n                            var nx = _this.unpack(e)[0];\n                            var ny = _this.unpack(e)[1];\n                            if (_this.grid[nx][ny]) {\n                                check.add(e);\n                            }\n                        });\n                    }\n                }\n            }\n        }\n        // figure out which tile texture to use based on spritesheet\n        // ensured that none are null in curr\n        curr.forEach(function (e) {\n            var i = _this.unpack(e)[0];\n            var j = _this.unpack(e)[1];\n            if (clumpables.has(_this.grid[i][j].name)) {\n                var candidates = _this.neighbors(i, j);\n                // all sides of the tile grabbed from the tilesheets\n                var id = [1, 1, 1, 1, 1, 1, 1, 1];\n                var pointer = 0;\n                for (var x = 0; x < candidates.length; x++) {\n                    var coord = candidates[x];\n                    var a = _this.unpack(coord)[0];\n                    var b = _this.unpack(coord)[1];\n                    if (!(check.has(coord) && _this.grid[a][b].name == _this.grid[i][j].name)) {\n                        if (x % 2 == 0) {\n                            id[pointer] = 0;\n                        }\n                        else {\n                            id[pointer] = 0;\n                            id[pointer + 1] = 0;\n                            // wrap around to 7\n                            if (pointer + 2 > 7) {\n                                id[0] = 0;\n                            }\n                            else {\n                                id[pointer + 2] = 0;\n                            }\n                        }\n                    }\n                    // console.log(pointer);\n                    if (x % 2 == 1) {\n                        pointer += 2;\n                    }\n                }\n                console.log(id.join(''));\n                _this.grid[i][j].setFrame(clump_1.tiles[id.join('')]);\n            }\n        });\n    };\n    return AlignGrid;\n}());\nexports.default = AlignGrid;\n\n\n//# sourceURL=webpack:///./src/helpers/alignGrid.ts?");

/***/ }),

/***/ "./src/helpers/clump.ts":
/*!******************************!*\
  !*** ./src/helpers/clump.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.tiles = void 0;\nexports.tiles = {\n    '00000000': 0,\n    '00010000': 1,\n    '00010001': 2,\n    '00000001': 3,\n    '00010100': 4,\n    '00000101': 5,\n    '01010100': 6,\n    '00010101': 7,\n    '01110101': 8,\n    '01011101': 9,\n    '11010111': 10,\n    '11110101': 11,\n    '00000100': 12,\n    '00011100': 13,\n    '00011111': 14,\n    '00000111': 15,\n    '01010000': 16,\n    '01000001': 17,\n    '01010001': 18,\n    '01000101': 19,\n    '11010101': 20,\n    '01010111': 21,\n    '01011111': 22,\n    '01111101': 23,\n    '01000100': 24,\n    '01111100': 25,\n    '11111111': 26,\n    '11000111': 27,\n    '01011100': 28,\n    '00010111': 29,\n    '01110100': 30,\n    '00011101': 31,\n    '11110111': 32,\n    '11111101': 33,\n    '01110111': 34,\n    '11011101': 35,\n    '01000000': 36,\n    '01110000': 37,\n    '11110001': 38,\n    '11000001': 39,\n    '01110001': 40,\n    '11000101': 41,\n    '11010001': 42,\n    '01000111': 43,\n    '11011111': 44,\n    '01111111': 45,\n    '01010101': 46,\n};\n\n\n//# sourceURL=webpack:///./src/helpers/clump.ts?");

/***/ }),

/***/ "./src/helpers/levelEditorButton.ts":
/*!******************************************!*\
  !*** ./src/helpers/levelEditorButton.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar LevelEditorButton = /** @class */ (function () {\n    function LevelEditorButton(x, y, text, color, select, game) {\n        var button = game.add.text(x, y, text, {\n            fill: color,\n            backgroundColor: '#777',\n            fontSize: 36,\n        });\n        button.setInteractive();\n        button.on('pointerover', function () {\n            game.onButton = true;\n        });\n        button.on('pointerdown', function () {\n            game.selected = select;\n        });\n        button.on('pointerout', function () {\n            game.onButton = false;\n        });\n        button.scrollFactorX = 0;\n        button.scrollFactorY = 0;\n        button.setDepth(1);\n        this.button = button;\n    }\n    return LevelEditorButton;\n}());\nexports.default = LevelEditorButton;\n\n\n//# sourceURL=webpack:///./src/helpers/levelEditorButton.ts?");

/***/ }),

/***/ "./src/scenes/index.ts":
/*!*****************************!*\
  !*** ./src/scenes/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar main_menu_scene_1 = __webpack_require__(/*! ./main-menu-scene */ \"./src/scenes/main-menu-scene.ts\");\nvar boot_scene_1 = __webpack_require__(/*! ./boot-scene */ \"./src/scenes/boot-scene.ts\");\nvar game_scene_1 = __webpack_require__(/*! ./game-scene */ \"./src/scenes/game-scene.ts\");\nvar level_editor_scene_1 = __webpack_require__(/*! ./level-editor-scene */ \"./src/scenes/level-editor-scene.ts\");\nexports.default = [boot_scene_1.BootScene, main_menu_scene_1.MainMenuScene, game_scene_1.GameScene, level_editor_scene_1.LevelEditor];\n\n\n//# sourceURL=webpack:///./src/scenes/index.ts?");

/***/ }),

/***/ "./src/scenes/level-editor-scene.ts":
/*!******************************************!*\
  !*** ./src/scenes/level-editor-scene.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.LevelEditor = void 0;\nvar alignGrid_1 = __webpack_require__(/*! ../helpers/alignGrid */ \"./src/helpers/alignGrid.ts\");\nvar levelEditorButton_1 = __webpack_require__(/*! ../helpers/levelEditorButton */ \"./src/helpers/levelEditorButton.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'LevelEditor',\n};\nvar W_WIDTH = 1200;\nvar W_HEIGHT = 600;\nvar cursors;\nvar controls;\nvar grid;\nvar pointer;\nvar aGrid;\nvar graphics;\n// let menuPositions = [];\n// let menuNames = []\n// for (let i = 0; i < 8; i++) {\n//   menuPositions.push(200 + i * 36);\n// }\nvar LevelEditor = /** @class */ (function (_super) {\n    __extends(LevelEditor, _super);\n    function LevelEditor() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        _this.selected = 'crate';\n        _this.onButton = false;\n        return _this;\n    }\n    LevelEditor.prototype.preload = function () {\n        this.load.image('background', 'assets/backgrounds/level-editor.png');\n        this.load.image('house', 'assets/squares/house.png');\n        this.load.spritesheet('crate', 'assets/clumpables/crateTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('dirt', 'assets/clumpables/dirtTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('steel', 'assets/clumpables/steelTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('lava', 'assets/clumpables/lavaTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 38, frameHeight: 19 });\n        this.load.spritesheet('player', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });\n        this.load.spritesheet('lizard', 'assets/monsters/lizard.png', { frameWidth: 70, frameHeight: 50 });\n        this.load.spritesheet('spider', 'assets/monsters/spider.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('spiderArmored', 'assets/monsters/spiderArmored.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('squareFire', 'assets/squares/squareFire.png', { frameWidth: 79, frameHeight: 80 });\n        this.load.spritesheet('fireDisappear', 'assets/squares/fireDisappear.png', { frameWidth: 84, frameHeight: 133 });\n    };\n    LevelEditor.prototype.create = function () {\n        // const graphics = this.add.graphics();\n        var sx = 0;\n        var sy = 0;\n        var draw = false;\n        pointer = this.input.activePointer;\n        var background = this.add.image(W_WIDTH / 2, W_HEIGHT / 2, 'background');\n        background.setScale(W_WIDTH / background.width);\n        cursors = this.input.keyboard.createCursorKeys();\n        this.matter.world.setBounds(0, 0, W_WIDTH, W_HEIGHT, 32, true, true, false, true);\n        this.cameras.main.setBounds(0, 0, W_WIDTH, W_HEIGHT);\n        var controlConfig = {\n            camera: this.cameras.main,\n            left: cursors.left,\n            right: cursors.right,\n            up: cursors.up,\n            down: cursors.down,\n            acceleration: 0.04,\n            drag: 0.0005,\n            maxSpeed: 0.7,\n        };\n        var gridConfig = {\n            scene: this,\n            cols: W_WIDTH / 50,\n            rows: W_HEIGHT / 50,\n        };\n        aGrid = new alignGrid_1.default(gridConfig);\n        controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);\n        new levelEditorButton_1.default(550, 150, 'Clump', '#fff', 'clump', this);\n        var menuNames = ['Clear', 'Crate', 'Lava', 'Dirt', 'Steel', 'Lizard', 'Spider', 'Player', 'Armored\\n Spider'];\n        var menuSelects = ['clear', 'crate', 'lava', 'dirt', 'steel', 'lizard', 'spider', 'player', 'spiderArmored'];\n        var menuButtons = [];\n        for (var i = 0; i < 8; i++) {\n            menuButtons.push(new levelEditorButton_1.default(550, 200 + i * 36, menuNames[i], '#fff', menuSelects[i], this));\n        }\n        this.input.on('pointerdown', function (pointer) {\n            sx = pointer.worldX;\n            sy = pointer.worldY;\n            if (game.selected == 'clump') {\n                draw = true;\n            }\n        });\n        this.graphics = this.add.graphics();\n        // eslint-disable-next-line @typescript-eslint/no-this-alias\n        var game = this;\n        this.input.on('pointerup', function () {\n            draw = false;\n            game.graphics.clear();\n            if (game.selected == 'clump') {\n                aGrid.clump(sx, sy, pointer.worldX, pointer.worldY);\n            }\n        });\n        this.input.on('pointermove', function (pointer) {\n            if (draw && pointer.noButtonDown() === false && game.selected == 'clump') {\n                console.log('asdf');\n                // graphics.clear();\n                var graphics_1 = game.graphics;\n                graphics_1.clear();\n                graphics_1.fillStyle(0x0000ff, 0.75);\n                graphics_1.lineStyle(2, 0x0000ff, 1);\n                graphics_1.fillRect(sx, sy, pointer.worldX - sx, pointer.worldY - sy);\n                graphics_1.strokeRect(sx, sy, pointer.worldX - sx, pointer.worldY - sy);\n            }\n        });\n        // const crateButton = new LevelEditorButton(550, , 'Crate', '#fff', 'crate', this);\n        // const lavaButton = new LevelEditorButton(550, 236, 'Lava', '#fff', 'lava', this);\n        // const dirtButton = new LevelEditorButton(550, 272, 'Dirt', '#fff', 'dirt', this);\n        // const steelButton = new LevelEditorButton(550, 308, 'Steel', '#fff', 'steel', this);\n        // const lizardButton = new LevelEditorButton(550, 308, 'Lizard', '#fff', 'lizard', this);\n        // const spiderButton = new LevelEditorButton(550, 308, 'Spider', '#fff', 'spider', this);\n        // const armorSpiderButton = new LevelEditorButton(550, 308, 'Armored Spider', '#fff', 'spiderArmored', this);\n        // const playerButton = new LevelEditorButton(550, 308, 'Player', '#fff', 'player', this);\n    };\n    LevelEditor.prototype.update = function (time, delta) {\n        controls.update(delta);\n        aGrid.show();\n        if (pointer.isDown) {\n            if (this.selected == 'clump') {\n                // this.graphics.clear();\n                // this.graphics.clear();\n                // let graphics = this.add.graphics();\n                // graphics.lineStyle(2, 0x0000ff, 0.75);\n                // graphics.strokeRect(this.sx, this.sy, pointer.x - this.sx, pointer.y - this.sy);\n                // graphics.strokeRect(0, 0, 100, 100);\n            }\n            else if (!this.onButton) {\n                aGrid.placeAt(pointer.worldX, pointer.worldY, this.selected, this);\n            }\n        }\n    };\n    return LevelEditor;\n}(Phaser.Scene));\nexports.LevelEditor = LevelEditor;\n\n\n//# sourceURL=webpack:///./src/scenes/level-editor-scene.ts?");

/***/ })

})