webpackHotUpdate("app",{

/***/ "./src/scenes/game-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/game-scene.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.GameScene = void 0;\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'Game',\n};\nvar player;\nvar stars;\nvar platforms;\nvar cursors;\nvar ground;\nvar movingPlatform;\nvar crate;\nvar crates = [];\nvar test = [];\nvar touchingGround = true;\nfunction collectStar(player, star) {\n    star.disableBody(true, true);\n}\nvar GameScene = /** @class */ (function (_super) {\n    __extends(GameScene, _super);\n    //   private player;\n    //   private stars;\n    //   private platforms;\n    //   private cursors;\n    //   private movingPlatform;\n    function GameScene() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        return _this;\n    }\n    GameScene.prototype.preload = function () {\n        this.load.image('sky', 'assets/sky.png');\n        this.load.image('ground', 'assets/platform.png');\n        this.load.image('star', 'assets/star.png');\n        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });\n        this.load.spritesheet('crate', 'assets/crate.png', { frameWidth: 79, frameHeight: 80 });\n    };\n    GameScene.prototype.create = function () {\n        this.add.image(400, 300, 'sky');\n        this.matter.world.setBounds(0, 0, 800, 600, 32, true, true, false, true);\n        // this.physics.world.setFPS(120);\n        // platforms = this.physics.add.staticGroup();\n        // platforms.create(400, 568, 'ground').setScale(2).refreshBody();\n        platforms = this.matter.add.sprite(400, 568, 'ground');\n        // platforms.create(600, 400, 'ground');\n        // platforms.create(50, 250, 'ground');\n        // platforms.create(750, 220, 'ground');\n        player = this.matter.add.sprite(100, 450, 'dude');\n        console.log(player);\n        player.setOnCollideWith(platforms, function () {\n            console.log(player.body.position.y + player.displayHeight / 2);\n            console.log(platforms.body.position.y - platforms.displayHeight / 2);\n            if (player.body.position + player.body.displayHeight / 2 <= platforms.body.position - platforms.body.displayHeight / 2) {\n                touchingGround = true;\n            }\n        });\n        this.anims.create({\n            key: 'left',\n            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),\n            frameRate: 10,\n            repeat: -1\n        });\n        this.anims.create({\n            key: 'turn',\n            frames: [{ key: 'dude', frame: 4 }],\n            frameRate: 20\n        });\n        this.anims.create({\n            key: 'right',\n            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),\n            frameRate: 10,\n            repeat: -1\n        });\n        this.anims.create({\n            key: 'cratepic',\n            frames: this.anims.generateFrameNumbers('crate', { start: 0, end: 0 }),\n            frameRate: 10,\n            repeat: -1\n        });\n        cursors = this.input.keyboard.createCursorKeys();\n        // stars = this.matter.add.group({\n        //     key: 'star',\n        //     repeat: 11,\n        //     setXY: { x: 12, y: 0, stepX: 70 }\n        // });\n        // stars.children.iterate(function (child) {\n        //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));\n        // });\n        // crates = this.physics.add.group({\n        //     key: 'crate',\n        //     frame: 0,\n        //     repeat: 7,\n        //     setXY: { x: 200, y: 500, stepX: 0, stepY: -48 }\n        // });\n        // let i = 0\n        // crates.children.iterate(function (child) {\n        //     child.body.setSize(48,48);\n        //     child.setOffset(15, 30);\n        //     child.setBounce(1);\n        //     test[i] = child\n        //     i += 1\n        // });\n        // for(let i = 0; i < 10; i+= 1) {\n        //     crates[i] = this.matter.add.sprite(400, 300 + i * 60, 'crate')\n        //     // crates[i].body.allowGravity = true;\n        //     crates[i].setRectangle(50, 50, {render: {sprite: {xOffset: 0, yOffset: 0.15}}});\n        //     // this.physics.add.collider(player, crates[i]);\n        //     // this.physics.add.collider(crates[i], platforms);\n        // }\n        // this.physics.add.collider(player, platforms);\n        // this.physics.add.collider(player, movingPlatform);\n        // this.physics.add.collider(stars, platforms);\n        // this.physics.add.collider(stars, movingPlatform);\n        // this.physics.add.collider(crates, test);\n        // this.physics.add.collider(crates, platforms);\n        // this.physics.add.collider(crates, player);\n        // // this.physics.add.overlap(crates, crates, crateCollide, null, this)\n        // this.physics.add.overlap(player, stars, collectStar, null, this);\n    };\n    GameScene.prototype.update = function () {\n        player.setRotation(0);\n        if (cursors.left.isDown) {\n            player.setVelocityX(-7);\n            player.anims.play('left', true);\n        }\n        else if (cursors.right.isDown) {\n            player.setVelocityX(7);\n            player.anims.play('right', true);\n        }\n        else {\n            player.setVelocityX(0);\n            player.anims.play('turn');\n        }\n        if (cursors.up.isDown && touchingGround) {\n            player.setVelocityY(-10);\n            touchingGround = false;\n        }\n    };\n    return GameScene;\n}(Phaser.Scene));\nexports.GameScene = GameScene;\n\n\n//# sourceURL=webpack:///./src/scenes/game-scene.ts?");

/***/ }),

/***/ "./src/scenes/index.ts":
/*!*****************************!*\
  !*** ./src/scenes/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar main_menu_scene_1 = __webpack_require__(/*! ./main-menu-scene */ \"./src/scenes/main-menu-scene.ts\");\nvar boot_scene_1 = __webpack_require__(/*! ./boot-scene */ \"./src/scenes/boot-scene.ts\");\nvar game_scene_1 = __webpack_require__(/*! ./game-scene */ \"./src/scenes/game-scene.ts\");\nexports.default = [boot_scene_1.BootScene, main_menu_scene_1.MainMenuScene, game_scene_1.GameScene];\n\n\n//# sourceURL=webpack:///./src/scenes/index.ts?");

/***/ })

})