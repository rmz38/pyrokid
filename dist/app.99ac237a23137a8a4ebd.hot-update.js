webpackHotUpdate("app",{

/***/ "./src/helpers/alignGrid.ts":
/*!**********************************!*\
  !*** ./src/helpers/alignGrid.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar clump_1 = __webpack_require__(/*! ./clump */ \"./src/helpers/clump.ts\");\nvar TILE_SIZE = 50;\nvar clumpables = new Set(['dirt', 'lava', 'crate', 'steel']);\nvar AlignGrid = /** @class */ (function () {\n    // public clumps = new Map<integer, Set<string>>();\n    function AlignGrid(config) {\n        this.counter = 0;\n        if (!config.scene) {\n            console.log('missing scene!');\n            return;\n        }\n        if (!config.rows) {\n            console.log('no rows given wee woo');\n        }\n        if (!config.cols) {\n            console.log('no columns given wee woo');\n        }\n        this.h = config.rows * TILE_SIZE;\n        this.w = config.cols * TILE_SIZE;\n        this.rows = config.rows;\n        this.cols = config.cols;\n        this.scene = config.scene;\n        this.grid = new Array(this.rows);\n        this.connectors = new Set();\n        this.selected = 'lavaTile';\n        for (var i = 0; i < this.cols; i++) {\n            this.grid[i] = new Array(this.rows);\n        }\n        this.playerTile = null;\n    }\n    AlignGrid.prototype.show = function (a) {\n        if (a === void 0) { a = 0.7; }\n        this.graphics = this.scene.add.graphics();\n        this.graphics.lineStyle(1, 0xff0000, a);\n        for (var i = 0; i < this.w; i += TILE_SIZE) {\n            this.graphics.moveTo(i, 0);\n            this.graphics.lineTo(i, this.h);\n        }\n        for (var i = 0; i < this.h; i += TILE_SIZE) {\n            this.graphics.moveTo(0, i);\n            this.graphics.lineTo(this.w, i);\n        }\n        this.graphics.strokePath();\n    };\n    AlignGrid.prototype.placeAt = function (x1, y1, objName, game) {\n        var _this = this;\n        //converted centered coordinates in pixels to place in grid square\n        console.log(objName);\n        var row = Math.floor(x1 / TILE_SIZE);\n        var col = Math.floor(y1 / TILE_SIZE);\n        var x2 = row * TILE_SIZE + TILE_SIZE / 2;\n        var y2 = col * TILE_SIZE + TILE_SIZE / 2;\n        //if clearing instead\n        if (objName == 'clear') {\n            if (this.grid[row][col]) {\n                var name_1 = this.grid[row][col].name;\n                var frame = this.grid[row][col].frame.name;\n                if (name_1 == 'player') {\n                    return;\n                }\n                this.grid[row][col].destroy();\n                this.grid[row][col] = null;\n                //@ts-ignore\n                if (clumpables.has(name_1) && frame != 0) {\n                    this.neighbors(row, col).forEach(function (e) {\n                        var nx = _this.unpack(e)[0];\n                        var ny = _this.unpack(e)[1];\n                        //@ts-ignore\n                        if (_this.grid[nx][ny] && _this.grid[nx][ny].frame.name != 0) {\n                            _this.clump(nx, ny, nx, ny);\n                        }\n                    });\n                }\n            }\n            this.grid[row][col] = null;\n            return;\n        }\n        var obj = game.add.image(x2, y2, objName);\n        obj.name = objName;\n        if (this.grid[row][col]) {\n            if (this.playerTile && this.playerTile[0] == row && this.playerTile[1] == col) {\n                this.playerTile = null;\n            }\n            this.grid[row][col].destroy();\n        }\n        if (objName == 'player') {\n            if (this.playerTile) {\n                this.grid[this.playerTile[0]][this.playerTile[1]].destroy();\n            }\n            this.playerTile = [row, col];\n        }\n        this.grid[row][col] = obj;\n        obj.x = x2;\n        obj.y = y2;\n    };\n    AlignGrid.prototype.getRowOrCol = function (pixel) {\n        return Math.floor(pixel / TILE_SIZE);\n    };\n    AlignGrid.prototype.getPixel = function (rowOrCol) {\n        return rowOrCol * TILE_SIZE + TILE_SIZE / 2;\n    };\n    AlignGrid.prototype.neighbors = function (i, j) {\n        return [\n            i - 1 + ',' + (j - 1),\n            i + ',' + (j - 1),\n            i + 1 + ',' + (j - 1),\n            i + 1 + ',' + j,\n            i + 1 + ',' + (j + 1),\n            i + ',' + (j + 1),\n            i - 1 + ',' + (j + 1),\n            i - 1 + ',' + j,\n        ];\n    };\n    AlignGrid.prototype.neighbors4 = function (i, j) {\n        // eslint-disable-next-line prettier/prettier\n        return [i + ',' + (j - 1), i + 1 + ',' + j, i + ',' + (j + 1), i - 1 + ',' + j];\n    };\n    AlignGrid.prototype.unpack = function (coord) {\n        var split = coord.indexOf(',');\n        var i = parseInt(coord.substring(0, split));\n        var j = parseInt(coord.substring(split + 1));\n        return [i, j];\n    };\n    /**\n     * start and end of rectangle drawn by mouse to clump selected tiles\n     * FIX TO TAKE SET OF TILES INSTEAD OF RECTANGLE? TODO\n     * @param sx start x pixel coordinate\n     * @param sy start y pixel coordinate\n     * @param ex end x pixel coordinate\n     * @param ey end y pixel coordinate\n     */\n    AlignGrid.prototype.clump = function (sr, sc, er, ec) {\n        var _this = this;\n        var curr = new Set();\n        var check = new Set();\n        // DO BFS\n        for (var i = sr; i <= er; i++) {\n            for (var j = sc; j <= ec; j++) {\n                if (this.grid[i][j]) {\n                    curr.add(i + ',' + j);\n                    check.add(i + ',' + j);\n                    //@ts-ignore\n                    if (this.grid[i][j].frame.name != 0) {\n                        this.neighbors(i, j).forEach(function (e) {\n                            var nx = _this.unpack(e)[0];\n                            var ny = _this.unpack(e)[1];\n                            //@ts-ignore\n                            if (_this.grid[nx][ny] && _this.grid[nx][ny].frame.name != 0) {\n                                check.add(e);\n                            }\n                        });\n                    }\n                }\n            }\n        }\n        // figure out which tile texture to use based on spritesheet\n        // ensured that none are null in curr\n        curr.forEach(function (e) {\n            var i = _this.unpack(e)[0];\n            var j = _this.unpack(e)[1];\n            if (clumpables.has(_this.grid[i][j].name)) {\n                var candidates = _this.neighbors(i, j);\n                // all sides of the tile grabbed from the tilesheets\n                var id = [1, 1, 1, 1, 1, 1, 1, 1];\n                var pointer = 0;\n                for (var x = 0; x < candidates.length; x++) {\n                    var coord = candidates[x];\n                    var a = _this.unpack(coord)[0];\n                    var b = _this.unpack(coord)[1];\n                    if (!(check.has(coord) && _this.grid[a][b].name == _this.grid[i][j].name)) {\n                        if (x % 2 == 0) {\n                            id[pointer] = 0;\n                        }\n                        else {\n                            id[pointer] = 0;\n                            id[pointer + 1] = 0;\n                            // wrap around to 7\n                            if (pointer + 2 > 7) {\n                                id[0] = 0;\n                            }\n                            else {\n                                id[pointer + 2] = 0;\n                            }\n                        }\n                    }\n                    // console.log(pointer);\n                    if (x % 2 == 1) {\n                        pointer += 2;\n                    }\n                }\n                _this.grid[i][j].setFrame(clump_1.tiles[id.join('')]);\n            }\n        });\n    };\n    AlignGrid.prototype.connect = function (sr, sc, er, ec) {\n        var _this = this;\n        var curr = new Set();\n        var check = new Set();\n        // DO BFS and add tiles to initalized bfs\n        for (var i = sr; i <= er; i++) {\n            for (var j = sc; j <= ec; j++) {\n                if (this.grid[i][j]) {\n                    curr.add(i + ',' + j);\n                }\n            }\n        }\n        // figure out which tile texture to use based on spritesheet\n        // ensured that none are null in curr\n        curr.forEach(function (e) {\n            var i = _this.unpack(e)[0];\n            var j = _this.unpack(e)[1];\n            if (clumpables.has(_this.grid[i][j].name)) {\n                var candidates = _this.neighbors(i, j);\n                // all sides of the tile grabbed from the tilesheets\n                var id = clump_1.indexes[parseInt(_this.grid[i][j].frame.name)].split('');\n                for (var x = 0; x < candidates.length; x++) {\n                    var coord = candidates[x];\n                    var a = _this.unpack(coord)[0];\n                    var b = _this.unpack(coord)[1];\n                    // find the id of the frame to use and what sides are available to join\n                    var flag = false;\n                    if (curr.has(coord)) {\n                        console.log(_this.grid[a][b]);\n                        var neighborId = clump_1.indexes[parseInt(_this.grid[a][b].frame.name)];\n                        var ip = _this.getPixel(i);\n                        var jp = _this.getPixel(j);\n                        var coordId = ip + ',' + jp;\n                        if (a > i) {\n                            if (neighborId[7] == '0' && id[3] == '0') {\n                                flag = true;\n                            }\n                            else if (a < i) {\n                                if (neighborId[3] == '0' && id[7] == '0') {\n                                    flag = true;\n                                }\n                            }\n                            else if (b > j) {\n                                if (neighborId[1] == '0' && id[5] == '0') {\n                                    flag = true;\n                                }\n                            }\n                            else if (b < j) {\n                                if (neighborId[5] == '0' && id[1] == '0') {\n                                    flag = true;\n                                }\n                            }\n                        }\n                        if (flag) {\n                            _this.connectors.add(ip + (a - i) * 25 + ',' + (jp + (b - j) * 25));\n                        }\n                    }\n                }\n            }\n        });\n        console.log(this.connectors);\n    };\n    return AlignGrid;\n}());\nexports.default = AlignGrid;\n\n\n//# sourceURL=webpack:///./src/helpers/alignGrid.ts?");

/***/ }),

/***/ "./src/scenes/level-editor-scene.ts":
/*!******************************************!*\
  !*** ./src/scenes/level-editor-scene.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.LevelEditor = void 0;\nvar menu_button_1 = __webpack_require__(/*! ../ui/menu-button */ \"./src/ui/menu-button.ts\");\nvar alignGrid_1 = __webpack_require__(/*! ../helpers/alignGrid */ \"./src/helpers/alignGrid.ts\");\nvar levelEditorButton_1 = __webpack_require__(/*! ../helpers/levelEditorButton */ \"./src/helpers/levelEditorButton.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'LevelEditor',\n};\nvar W_WIDTH = 1200;\nvar W_HEIGHT = 700;\nvar FileSaver = __webpack_require__(/*! file-saver */ \"./node_modules/file-saver/dist/FileSaver.min.js\");\nvar cursors;\nvar controls;\nvar pointer;\nvar aGrid;\n// let menuPositions = [];\n// let menuNames = []\n// for (let i = 0; i < 8; i++) {\n//   menuPositions.push(200 + i * 36);\n// }\nvar LevelEditor = /** @class */ (function (_super) {\n    __extends(LevelEditor, _super);\n    function LevelEditor() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        _this.selected = 'crate';\n        _this.onButton = false;\n        return _this;\n    }\n    LevelEditor.prototype.create = function () {\n        var _this = this;\n        var sx = 0;\n        var sy = 0;\n        var draw = false;\n        pointer = this.input.activePointer;\n        var background = this.add.image(W_WIDTH / 2, W_HEIGHT / 2, 'backgroundDirt');\n        background.setScale(W_WIDTH / background.width);\n        cursors = this.input.keyboard.createCursorKeys();\n        this.matter.world.setBounds(0, 0, W_WIDTH, W_HEIGHT, 32, true, true, false, true);\n        this.cameras.main.setBounds(0, 0, W_WIDTH, W_HEIGHT);\n        var controlConfig = {\n            camera: this.cameras.main,\n            left: cursors.left,\n            right: cursors.right,\n            up: cursors.up,\n            down: cursors.down,\n            acceleration: 0.3,\n            drag: 0.0005,\n            maxSpeed: 0.3,\n        };\n        var gridConfig = {\n            scene: this,\n            cols: W_WIDTH / 50,\n            rows: W_HEIGHT / 50,\n        };\n        aGrid = new alignGrid_1.default(gridConfig);\n        controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);\n        // new LevelEditorButton(550, 20, 'Start Level', '#fff', 'start', this);\n        // new LevelEditorButton(700, 20, 'download', '#fff', 'download', this);\n        // new LevelEditorButton(550, 75, 'Clump', '#fff', 'clump', this);\n        var menuNames = [\n            'Start Level',\n            'Download',\n            'Clump',\n            'Connect',\n            'Exit',\n            'Bomb',\n            'Clear',\n            'Crate',\n            'Lava',\n            'Dirt',\n            'Steel',\n            'Lizard',\n            'Spider',\n            'Player',\n            'Armor Spider',\n        ];\n        var menuSelects = [\n            'start',\n            'download',\n            'clump',\n            'connector',\n            'exit',\n            'bomb',\n            'clear',\n            'crate',\n            'lava',\n            'dirt',\n            'steel',\n            'lizard',\n            'spider',\n            'player',\n            'spiderArmored',\n        ];\n        var menuButtons = [];\n        for (var i = 0; i < menuNames.length; i++) {\n            menuButtons.push(new levelEditorButton_1.default(700, 50 + i * 30, menuNames[i], '#fff', menuSelects[i], this));\n        }\n        this.input.on('pointerdown', function (pointer) {\n            sx = pointer.worldX;\n            sy = pointer.worldY;\n            if (game.selected == 'clump' || game.selected == 'connector') {\n                draw = true;\n            }\n        });\n        // initalize graphics to draw highlighting rectangle and be drawn on top\n        this.graphics = this.add.graphics();\n        this.graphics.depth = 2;\n        // eslint-disable-next-line @typescript-eslint/no-this-alias\n        var game = this;\n        this.input.on('pointerup', function () {\n            draw = false;\n            game.graphics.clear();\n            var sr = aGrid.getRowOrCol(Math.min(sx, pointer.worldX));\n            var sc = aGrid.getRowOrCol(Math.min(sy, pointer.worldY));\n            var er = aGrid.getRowOrCol(Math.max(sx, pointer.worldX));\n            var ec = aGrid.getRowOrCol(Math.max(sy, pointer.worldY));\n            if (game.selected == 'clump') {\n                aGrid.clump(sr, sc, er, ec);\n            }\n            else if (game.selected == 'connector') {\n                aGrid.connect(sr, sc, er, ec);\n            }\n        });\n        this.input.on('pointermove', function (pointer) {\n            if (draw && pointer.noButtonDown() === false && (game.selected == 'clump' || game.selected == 'connector')) {\n                // graphics.clear();\n                var graphics = game.graphics;\n                graphics.clear();\n                graphics.fillStyle(0x0000ff, 0.4);\n                graphics.lineStyle(2, 0x0000ff, 0.75);\n                graphics.fillRect(sx, sy, pointer.worldX - sx, pointer.worldY - sy);\n                graphics.strokeRect(sx, sy, pointer.worldX - sx, pointer.worldY - sy);\n            }\n        });\n        aGrid.show();\n        var preset = this.cache.json.get('leveleditorlevel');\n        aGrid.placeAt(preset.player[0].x, preset.player[0].y, 'player', this);\n        preset.dirt.forEach(function (e) {\n            aGrid.placeAt(e.x, e.y, 'dirt', _this);\n        });\n        new menu_button_1.MenuButton(this, 10, 10, 'Back to Menu', function () {\n            _this.scene.start('MainMenu');\n        });\n    };\n    LevelEditor.prototype.generateJson = function (start) {\n        if (start === void 0) { start = true; }\n        var json = {\n            player: [],\n            lizard: [],\n            spider: [],\n            armoredSpider: [],\n            dirt: [],\n            lava: [],\n            crate: [],\n            steel: [],\n            exit: [],\n        };\n        var grid = aGrid.grid;\n        for (var i = 0; i < grid.length; i++) {\n            for (var j = 0; j < grid[0].length; j++) {\n                if (grid[i][j]) {\n                    var obj = grid[i][j];\n                    json[obj.name].push({\n                        x: obj.x,\n                        y: obj.y,\n                        frame: obj.frame.name,\n                    });\n                }\n            }\n        }\n        var download = JSON.stringify(json, null, 2);\n        // start level immediately instead of download\n        if (start) {\n            localStorage.setItem('leveleditorlevel', download);\n            localStorage.setItem('useleveleditor', 'true');\n            this.scene.start('Game');\n        }\n        else {\n            // for downloads\n            var fileToSave = new Blob([JSON.stringify(json, null, 4)], {\n                type: 'application/json',\n            });\n            FileSaver(fileToSave, 'level.json');\n        }\n    };\n    LevelEditor.prototype.update = function (time, delta) {\n        controls.update(delta);\n        if (pointer.isDown) {\n            if (this.selected == 'clump' || this.selected == 'connector') {\n                // this.graphics.clear();\n                // this.graphics.clear();\n                // let graphics = this.add.graphics();\n                // graphics.lineStyle(2, 0x0000ff, 0.75);\n                // graphics.strokeRect(this.sx, this.sy, pointer.x - this.sx, pointer.y - this.sy);\n                // graphics.strokeRect(0, 0, 100, 100);\n            }\n            else if (!this.onButton) {\n                aGrid.placeAt(pointer.worldX, pointer.worldY, this.selected, this);\n            }\n        }\n    };\n    return LevelEditor;\n}(Phaser.Scene));\nexports.LevelEditor = LevelEditor;\n\n\n//# sourceURL=webpack:///./src/scenes/level-editor-scene.ts?");

/***/ })

})