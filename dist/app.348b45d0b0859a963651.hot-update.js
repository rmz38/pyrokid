webpackHotUpdate("app",{

/***/ "./src/helpers.ts":
/*!************************!*\
  !*** ./src/helpers.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.getGameHeight = exports.getGameWidth = void 0;\nvar getGameWidth = function (scene) {\n    return scene.game.scale.width;\n};\nexports.getGameWidth = getGameWidth;\nvar getGameHeight = function (scene) {\n    return scene.game.scale.height;\n};\nexports.getGameHeight = getGameHeight;\n\n\n//# sourceURL=webpack:///./src/helpers.ts?");

/***/ }),

/***/ "./src/scenes/boot-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/boot-scene.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.BootScene = void 0;\nvar helpers_1 = __webpack_require__(/*! ../helpers */ \"./src/helpers.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'Boot',\n};\n/**\n * The initial scene that loads all necessary assets to the game and displays a loading bar.\n */\nvar BootScene = /** @class */ (function (_super) {\n    __extends(BootScene, _super);\n    function BootScene() {\n        return _super.call(this, sceneConfig) || this;\n    }\n    BootScene.prototype.preload = function () {\n        var _this = this;\n        var halfWidth = helpers_1.getGameWidth(this) * 0.5;\n        var halfHeight = helpers_1.getGameHeight(this) * 0.5;\n        var progressBarHeight = 100;\n        var progressBarWidth = 400;\n        var progressBarContainer = this.add.rectangle(halfWidth, halfHeight, progressBarWidth, progressBarHeight, 0x000000);\n        var progressBar = this.add.rectangle(halfWidth + 20 - progressBarContainer.width * 0.5, halfHeight, 10, progressBarHeight - 20, 0x888888);\n        var loadingText = this.add.text(halfWidth - 75, halfHeight - 100, 'Loading...').setFontSize(24);\n        var percentText = this.add.text(halfWidth - 25, halfHeight, '0%').setFontSize(24);\n        var assetText = this.add.text(halfWidth - 25, halfHeight + 100, '').setFontSize(24);\n        this.load.on('progress', function (value) {\n            progressBar.width = (progressBarWidth - 30) * value;\n            var percent = value * 100;\n            percentText.setText(percent + \"%\");\n        });\n        this.load.on('fileprogress', function (file) {\n            assetText.setText(file.key);\n        });\n        this.load.on('complete', function () {\n            loadingText.destroy();\n            percentText.destroy();\n            assetText.destroy();\n            progressBar.destroy();\n            progressBarContainer.destroy();\n            _this.scene.start('MainMenu');\n        });\n        this.loadAssets();\n    };\n    /**\n     * All assets that need to be loaded by the game (sprites, images, animations, tiles, music, etc)\n     * should be added to this method. Once loaded in, the loader will keep track of them, indepedent of which scene\n     * is currently active, so they can be accessed anywhere.\n     */\n    BootScene.prototype.loadAssets = function () {\n        // Load sample assets\n        // Source: Open Game Art\n        this.load.image('man', 'assets/sprites/character.png');\n    };\n    return BootScene;\n}(Phaser.Scene));\nexports.BootScene = BootScene;\n\n\n//# sourceURL=webpack:///./src/scenes/boot-scene.ts?");

/***/ }),

/***/ "./src/scenes/level-editor-scene.ts":
/*!******************************************!*\
  !*** ./src/scenes/level-editor-scene.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.LevelEditor = void 0;\nvar helpers_1 = __webpack_require__(/*! ../helpers */ \"./src/helpers.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'LevelEditor',\n};\nvar W_WIDTH = 1200;\nvar W_HEIGHT = 600;\nvar CAMERA_SPEED = 8;\nvar cursors;\nvar controls;\nvar grid;\nvar pointer;\nvar aGrid;\nvar LevelEditor = /** @class */ (function (_super) {\n    __extends(LevelEditor, _super);\n    function LevelEditor() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        return _this;\n    }\n    LevelEditor.prototype.preload = function () {\n        this.load.image('background', 'assets/backgrounds/level-editor.png');\n        this.load.image('ground', 'assets/squares/platform.png');\n        this.load.image('house', 'assets/squares/house.png');\n        this.load.image('dirtTile', 'assets/squares/dirtTile.png');\n        this.load.image('steelTile', 'assets/squares/steelTile.png');\n        this.load.image('lavaTile', 'assets/squares/lavaTile.png');\n        this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 38, frameHeight: 19 });\n        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });\n        this.load.spritesheet('lizard', 'assets/monsters/lizard.png', { frameWidth: 70, frameHeight: 50 });\n        this.load.spritesheet('spider', 'assets/monsters/spider.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('spiderArmored', 'assets/monsters/spiderArmored.png', { frameWidth: 77, frameHeight: 61 });\n        this.load.spritesheet('crate', 'assets/squares/crate.png', { frameWidth: 79, frameHeight: 80 });\n        this.load.spritesheet('squareFire', 'assets/squares/squareFire.png', { frameWidth: 79, frameHeight: 80 });\n        this.load.spritesheet('fireDisappear', 'assets/squares/fireDisappear.png', { frameWidth: 84, frameHeight: 133 });\n    };\n    LevelEditor.prototype.create = function () {\n        pointer = this.input.activePointer;\n        var background = this.add.image(W_WIDTH / 2, W_HEIGHT / 2, 'background');\n        background.setScale(W_WIDTH / background.width);\n        cursors = this.input.keyboard.createCursorKeys();\n        this.matter.world.setBounds(0, 0, W_WIDTH, W_HEIGHT, 32, true, true, false, true);\n        var controlConfig = {\n            camera: this.cameras.main,\n            left: cursors.left,\n            right: cursors.right,\n            up: cursors.up,\n            down: cursors.down,\n            acceleration: 0.04,\n            drag: 0.0005,\n            maxSpeed: 0.7,\n        };\n        var gridConfig = {\n            scene: this,\n            cols: W_WIDTH / 50,\n            rows: W_HEIGHT / 50,\n        };\n        aGrid = new helpers_1.default(gridConfig);\n        aGrid.show();\n        controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);\n        this.cameras.main.setBounds(0, 0, W_WIDTH, W_HEIGHT);\n    };\n    LevelEditor.prototype.update = function (time, delta) {\n        controls.update(delta);\n        if (pointer.isDown) {\n            aGrid.placeAt(pointer.worldX, pointer.worldY, 'lavaTile', this);\n        }\n    };\n    return LevelEditor;\n}(Phaser.Scene));\nexports.LevelEditor = LevelEditor;\n\n\n//# sourceURL=webpack:///./src/scenes/level-editor-scene.ts?");

/***/ })

})