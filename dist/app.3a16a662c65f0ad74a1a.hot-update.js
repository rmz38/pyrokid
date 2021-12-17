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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar main_menu_scene_1 = __webpack_require__(/*! ./main-menu-scene */ \"./src/scenes/main-menu-scene.ts\");\nvar boot_scene_1 = __webpack_require__(/*! ./boot-scene */ \"./src/scenes/boot-scene.ts\");\nvar game_scene_1 = __webpack_require__(/*! ./game-scene */ \"./src/scenes/game-scene.ts\");\nvar level_editor_scene_1 = __webpack_require__(/*! ./level-editor-scene */ \"./src/scenes/level-editor-scene.ts\");\nvar level_select_scene_1 = __webpack_require__(/*! ./level-select-scene */ \"./src/scenes/level-select-scene.ts\");\nexports.default = [boot_scene_1.BootScene, main_menu_scene_1.MainMenuScene, game_scene_1.GameScene, level_editor_scene_1.LevelEditor, level_select_scene_1.LevelSelect];\n\n\n//# sourceURL=webpack:///./src/scenes/index.ts?");

/***/ })

})