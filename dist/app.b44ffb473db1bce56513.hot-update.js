webpackHotUpdate("app",{

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.game = void 0;\nvar Phaser = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\nvar scenes_1 = __webpack_require__(/*! ./scenes */ \"./src/scenes/index.ts\");\nvar gameConfig = {\n    title: 'Sample',\n    type: Phaser.AUTO,\n    scale: {\n        width: 800,\n        height: 600,\n    },\n    scene: scenes_1.default,\n    physics: {\n        default: 'matter',\n        matter: {\n            enableSleeping: false,\n            debug: true,\n        },\n    },\n    parent: 'game',\n    backgroundColor: '#000000',\n};\nexports.game = new Phaser.Game(gameConfig);\nwindow.addEventListener('resize', function () {\n    exports.game.scale.refresh();\n});\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "./src/scenes/index.ts":
/*!*****************************!*\
  !*** ./src/scenes/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar main_menu_scene_1 = __webpack_require__(/*! ./main-menu-scene */ \"./src/scenes/main-menu-scene.ts\");\nvar boot_scene_1 = __webpack_require__(/*! ./boot-scene */ \"./src/scenes/boot-scene.ts\");\nvar game_scene_1 = __webpack_require__(/*! ./game-scene */ \"./src/scenes/game-scene.ts\");\nvar level_editor_scene_1 = __webpack_require__(/*! ./level-editor-scene */ \"./src/scenes/level-editor-scene.ts\");\nvar level_select_scene_1 = __webpack_require__(/*! ./level-select-scene */ \"./src/scenes/level-select-scene.ts\");\nexports.default = [boot_scene_1.BootScene, main_menu_scene_1.MainMenuScene, game_scene_1.GameScene, level_editor_scene_1.LevelEditor, level_select_scene_1.LevelSelectScene];\n\n\n//# sourceURL=webpack:///./src/scenes/index.ts?");

/***/ }),

/***/ "./src/scenes/level-select-scene.ts":
/*!******************************************!*\
  !*** ./src/scenes/level-select-scene.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.LevelSelectScene = void 0;\nvar menu_button_1 = __webpack_require__(/*! ../ui/menu-button */ \"./src/ui/menu-button.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'LevelSelect',\n};\n/**\n * The initial scene that starts, shows the splash screens, and loads the necessary assets.\n */\nvar LevelSelectScene = /** @class */ (function (_super) {\n    __extends(LevelSelectScene, _super);\n    function LevelSelectScene() {\n        return _super.call(this, sceneConfig) || this;\n    }\n    LevelSelectScene.prototype.create = function () {\n        var _this = this;\n        this.add\n            .text(100, 50, 'Level Select', {\n            color: '#FFFFFF',\n        })\n            .setFontSize(24);\n        localStorage.setItem('useleveleditor', 'false');\n        var counter = 0;\n        for (var i = 0; i < 4; i++) {\n            for (var j = 0; j < 5; j++) {\n                new menu_button_1.MenuButton(this, 100 + i * 50, 100 + j * 50, 'Level ' + counter, function () {\n                    localStorage.setItem('useleveleditor', 'false');\n                    localStorage.setItem('level', counter.toString());\n                    _this.scene.start('Game');\n                });\n                counter++;\n            }\n        }\n    };\n    return LevelSelectScene;\n}(Phaser.Scene));\nexports.LevelSelectScene = LevelSelectScene;\n\n\n//# sourceURL=webpack:///./src/scenes/level-select-scene.ts?");

/***/ })

})