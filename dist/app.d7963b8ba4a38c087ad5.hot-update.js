webpackHotUpdate("app",{

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.game = void 0;\nvar Phaser = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\nvar scenes_1 = __webpack_require__(/*! ./scenes */ \"./src/scenes/index.ts\");\nvar phaser3_planck_1 = __webpack_require__(/*! phaser3-planck */ \"./node_modules/phaser3-planck/index.js\");\n// type:  Phaser.AUTO,\n//     width: 640,\n//     height: 480,\n//     plugins: {\n//         scene: [\n//             { key: 'PhaserPlanck', plugin: PhaserPlanck, mapping: 'planck' }\n//         ]\n//     },\n//     physics: {\n//         planck: {\n//             debug: false,\n//             scaleFactor: 30,\n//             gravity: {\n//                 x: 0,\n//                 y: 3\n//             }\n//         }\n//     },\n// \tscene: []\n// };\nvar gameConfig = {\n    title: 'Sample',\n    type: Phaser.WEBGL,\n    canvas: document.querySelector('#canvas'),\n    antialias: true,\n    pixelArt: false,\n    scale: {\n        width: 800,\n        height: 600,\n    },\n    plugins: {\n        scene: [\n            { key: 'PhaserPlanck', plugin: phaser3_planck_1.default, mapping: 'planck' }\n        ]\n    },\n    scene: scenes_1.default,\n    physics: {\n        //@ts-ignore\n        planck: {\n            debug: false,\n            scaleFactor: 30,\n            gravity: {\n                x: 0,\n                y: 3\n            }\n        }\n    },\n    parent: 'game',\n    backgroundColor: '#000000',\n};\nexports.game = new Phaser.Game(gameConfig);\nwindow.addEventListener('resize', function () {\n    exports.game.scale.refresh();\n});\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ })

})