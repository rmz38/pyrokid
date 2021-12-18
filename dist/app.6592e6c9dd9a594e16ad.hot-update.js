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

/***/ "./src/scenes/main-menu-scene.ts":
/*!***************************************!*\
  !*** ./src/scenes/main-menu-scene.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.MainMenuScene = void 0;\nvar menu_button_1 = __webpack_require__(/*! ../ui/menu-button */ \"./src/ui/menu-button.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'MainMenu',\n};\n/**\n * The initial scene that starts, shows the splash screens, and loads the necessary assets.\n */\nvar MainMenuScene = /** @class */ (function (_super) {\n    __extends(MainMenuScene, _super);\n    function MainMenuScene() {\n        return _super.call(this, sceneConfig) || this;\n    }\n    MainMenuScene.prototype.preload = function () {\n        this.load.json('leveleditorlevel', 'assets/levels/leveleditor.json');\n        // this.load.json('level' + localStorage.getItem('level'), 'assets/levels/' + localStorage.getItem('level') + '.json');\n    };\n    MainMenuScene.prototype.create = function () {\n        var _this = this;\n        this.add\n            .text(100, 50, 'Pyrokid', {\n            color: '#FFFFFF',\n        })\n            .setFontSize(24);\n        localStorage.setItem('useleveleditor', 'false');\n        new menu_button_1.MenuButton(this, 100, 150, 'Level Select', function () {\n            localStorage.setItem('useleveleditor', 'false');\n            _this.scene.start('LevelSelect');\n        });\n        new menu_button_1.MenuButton(this, 100, 250, 'Level Editor', function () {\n            localStorage.setItem('leveleditorlevel', JSON.stringify(_this.cache.json.get('leveleditorlevel')));\n            _this.scene.start('LevelEditor');\n        });\n        new menu_button_1.MenuButton(this, 100, 350, 'Help', function () { return console.log('help button clicked'); });\n    };\n    return MainMenuScene;\n}(Phaser.Scene));\nexports.MainMenuScene = MainMenuScene;\n\n\n//# sourceURL=webpack:///./src/scenes/main-menu-scene.ts?");

/***/ })

})