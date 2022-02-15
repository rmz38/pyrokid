webpackHotUpdate("app",{

/***/ "./src/helpers/collision-controller.ts":
false,

/***/ "./src/helpers/init.ts":
false,

/***/ "./src/helpers/levelEditorButton.ts":
/*!******************************************!*\
  !*** ./src/helpers/levelEditorButton.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar menu_button_1 = __webpack_require__(/*! ../ui/menu-button */ \"./src/ui/menu-button.ts\");\n// function handleUpload(e) {\n//   const reader = new FileReader();\n//   reader.readAsText(e.target.files[0]);\n//   reader.onload = function (json) {\n//     localStorage.set('leveleditorlevel', JSON.parse(JSON.stringify(json)));\n//   };\n// }\n// const loader = document.getElementById('levelLoader');\n// loader.addEventListener('change', handleUpload, false);\nvar LevelEditorButton = /** @class */ (function () {\n    function LevelEditorButton(x, y, text, color, select, game) {\n        var _this = this;\n        function handleUpload(e) {\n            localStorage.setItem('upload', 'true');\n            var reader = new FileReader();\n            reader.readAsText(e.target.files[0]);\n            reader.onload = function (json) {\n                localStorage.setItem('leveleditorlevel', JSON.stringify(json.target.result));\n                game.scene.restart();\n            };\n        }\n        var loader = document.getElementById('levelLoader');\n        loader.addEventListener('change', handleUpload, false);\n        var button = new menu_button_1.MenuButton(game, x, y, text, function () {\n            if (select == 'start') {\n                game.generateJson(true);\n            }\n            else if (select == 'download') {\n                game.generateJson(false);\n            }\n            else if (select == 'upload') {\n                loader.click();\n            }\n            else {\n                game.selected = select;\n            }\n            game.buttons.forEach(function (e) {\n                e.button.pressed = false;\n                e.button.enterMenuButtonRestState();\n            });\n            _this.button.pressed = true;\n            _this.button.enterMenuButtonActiveState();\n        }, 75, 10, 10);\n        button.on('pointerover', function () {\n            game.onButton = true;\n        });\n        // button.on('pointerdown', () => {\n        //   if (select == 'download') {\n        //     game.generateJson();\n        //   } else {\n        //     game.selected = select;\n        //   }\n        // });\n        button.on('pointerout', function () {\n            game.onButton = false;\n        });\n        button.setDepth(1);\n        this.button = button;\n    }\n    return LevelEditorButton;\n}());\nexports.default = LevelEditorButton;\n\n\n//# sourceURL=webpack:///./src/helpers/levelEditorButton.ts?");

/***/ }),

/***/ "./src/objects/bomb.ts":
false,

/***/ "./src/objects/compoundCrate.ts":
false,

/***/ "./src/objects/connector.ts":
false,

/***/ "./src/objects/crate.ts":
false,

/***/ "./src/objects/dirt.ts":
false,

/***/ "./src/objects/exit.ts":
false,

/***/ "./src/objects/lizard.ts":
false,

/***/ "./src/objects/player.ts":
false,

/***/ "./src/objects/spider.ts":
false,

/***/ "./src/objects/steel.ts":
false,

/***/ "./src/scenes/game-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/game-scene.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (78:8)\\nFile was processed with these loaders:\\n * ./node_modules/ts-loader/index.js\\nYou may need an additional loader to handle the result of these loaders.\\n|             : this.cache.json.get('level' + localStorage.getItem('level'));\\n|         world_bound_width =\\n>         ;\\n|         var background = this.add.tileSprite(world_bound_width / 2, world_bound_height / 2, world_bound_width, world_bound_height, 'backgroundDirt');\\n|         // background.setScale(world_bound_width / background.width);\");\n\n//# sourceURL=webpack:///./src/scenes/game-scene.ts?");

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