webpackHotUpdate("app",{

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.game = void 0;\nvar Phaser = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\nvar scenes_1 = __webpack_require__(/*! ./scenes */ \"./src/scenes/index.ts\");\nvar gameConfig = {\n    title: 'Sample',\n    type: Phaser.AUTO,\n    scale: {\n        width: 800,\n        height: 600,\n    },\n    scene: scenes_1.default,\n    physics: {\n        default: 'arcade',\n        arcade: {\n            gravity: { y: 300 },\n            debug: true,\n            tileBias: 70\n        },\n    },\n    parent: 'game',\n    backgroundColor: '#000000',\n};\nexports.game = new Phaser.Game(gameConfig);\nwindow.addEventListener('resize', function () {\n    exports.game.scale.refresh();\n});\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ })

})