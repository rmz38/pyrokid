webpackHotUpdate("app",{

/***/ "./src/helpers.ts":
/*!************************!*\
  !*** ./src/helpers.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.getGameHeight = exports.getGameWidth = void 0;\nvar getGameWidth = function (scene) {\n    return scene.game.scale.width;\n};\nexports.getGameWidth = getGameWidth;\nvar getGameHeight = function (scene) {\n    return scene.game.scale.height;\n};\nexports.getGameHeight = getGameHeight;\nvar AlignGrid = /** @class */ (function () {\n    function AlignGrid(config) {\n        this.tile_size = 50;\n        if (!config.scene) {\n            console.log('missing scene!');\n            return;\n        }\n        if (!config.rows) {\n            console.log('no rows given wee woo');\n        }\n        if (!config.cols) {\n            console.log('no columns given wee woo');\n        }\n        this.h = config.height;\n        this.w = config.width;\n        this.rows = config.rows;\n        this.cols = config.cols;\n        this.scene = config.scene;\n    }\n    return AlignGrid;\n}());\n\n\n//# sourceURL=webpack:///./src/helpers.ts?");

/***/ }),

/***/ "./src/scenes/boot-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/boot-scene.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.BootScene = void 0;\nvar helpers_1 = __webpack_require__(/*! ../helpers */ \"./src/helpers.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'Boot',\n};\n/**\n * The initial scene that loads all necessary assets to the game and displays a loading bar.\n */\nvar BootScene = /** @class */ (function (_super) {\n    __extends(BootScene, _super);\n    function BootScene() {\n        return _super.call(this, sceneConfig) || this;\n    }\n    BootScene.prototype.preload = function () {\n        var _this = this;\n        var halfWidth = helpers_1.getGameWidth(this) * 0.5;\n        var halfHeight = helpers_1.getGameHeight(this) * 0.5;\n        var progressBarHeight = 100;\n        var progressBarWidth = 400;\n        var progressBarContainer = this.add.rectangle(halfWidth, halfHeight, progressBarWidth, progressBarHeight, 0x000000);\n        var progressBar = this.add.rectangle(halfWidth + 20 - progressBarContainer.width * 0.5, halfHeight, 10, progressBarHeight - 20, 0x888888);\n        var loadingText = this.add.text(halfWidth - 75, halfHeight - 100, 'Loading...').setFontSize(24);\n        var percentText = this.add.text(halfWidth - 25, halfHeight, '0%').setFontSize(24);\n        var assetText = this.add.text(halfWidth - 25, halfHeight + 100, '').setFontSize(24);\n        this.load.on('progress', function (value) {\n            progressBar.width = (progressBarWidth - 30) * value;\n            var percent = value * 100;\n            percentText.setText(percent + \"%\");\n        });\n        this.load.on('fileprogress', function (file) {\n            assetText.setText(file.key);\n        });\n        this.load.on('complete', function () {\n            loadingText.destroy();\n            percentText.destroy();\n            assetText.destroy();\n            progressBar.destroy();\n            progressBarContainer.destroy();\n            _this.scene.start('MainMenu');\n        });\n        this.loadAssets();\n    };\n    /**\n     * All assets that need to be loaded by the game (sprites, images, animations, tiles, music, etc)\n     * should be added to this method. Once loaded in, the loader will keep track of them, indepedent of which scene\n     * is currently active, so they can be accessed anywhere.\n     */\n    BootScene.prototype.loadAssets = function () {\n        // Load sample assets\n        // Source: Open Game Art\n        this.load.image('man', 'assets/sprites/character.png');\n    };\n    return BootScene;\n}(Phaser.Scene));\nexports.BootScene = BootScene;\n\n\n//# sourceURL=webpack:///./src/scenes/boot-scene.ts?");

/***/ })

})