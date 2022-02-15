webpackHotUpdate("app",{

/***/ "./src/scenes/index.ts":
/*!*****************************!*\
  !*** ./src/scenes/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar main_menu_scene_1 = __webpack_require__(/*! ./main-menu-scene */ \"./src/scenes/main-menu-scene.ts\");\nvar boot_scene_1 = __webpack_require__(/*! ./boot-scene */ \"./src/scenes/boot-scene.ts\");\nvar game_scene_1 = __webpack_require__(/*! ./game-scene */ \"./src/scenes/game-scene.ts\");\nvar level_editor_scene_1 = __webpack_require__(/*! ./level-editor-scene */ \"./src/scenes/level-editor-scene.ts\");\nvar level_select_scene_1 = __webpack_require__(/*! ./level-select-scene */ \"./src/scenes/level-select-scene.ts\");\nexports.default = [boot_scene_1.BootScene, main_menu_scene_1.MainMenuScene, game_scene_1.GameScene, level_editor_scene_1.LevelEditor, level_select_scene_1.LevelSelect];\n\n\n//# sourceURL=webpack:///./src/scenes/index.ts?");

/***/ }),

/***/ "./src/scenes/level-editor-scene.ts":
/*!******************************************!*\
  !*** ./src/scenes/level-editor-scene.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.LevelEditor = void 0;\nvar menu_button_1 = __webpack_require__(/*! ../ui/menu-button */ \"./src/ui/menu-button.ts\");\nvar alignGrid_1 = __webpack_require__(/*! ../helpers/alignGrid */ \"./src/helpers/alignGrid.ts\");\nvar levelEditorButton_1 = __webpack_require__(/*! ../helpers/levelEditorButton */ \"./src/helpers/levelEditorButton.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'LevelEditor',\n};\nvar FileSaver = __webpack_require__(/*! file-saver */ \"./node_modules/file-saver/dist/FileSaver.min.js\");\nvar levelSizeButton_1 = __webpack_require__(/*! ../helpers/levelSizeButton */ \"./src/helpers/levelSizeButton.ts\");\nvar cursors;\nvar controls;\nvar pointer;\nvar aGrid;\n// let menuPositions = [];\n// let menuNames = []\n// for (let i = 0; i < 8; i++) {\n//   menuPositions.push(200 + i * 36);\n// }\nvar LevelEditor = /** @class */ (function (_super) {\n    __extends(LevelEditor, _super);\n    function LevelEditor() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        _this.selected = 'crate';\n        _this.onButton = false;\n        _this.width = 24;\n        _this.height = 12;\n        return _this;\n    }\n    LevelEditor.prototype.create = function () {\n        var _this = this;\n        var sx = 0;\n        var sy = 0;\n        var draw = false;\n        pointer = this.input.activePointer;\n        var preset = localStorage.getItem('upload') == 'true'\n            ? JSON.parse(localStorage.getItem('leveleditorlevel'))\n            : this.cache.json.get('leveleditorlevel');\n        preset = preset.width == null ? JSON.parse(preset) : preset;\n        this.width = preset.width;\n        this.height = preset.height;\n        var world_bound_width = preset.width * 50;\n        var world_bound_height = preset.height * 50;\n        var background = this.add.tileSprite(world_bound_width / 2, world_bound_height / 2, world_bound_width, world_bound_height, 'backgroundDirt');\n        cursors = this.input.keyboard.createCursorKeys();\n        this.matter.world.setBounds(0, 0, world_bound_width, world_bound_height, 32, true, true, false, true);\n        this.cameras.main.setBounds(0, 0, world_bound_width, world_bound_height);\n        var controlConfig = {\n            camera: this.cameras.main,\n            left: cursors.left,\n            right: cursors.right,\n            up: cursors.up,\n            down: cursors.down,\n            acceleration: 0.3,\n            drag: 0.0005,\n            maxSpeed: 0.3,\n        };\n        var gridConfig = {\n            scene: this,\n            cols: world_bound_width / 50,\n            rows: world_bound_height / 50,\n        };\n        aGrid = new alignGrid_1.default(gridConfig);\n        controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);\n        // new LevelEditorButton(550, 20, 'Start Level', '#fff', 'start', this);\n        // new LevelEditorButton(700, 20, 'download', '#fff', 'download', this);\n        // new LevelEditorButton(550, 75, 'Clump', '#fff', 'clump', this);\n        var menuNames = [\n            'Start Level',\n            'Download',\n            'Upload',\n            'Clump',\n            'Connect',\n            'Exit',\n            'Bomb',\n            'Clear',\n            'Crate',\n            'Lava',\n            'Dirt',\n            'Steel',\n            'Lizard',\n            'Spider',\n            'Player',\n            'Armor Spider',\n        ];\n        var menuSelects = [\n            'start',\n            'download',\n            'upload',\n            'clump',\n            'connector',\n            'exit',\n            'bomb',\n            'clear',\n            'crate',\n            'lava',\n            'dirt',\n            'steel',\n            'lizard',\n            'spider',\n            'player',\n            'spiderArmored',\n        ];\n        var menuButtons = [];\n        for (var i = 0; i < menuNames.length; i++) {\n            if (i < 5) {\n                menuButtons.push(new levelEditorButton_1.default(700, 20 + i * 30, menuNames[i], '#fff', menuSelects[i], this));\n            }\n            else {\n                menuButtons.push(new levelEditorButton_1.default(700, 40 + i * 30, menuNames[i], '#fff', menuSelects[i], this));\n            }\n        }\n        menuButtons.push(new levelSizeButton_1.default(700, 40 + menuNames.length * 30, 'width', this));\n        menuButtons.push(new levelSizeButton_1.default(700, 40 + (menuNames.length + 1) * 30, 'height', this));\n        this.buttons = menuButtons;\n        this.input.on('pointerdown', function (pointer) {\n            sx = pointer.worldX;\n            sy = pointer.worldY;\n            if (game.selected == 'clump' || game.selected == 'connector') {\n                draw = true;\n            }\n        });\n        // initalize graphics to draw highlighting rectangle and be drawn on top\n        this.graphics = this.add.graphics();\n        this.graphics.depth = 2;\n        // eslint-disable-next-line @typescript-eslint/no-this-alias\n        var game = this;\n        this.input.on('pointerup', function () {\n            draw = false;\n            game.graphics.clear();\n            var sr = aGrid.getRowOrCol(Math.min(sx, pointer.worldX));\n            var sc = aGrid.getRowOrCol(Math.min(sy, pointer.worldY));\n            var er = aGrid.getRowOrCol(Math.max(sx, pointer.worldX));\n            var ec = aGrid.getRowOrCol(Math.max(sy, pointer.worldY));\n            if (game.selected == 'clump') {\n                aGrid.clumpBox(sr, sc, er, ec);\n            }\n            else if (game.selected == 'connector') {\n                aGrid.connect(sr, sc, er, ec, game);\n            }\n        });\n        this.input.on('pointermove', function (pointer) {\n            if (draw && pointer.noButtonDown() === false && (game.selected == 'clump' || game.selected == 'connector')) {\n                // graphics.clear();\n                var graphics = game.graphics;\n                graphics.clear();\n                graphics.fillStyle(0x0000ff, 0.4);\n                graphics.lineStyle(2, 0x0000ff, 0.75);\n                graphics.fillRect(sx, sy, pointer.worldX - sx, pointer.worldY - sy);\n                graphics.strokeRect(sx, sy, pointer.worldX - sx, pointer.worldY - sy);\n            }\n        });\n        aGrid.show();\n        // const preset = JSON.parse(JSON.stringify(localStorage.getItem('leveleditorlevel')));\n        aGrid.placeAt(preset.player[0].x, preset.player[0].y, 'player', this);\n        preset.dirt.forEach(function (e) {\n            aGrid.placeAtPreset(e.x, e.y, 'dirt', e.frame, _this);\n        });\n        preset.steel.forEach(function (e) {\n            aGrid.placeAtPreset(e.x, e.y, 'steel', e.frame, _this);\n        });\n        preset.crate.forEach(function (e) {\n            aGrid.placeAtPreset(e.x, e.y, 'crate', e.frame, _this);\n        });\n        preset.lava.forEach(function (e) {\n            aGrid.placeAtPreset(e.x, e.y, 'lava', e.frame, _this);\n        });\n        preset.lizard.forEach(function (e) {\n            aGrid.placeAtPreset(e.x, e.y, 'lizard', '0', _this);\n        });\n        preset.spider.forEach(function (e) {\n            aGrid.placeAtPreset(e.x, e.y, 'spider', '0', _this);\n        });\n        preset.exit.forEach(function (e) {\n            aGrid.placeAtPreset(e.x, e.y, 'exit', '0', _this);\n        });\n        preset.connector.forEach(function (e) {\n            var xp = parseInt(e.substring(0, e.indexOf(',')));\n            var yp = parseInt(e.substring(e.indexOf(',') + 1));\n            aGrid.connectors[e] = game.add.image(xp, yp, 'connector');\n            if (yp % 50 == 0) {\n                aGrid.connectors[e].angle = 90;\n            }\n        });\n        aGrid.placeAt(preset.player[0].x, preset.player[0].y, 'player', this);\n        // aGrid.clumpBox(0, 0, aGrid.getRowOrCol(world_bound_width - 1), aGrid.getRowOrCol(world_bound_height - 1));\n        new menu_button_1.MenuButton(this, 10, 10, 'Back to Menu', function () {\n            _this.scene.start('MainMenu');\n        });\n    };\n    LevelEditor.prototype.generateJson = function (start, resize) {\n        if (start === void 0) { start = true; }\n        if (resize === void 0) { resize = false; }\n        var json = {\n            width: this.width,\n            height: this.height + 1,\n            player: [],\n            lizard: [],\n            spider: [],\n            spiderArmored: [],\n            dirt: [],\n            lava: [],\n            crate: [],\n            steel: [],\n            exit: [],\n            bomb: [],\n            connector: [],\n        };\n        var grid = aGrid.grid;\n        for (var i = 0; i < grid.length; i++) {\n            for (var j = 0; j < grid[0].length; j++) {\n                if (grid[i][j]) {\n                    var obj = grid[i][j];\n                    if ((i < this.width && j < this.height) || obj.name == 'player') {\n                        // check min in case new world size cuts off player location\n                        json[obj.name].push({\n                            x: obj.x,\n                            y: obj.y,\n                            frame: obj.frame.name,\n                        });\n                    }\n                }\n            }\n        }\n        for (var _i = 0, _a = Object.entries(aGrid.connectors); _i < _a.length; _i++) {\n            var _b = _a[_i], key = _b[0], value = _b[1];\n            json['connector'].push(key);\n        }\n        var download = JSON.stringify(json);\n        // start level immediately instead of download\n        if (start) {\n            localStorage.setItem('leveleditorlevel', download);\n            localStorage.setItem('useleveleditor', 'true');\n            this.scene.start('Game');\n        }\n        else if (resize) {\n            localStorage.setItem('upload', 'true');\n            localStorage.setItem('leveleditorlevel', download);\n            this.scene.restart();\n        }\n        else {\n            // for downloads\n            var fileToSave = new Blob([JSON.stringify(json, null, 2)], {\n                type: 'application/json',\n            });\n            FileSaver(fileToSave, 'level.json');\n        }\n    };\n    LevelEditor.prototype.update = function (time, delta) {\n        controls.update(delta);\n        if (pointer.isDown) {\n            if (this.selected == 'clump' || this.selected == 'connector') {\n                // this.graphics.clear();\n                // this.graphics.clear();\n                // let graphics = this.add.graphics();\n                // graphics.lineStyle(2, 0x0000ff, 0.75);\n                // graphics.strokeRect(this.sx, this.sy, pointer.x - this.sx, pointer.y - this.sy);\n                // graphics.strokeRect(0, 0, 100, 100);\n            }\n            else if (!this.onButton) {\n                aGrid.placeAt(pointer.worldX, pointer.worldY, this.selected, this);\n            }\n        }\n    };\n    return LevelEditor;\n}(Phaser.Scene));\nexports.LevelEditor = LevelEditor;\n\n\n//# sourceURL=webpack:///./src/scenes/level-editor-scene.ts?");

/***/ })

})