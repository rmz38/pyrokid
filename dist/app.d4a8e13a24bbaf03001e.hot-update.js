webpackHotUpdate("app",{

/***/ "./src/helpers/alignGrid.ts":
/*!**********************************!*\
  !*** ./src/helpers/alignGrid.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar TILE_SIZE = 50;\nvar AlignGrid = /** @class */ (function () {\n    function AlignGrid(config) {\n        if (!config.scene) {\n            console.log('missing scene!');\n            return;\n        }\n        if (!config.rows) {\n            console.log('no rows given wee woo');\n        }\n        if (!config.cols) {\n            console.log('no columns given wee woo');\n        }\n        this.h = config.rows * TILE_SIZE;\n        this.w = config.cols * TILE_SIZE;\n        this.rows = config.rows;\n        this.cols = config.cols;\n        this.scene = config.scene;\n        this.grid = new Array(this.rows);\n        this.selected = 'lavaTile';\n        for (var i = 0; i < this.cols; i++) {\n            this.grid[i] = new Array(this.rows);\n        }\n    }\n    AlignGrid.prototype.show = function (a) {\n        if (a === void 0) { a = 0.7; }\n        this.graphics = this.scene.add.graphics();\n        this.graphics.lineStyle(1, 0xff0000, a);\n        for (var i = 0; i < this.w; i += TILE_SIZE) {\n            this.graphics.moveTo(i, 0);\n            this.graphics.lineTo(i, this.h);\n        }\n        for (var i = 0; i < this.h; i += TILE_SIZE) {\n            this.graphics.moveTo(0, i);\n            this.graphics.lineTo(this.w, i);\n        }\n        this.graphics.strokePath();\n    };\n    AlignGrid.prototype.placeAt = function (x1, y1, objName, game) {\n        //converted centered coordinates in pixels to place in grid square\n        var row = Math.floor(x1 / TILE_SIZE);\n        var col = Math.floor(y1 / TILE_SIZE);\n        var x2 = row * TILE_SIZE + TILE_SIZE / 2;\n        var y2 = col * TILE_SIZE + TILE_SIZE / 2;\n        var obj = game.add.image(x2, y2, objName);\n        this.selected = objName;\n        if (this.grid[row][col]) {\n            this.grid[row][col].destroy();\n        }\n        this.grid[row][col] = obj;\n        obj.x = x2;\n        obj.y = y2;\n    };\n    return AlignGrid;\n}());\nexports.default = AlignGrid;\n\n\n//# sourceURL=webpack:///./src/helpers/alignGrid.ts?");

/***/ }),

/***/ "./src/scenes/level-editor-scene.ts":
/*!******************************************!*\
  !*** ./src/scenes/level-editor-scene.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.LevelEditor = void 0;\nvar alignGrid_1 = __webpack_require__(/*! ../helpers/alignGrid */ \"./src/helpers/alignGrid.ts\");\nvar textButton_1 = __webpack_require__(/*! ../helpers/textButton */ \"./src/helpers/textButton.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'LevelEditor',\n};\nvar W_WIDTH = 1200;\nvar W_HEIGHT = 600;\nvar CAMERA_SPEED = 8;\nvar cursors;\nvar controls;\nvar grid;\nvar pointer;\nvar aGrid;\nvar menu = [];\nvar LevelEditor = /** @class */ (function (_super) {\n    __extends(LevelEditor, _super);\n    function LevelEditor() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        return _this;\n    }\n    LevelEditor.prototype.preload = function () {\n        this.load.image('background', 'assets/backgrounds/level-editor.png');\n        this.load.image('ground', 'assets/squares/platform.png');\n        this.load.image('house', 'assets/squares/house.png');\n        this.load.image('dirtTile', 'assets/squares/dirtTile.png');\n        this.load.image('steelTile', 'assets/squares/steelTile.png');\n        this.load.image('lavaTile', 'assets/squares/lavaTile.png');\n        this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 38, frameHeight: 19 });\n        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });\n        this.load.spritesheet('lizard', 'assets/monsters/lizard.png', { frameWidth: 70, frameHeight: 50 });\n        this.load.spritesheet('spider', 'assets/monsters/spider.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('spiderArmored', 'assets/monsters/spiderArmored.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('crate', 'assets/squares/crate.png', { frameWidth: 79, frameHeight: 80 });\n        this.load.spritesheet('squareFire', 'assets/squares/squareFire.png', { frameWidth: 79, frameHeight: 80 });\n        this.load.spritesheet('fireDisappear', 'assets/squares/fireDisappear.png', { frameWidth: 84, frameHeight: 133 });\n    };\n    LevelEditor.prototype.create = function () {\n        pointer = this.input.activePointer;\n        var background = this.add.image(W_WIDTH / 2, W_HEIGHT / 2, 'background');\n        background.setScale(W_WIDTH / background.width);\n        cursors = this.input.keyboard.createCursorKeys();\n        this.matter.world.setBounds(0, 0, W_WIDTH, W_HEIGHT, 32, true, true, false, true);\n        var controlConfig = {\n            camera: this.cameras.main,\n            left: cursors.left,\n            right: cursors.right,\n            up: cursors.up,\n            down: cursors.down,\n            acceleration: 0.04,\n            drag: 0.0005,\n            maxSpeed: 0.7,\n        };\n        var gridConfig = {\n            scene: this,\n            cols: W_WIDTH / 50,\n            rows: W_HEIGHT / 50,\n        };\n        aGrid = new alignGrid_1.default(gridConfig);\n        aGrid.show();\n        controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);\n        var button = new textButton_1.default(200, 200, 'asdf', '#0f0', this);\n    };\n    LevelEditor.prototype.update = function (time, delta) {\n        controls.update(delta);\n        if (pointer.isDown) {\n            aGrid.placeAt(pointer.worldX, pointer.worldY, selected, this);\n        }\n    };\n    return LevelEditor;\n}(Phaser.Scene));\nexports.LevelEditor = LevelEditor;\n\n\n//# sourceURL=webpack:///./src/scenes/level-editor-scene.ts?");

/***/ })

})