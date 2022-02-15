webpackHotUpdate("app",{

/***/ "./src/objects/connector.ts":
/*!**********************************!*\
  !*** ./src/objects/connector.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar crate_1 = __webpack_require__(/*! ./crate */ \"./src/objects/crate.ts\");\nvar Connector = /** @class */ (function () {\n    function Connector(obj1, obj2, game) {\n        var x1 = obj1.sprite.x;\n        var x2 = obj2.sprite.x;\n        var y1 = obj1.sprite.y;\n        var y2 = obj2.sprite.y;\n        var posx = (Math.max(x2, x1) - Math.min(x2, x1)) / 2;\n        var posy = (Math.max(y2, y1) - Math.min(y2, y1)) / 2;\n        var connector = game.matter.add.image(x2 + (x1 - x2) / 2, y2 + (y1 - y2) / 2, 'connector', null, {\n            isSensor: true,\n            ignoreGravity: true,\n        });\n        var constraints = [];\n        var px = x2 - x1 == 0;\n        var py = y2 - y1 == 0;\n        for (var p = 0; p < 1; p += 4) {\n            constraints.push(game.matter.add.joint(obj1.sprite.body, obj2.sprite.body, 0, 1, {\n                pointA: { x: px ? p : (x2 - x1) / 2, y: py ? p : (y2 - y1) / 2 },\n                pointB: { x: px ? p : (x1 - x2) / 2, y: py ? p : (y1 - y2) / 2 },\n                angularStiffness: 1,\n                stiffness: 1,\n                damping: 1,\n            }));\n        }\n        this.constraints = constraints;\n        if (x2 - x1 == 0) {\n            connector.angle = 90;\n        }\n        this.connectorPin = game.matter.add.joint(obj1.sprite.body, connector.body, 0, 1, {\n            pointA: { x: 0, y: 0 },\n            pointB: { x: (x1 - x2) / 2, y: (y1 - y2) / 2 },\n            angularStiffness: 1,\n            stiffness: 1,\n            damping: 1,\n        });\n        this.sprite = connector;\n        if (obj1 instanceof crate_1.default) {\n            obj1.connectors.add(this);\n        }\n        if (obj2 instanceof crate_1.default) {\n            obj2.connectors.add(this);\n        }\n    }\n    Connector.prototype.destroy = function (game) {\n        this.sprite.destroy();\n        this.constraints.forEach(function (e) {\n            console.log(e);\n            game.matter.world.removeConstraint(e);\n        });\n        game.matter.world.removeConstraint(this.connectorPin);\n    };\n    return Connector;\n}());\nexports.default = Connector;\n\n\n//# sourceURL=webpack:///./src/objects/connector.ts?");

/***/ }),

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
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.MainMenuScene = void 0;\nvar menu_button_1 = __webpack_require__(/*! ../ui/menu-button */ \"./src/ui/menu-button.ts\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'MainMenu',\n};\n/**\n * The initial scene that starts, shows the splash screens, and loads the necessary assets.\n */\nvar MainMenuScene = /** @class */ (function (_super) {\n    __extends(MainMenuScene, _super);\n    function MainMenuScene() {\n        return _super.call(this, sceneConfig) || this;\n    }\n    MainMenuScene.prototype.preload = function () {\n        this.load.json('leveleditorlevel', 'assets/levels/leveleditor.json');\n        // this.load.json('level' + localStorage.getItem('level'), 'assets/levels/' + localStorage.getItem('level') + '.json');\n    };\n    MainMenuScene.prototype.create = function () {\n        var _this = this;\n        var background = this.add.tileSprite(400, 300, 800, 600, 'backgroundDirt');\n        this.add\n            .text(100, 50, 'Pyrokid', {\n            color: '#FFFFFF',\n        })\n            .setFontSize(48);\n        localStorage.setItem('useleveleditor', 'false');\n        this.anims.create({\n            key: 'shootRight',\n            frames: this.anims.generateFrameNumbers('shoot', { start: 6, end: 9 }),\n            frameRate: 5,\n            repeat: -1,\n        });\n        this.anims.create({\n            key: 'screenfireball',\n            frames: this.anims.generateFrameNumbers('screenfireball', { start: 3, end: 5 }),\n            frameRate: 10,\n            repeat: -1,\n        });\n        var kid = this.add.sprite(400, 250, 'shoot');\n        kid.scaleX = 3;\n        kid.scaleY = 3;\n        kid.anims.play('shootRight');\n        for (var i = 0; i < 4; i++) {\n            for (var j = 0; j < 3; j++) {\n                var dirt = this.add.sprite(400 + j * 100, 350 + i * 100, 'dirt');\n                dirt.scaleX = 2;\n                dirt.scaleY = 2;\n            }\n        }\n        var fireball = this.add.sprite(600, 250, 'screenfireball');\n        fireball.scaleX = 3;\n        fireball.scaleY = 3;\n        fireball.anims.play('screenfireball');\n        new menu_button_1.MenuButton(this, 100, 150, 'Level Select', function () {\n            localStorage.setItem('useleveleditor', 'false');\n            _this.scene.start('LevelSelect');\n        });\n        new menu_button_1.MenuButton(this, 100, 250, 'Level Editor', function () {\n            // localStorage.setItem('leveleditorlevel', JSON.stringify(this.cache.json.get('leveleditorlevel')));\n            localStorage.setItem('upload', 'false');\n            _this.scene.start('LevelEditor');\n        });\n        new menu_button_1.MenuButton(this, 100, 350, 'Help', function () { return console.log('help button clicked'); });\n    };\n    return MainMenuScene;\n}(Phaser.Scene));\nexports.MainMenuScene = MainMenuScene;\n\n\n//# sourceURL=webpack:///./src/scenes/main-menu-scene.ts?");

/***/ })

})