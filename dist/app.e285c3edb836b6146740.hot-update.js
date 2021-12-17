webpackHotUpdate("app",{

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
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.LevelEditor = void 0;\nvar alignGrid_1 = __webpack_require__(/*! ../helpers/alignGrid */ \"./src/helpers/alignGrid.ts\");\nvar levelEditorButton_1 = __webpack_require__(/*! ../helpers/levelEditorButton */ \"./src/helpers/levelEditorButton.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'LevelEditor',\n};\nvar W_WIDTH = 1200;\nvar W_HEIGHT = 600;\nvar FileSaver = __webpack_require__(/*! file-saver */ \"./node_modules/file-saver/dist/FileSaver.min.js\");\nvar cursors;\nvar controls;\nvar grid;\nvar pointer;\nvar aGrid;\nvar graphics;\n// let menuPositions = [];\n// let menuNames = []\n// for (let i = 0; i < 8; i++) {\n//   menuPositions.push(200 + i * 36);\n// }\nvar LevelEditor = /** @class */ (function (_super) {\n    __extends(LevelEditor, _super);\n    function LevelEditor() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        _this.selected = 'crate';\n        _this.onButton = false;\n        return _this;\n    }\n    LevelEditor.prototype.preload = function () {\n        this.load.image('background', 'assets/backgrounds/level-editor.png');\n        this.load.image('house', 'assets/squares/house.png');\n        this.load.spritesheet('crate', 'assets/clumpables/crateTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('dirt', 'assets/clumpables/dirtTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('steel', 'assets/clumpables/steelTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('lava', 'assets/clumpables/lavaTiles.png', { frameWidth: 50, frameHeight: 50 });\n        this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 38, frameHeight: 19 });\n        this.load.spritesheet('player', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });\n        this.load.spritesheet('lizard', 'assets/monsters/lizard.png', { frameWidth: 70, frameHeight: 50 });\n        this.load.spritesheet('spider', 'assets/monsters/spider.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('spiderArmored', 'assets/monsters/spiderArmored.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('squareFire', 'assets/squares/squareFire.png', { frameWidth: 79, frameHeight: 80 });\n        this.load.spritesheet('fireDisappear', 'assets/squares/fireDisappear.png', { frameWidth: 84, frameHeight: 133 });\n        this.load.json('level', 'assets/levels/leveleditor.json');\n    };\n    LevelEditor.prototype.create = function () {\n        // const graphics = this.add.graphics();\n        var sx = 0;\n        var sy = 0;\n        var draw = false;\n        pointer = this.input.activePointer;\n        var background = this.add.image(W_WIDTH / 2, W_HEIGHT / 2, 'background');\n        background.setScale(W_WIDTH / background.width);\n        cursors = this.input.keyboard.createCursorKeys();\n        this.matter.world.setBounds(0, 0, W_WIDTH, W_HEIGHT, 32, true, true, false, true);\n        this.cameras.main.setBounds(0, 0, W_WIDTH, W_HEIGHT);\n        var controlConfig = {\n            camera: this.cameras.main,\n            left: cursors.left,\n            right: cursors.right,\n            up: cursors.up,\n            down: cursors.down,\n            acceleration: 0.3,\n            drag: 0.0005,\n            maxSpeed: 0.3,\n        };\n        var gridConfig = {\n            scene: this,\n            cols: W_WIDTH / 50,\n            rows: W_HEIGHT / 50,\n        };\n        aGrid = new alignGrid_1.default(gridConfig);\n        controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);\n        new levelEditorButton_1.default(550, 100, 'Download', '#fff', 'download', this);\n        new levelEditorButton_1.default(550, 150, 'Clump', '#fff', 'clump', this);\n        var menuNames = ['Clear', 'Crate', 'Lava', 'Dirt', 'Steel', 'Lizard', 'Spider', 'Player', 'Armored\\n Spider'];\n        var menuSelects = ['clear', 'crate', 'lava', 'dirt', 'steel', 'lizard', 'spider', 'player', 'spiderArmored'];\n        var menuButtons = [];\n        for (var i = 0; i < 8; i++) {\n            menuButtons.push(new levelEditorButton_1.default(550, 200 + i * 36, menuNames[i], '#fff', menuSelects[i], this));\n        }\n        this.input.on('pointerdown', function (pointer) {\n            sx = pointer.worldX;\n            sy = pointer.worldY;\n            if (game.selected == 'clump') {\n                draw = true;\n            }\n        });\n        // initalize graphics to draw highlighting rectangle and be drawn on top\n        this.graphics = this.add.graphics();\n        this.graphics.depth = 2;\n        // eslint-disable-next-line @typescript-eslint/no-this-alias\n        var game = this;\n        this.input.on('pointerup', function () {\n            draw = false;\n            game.graphics.clear();\n            if (game.selected == 'clump') {\n                var sr = aGrid.getRowOrCol(Math.min(sx, pointer.worldX));\n                var sc = aGrid.getRowOrCol(Math.min(sy, pointer.worldY));\n                var er = aGrid.getRowOrCol(Math.max(sx, pointer.worldX));\n                var ec = aGrid.getRowOrCol(Math.max(sy, pointer.worldY));\n                aGrid.clump(sr, sc, er, ec);\n            }\n        });\n        this.input.on('pointermove', function (pointer) {\n            if (draw && pointer.noButtonDown() === false && game.selected == 'clump') {\n                // graphics.clear();\n                var graphics_1 = game.graphics;\n                graphics_1.clear();\n                graphics_1.fillStyle(0x0000ff, 0.4);\n                graphics_1.lineStyle(2, 0x0000ff, 0.75);\n                graphics_1.fillRect(sx, sy, pointer.worldX - sx, pointer.worldY - sy);\n                graphics_1.strokeRect(sx, sy, pointer.worldX - sx, pointer.worldY - sy);\n            }\n        });\n        aGrid.show();\n        aGrid.placeAt(350, 350, 'player', this);\n    };\n    LevelEditor.prototype.generateJson = function () {\n        var clumpables = new Set(['crate', 'lava', 'dirt', 'steel']);\n        var json = {\n            player: [],\n            lizard: [],\n            spider: [],\n            armoredSpider: [],\n            dirt: [],\n            lava: [],\n            crate: [],\n            steel: [],\n        };\n        var grid = aGrid.grid;\n        for (var i = 0; i < grid.length; i++) {\n            for (var j = 0; j < grid[0].length; j++) {\n                if (grid[i][j]) {\n                    var obj = grid[i][j];\n                    // if (clumpables.has(obj.name)) {\n                    //   json[obj.name].push({\n                    //     x: obj.x,\n                    //     y: obj.y,\n                    //     frame: obj.frame.name,\n                    //   });\n                    // }\n                    console.log(obj.name);\n                    json[obj.name].push({\n                        x: obj.x,\n                        y: obj.y,\n                        frame: obj.frame.name,\n                    });\n                }\n            }\n        }\n        // const download = JSON.stringify(json, null, 2);\n        var fileToSave = new Blob([JSON.stringify(json, null, 4)], {\n            type: 'application/json',\n        });\n        FileSaver(fileToSave, 'level.json');\n    };\n    LevelEditor.prototype.update = function (time, delta) {\n        controls.update(delta);\n        if (pointer.isDown) {\n            if (this.selected == 'clump') {\n                // this.graphics.clear();\n                // this.graphics.clear();\n                // let graphics = this.add.graphics();\n                // graphics.lineStyle(2, 0x0000ff, 0.75);\n                // graphics.strokeRect(this.sx, this.sy, pointer.x - this.sx, pointer.y - this.sy);\n                // graphics.strokeRect(0, 0, 100, 100);\n            }\n            else if (!this.onButton) {\n                aGrid.placeAt(pointer.worldX, pointer.worldY, this.selected, this);\n            }\n        }\n    };\n    return LevelEditor;\n}(Phaser.Scene));\nexports.LevelEditor = LevelEditor;\n\n\n//# sourceURL=webpack:///./src/scenes/level-editor-scene.ts?");

/***/ })

})