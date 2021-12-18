webpackHotUpdate("app",{

/***/ "./src/helpers/levelEditorButton.ts":
/*!******************************************!*\
  !*** ./src/helpers/levelEditorButton.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar menu_button_1 = __webpack_require__(/*! ../ui/menu-button */ \"./src/ui/menu-button.ts\");\n// function handleUpload(e) {\n//   const reader = new FileReader();\n//   reader.readAsText(e.target.files[0]);\n//   reader.onload = function (json) {\n//     localStorage.set('leveleditorlevel', JSON.parse(JSON.stringify(json)));\n//   };\n// }\n// const loader = document.getElementById('levelLoader');\n// loader.addEventListener('change', handleUpload, false);\nvar LevelEditorButton = /** @class */ (function () {\n    function LevelEditorButton(x, y, text, color, select, game) {\n        var _this = this;\n        function handleUpload(e) {\n            localStorage.setItem('upload', 'true');\n            var reader = new FileReader();\n            reader.readAsText(e.target.files[0]);\n            reader.onload = function (json) {\n                localStorage.setItem('leveleditorlevel', JSON.stringify(json.target.result));\n                game.scene.restart();\n            };\n        }\n        var loader = document.getElementById('levelLoader');\n        loader.addEventListener('change', handleUpload, false);\n        var button = new menu_button_1.MenuButton(game, x, y, text, function () {\n            if (select == 'start') {\n                game.generateJson(true);\n            }\n            else if (select == 'download') {\n                game.generateJson(false);\n            }\n            else if (select == 'upload') {\n                loader.click();\n            }\n            else {\n                game.selected = select;\n            }\n            game.buttons.forEach(function (e) {\n                e.button.pressed = false;\n                e.button.enterMenuButtonRestState();\n            });\n            _this.button.pressed = true;\n            _this.button.enterMenuButtonActiveState();\n        }, 75, 10, 10);\n        button.on('pointerover', function () {\n            game.onButton = true;\n        });\n        // button.on('pointerdown', () => {\n        //   if (select == 'download') {\n        //     game.generateJson();\n        //   } else {\n        //     game.selected = select;\n        //   }\n        // });\n        button.on('pointerout', function () {\n            game.onButton = false;\n        });\n        button.setDepth(1);\n        this.button = button;\n    }\n    return LevelEditorButton;\n}());\nexports.default = LevelEditorButton;\n\n\n//# sourceURL=webpack:///./src/helpers/levelEditorButton.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.game = void 0;\nvar Phaser = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\nvar scenes_1 = __webpack_require__(/*! ./scenes */ \"./src/scenes/index.ts\");\nvar gameConfig = {\n    title: 'Pyrokid',\n    type: Phaser.AUTO,\n    scale: {\n        width: 800,\n        height: 600,\n    },\n    scene: scenes_1.default,\n    physics: {\n        default: 'matter',\n        matter: {\n            enableSleeping: false,\n            debug: false,\n        },\n    },\n    parent: 'game',\n    backgroundColor: '#000000',\n};\nexports.game = new Phaser.Game(gameConfig);\nwindow.addEventListener('resize', function () {\n    exports.game.scale.refresh();\n});\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ })

})