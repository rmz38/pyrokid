webpackHotUpdate("app",{

/***/ "./src/helpers/alignGrid.ts":
/*!**********************************!*\
  !*** ./src/helpers/alignGrid.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (133:39)\\nFile was processed with these loaders:\\n * ./node_modules/ts-loader/index.js\\nYou may need an additional loader to handle the result of these loaders.\\n|                 var coord = candidates[x];\\n|                 var a = coord.substring(0);\\n>                 if (curr.has(coord) && ) {\\n|                 }\\n|             }\");\n\n//# sourceURL=webpack:///./src/helpers/alignGrid.ts?");

/***/ }),

/***/ "./src/scenes/level-editor-scene.ts":
/*!******************************************!*\
  !*** ./src/scenes/level-editor-scene.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.LevelEditor = void 0;\nvar alignGrid_1 = __webpack_require__(/*! ../helpers/alignGrid */ \"./src/helpers/alignGrid.ts\");\nvar levelEditorButton_1 = __webpack_require__(/*! ../helpers/levelEditorButton */ \"./src/helpers/levelEditorButton.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'LevelEditor',\n};\nvar W_WIDTH = 1200;\nvar W_HEIGHT = 600;\nvar cursors;\nvar controls;\nvar grid;\nvar pointer;\nvar aGrid;\nvar graphics;\n// let menuPositions = [];\n// let menuNames = []\n// for (let i = 0; i < 8; i++) {\n//   menuPositions.push(200 + i * 36);\n// }\nvar LevelEditor = /** @class */ (function (_super) {\n    __extends(LevelEditor, _super);\n    function LevelEditor() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        _this.selected = 'lava';\n        _this.onButton = false;\n        return _this;\n    }\n    LevelEditor.prototype.preload = function () {\n        this.load.image('background', 'assets/backgrounds/level-editor.png');\n        this.load.image('ground', 'assets/squares/platform.png');\n        this.load.image('house', 'assets/squares/house.png');\n        this.load.image('dirt', 'assets/squares/dirtTile.png');\n        this.load.image('steel', 'assets/squares/steelTile.png');\n        this.load.image('lava', 'assets/squares/lavaTile.png');\n        this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 38, frameHeight: 19 });\n        this.load.spritesheet('player', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });\n        this.load.spritesheet('lizard', 'assets/monsters/lizard.png', { frameWidth: 70, frameHeight: 50 });\n        this.load.spritesheet('spider', 'assets/monsters/spider.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('spiderArmored', 'assets/monsters/spiderArmored.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('crate', 'assets/squares/crate.png', { frameWidth: 79, frameHeight: 80 });\n        this.load.spritesheet('squareFire', 'assets/squares/squareFire.png', { frameWidth: 79, frameHeight: 80 });\n        this.load.spritesheet('fireDisappear', 'assets/squares/fireDisappear.png', { frameWidth: 84, frameHeight: 133 });\n    };\n    LevelEditor.prototype.create = function () {\n        pointer = this.input.activePointer;\n        var background = this.add.image(W_WIDTH / 2, W_HEIGHT / 2, 'background');\n        background.setScale(W_WIDTH / background.width);\n        cursors = this.input.keyboard.createCursorKeys();\n        this.matter.world.setBounds(0, 0, W_WIDTH, W_HEIGHT, 32, true, true, false, true);\n        this.cameras.main.setBounds(0, 0, W_WIDTH, W_HEIGHT);\n        var controlConfig = {\n            camera: this.cameras.main,\n            left: cursors.left,\n            right: cursors.right,\n            up: cursors.up,\n            down: cursors.down,\n            acceleration: 0.04,\n            drag: 0.0005,\n            maxSpeed: 0.7,\n        };\n        var gridConfig = {\n            scene: this,\n            cols: W_WIDTH / 50,\n            rows: W_HEIGHT / 50,\n        };\n        aGrid = new alignGrid_1.default(gridConfig);\n        controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);\n        new levelEditorButton_1.default(550, 150, 'Clump', '#fff', 'clump', this);\n        var menuNames = ['Clear', 'Crate', 'Lava', 'Dirt', 'Steel', 'Lizard', 'Spider', 'Player', 'Armored\\n Spider'];\n        var menuSelects = ['clear', 'crate', 'lava', 'dirt', 'steel', 'lizard', 'spider', 'player', 'spiderArmored'];\n        var menuButtons = [];\n        for (var i = 0; i < 8; i++) {\n            menuButtons.push(new levelEditorButton_1.default(550, 200 + i * 36, menuNames[i], '#fff', menuSelects[i], this));\n        }\n        // const crateButton = new LevelEditorButton(550, , 'Crate', '#fff', 'crate', this);\n        // const lavaButton = new LevelEditorButton(550, 236, 'Lava', '#fff', 'lava', this);\n        // const dirtButton = new LevelEditorButton(550, 272, 'Dirt', '#fff', 'dirt', this);\n        // const steelButton = new LevelEditorButton(550, 308, 'Steel', '#fff', 'steel', this);\n        // const lizardButton = new LevelEditorButton(550, 308, 'Lizard', '#fff', 'lizard', this);\n        // const spiderButton = new LevelEditorButton(550, 308, 'Spider', '#fff', 'spider', this);\n        // const armorSpiderButton = new LevelEditorButton(550, 308, 'Armored Spider', '#fff', 'spiderArmored', this);\n        // const playerButton = new LevelEditorButton(550, 308, 'Player', '#fff', 'player', this);\n    };\n    LevelEditor.prototype.update = function (time, delta) {\n        controls.update(delta);\n        aGrid.show();\n        if (pointer.isDown) {\n            if (this.selected == 'clump') {\n            }\n            else if (!this.onButton) {\n                aGrid.placeAt(pointer.worldX, pointer.worldY, this.selected, this);\n            }\n        }\n    };\n    return LevelEditor;\n}(Phaser.Scene));\nexports.LevelEditor = LevelEditor;\n\n\n//# sourceURL=webpack:///./src/scenes/level-editor-scene.ts?");

/***/ })

})