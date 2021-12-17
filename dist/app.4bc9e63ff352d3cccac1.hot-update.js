webpackHotUpdate("app",{

/***/ "./src/scenes/game-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/game-scene.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.GameScene = void 0;\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'Game',\n};\nvar Arcade = Phaser.Physics.Arcade;\nvar player;\nvar stars;\nvar platforms;\nvar cursors;\nvar wasd;\nvar ground;\nvar movingPlatform;\nvar crate;\nvar crates = [];\nvar test = [];\nvar touchingGround = true;\nfunction collectStar(player, star) {\n    star.disableBody(true, true);\n}\nvar GameScene = /** @class */ (function (_super) {\n    __extends(GameScene, _super);\n    //   private player;\n    //   private stars;\n    //   private platforms;\n    //   private cursors;\n    //   private movingPlatform;\n    function GameScene() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        return _this;\n    }\n    GameScene.prototype.preload = function () {\n        this.load.image('sky', 'assets/sky.png');\n        this.load.image('ground', 'assets/platform.png');\n        this.load.image('star', 'assets/star.png');\n        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });\n        this.load.spritesheet('crate', 'assets/crate.png', { frameWidth: 79, frameHeight: 80 });\n    };\n    GameScene.prototype.create = function () {\n        this.add.image(400, 300, 'sky');\n        var rec = this.matter.bodies.rectangle(0, 24, 20, 1, { isSensor: true, label: 'groundSensor' });\n        this.matter.world.setBounds(0, 0, 800, 600, 32, true, true, false, true);\n        platforms = this.matter.add.sprite(400, 568, 'ground');\n        var playerBody = this.matter.bodies.rectangle(0, 0, 32, 48);\n        var compound = this.matter.body.create({\n            parts: [playerBody, rec],\n            inertia: Infinity,\n            render: { sprite: { xOffset: .5, yOffset: .5 } }\n        });\n        player = this.matter.add.sprite(0, 0, 'dude');\n        console.log(this);\n        player.setExistingBody(compound);\n        player.body.render.sprite.xOffset = 0;\n        player.body.render.sprite.yOffset = 0;\n        player.setPosition(100, 450);\n        this.anims.create({\n            key: 'left',\n            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),\n            frameRate: 10,\n            repeat: -1\n        });\n        this.anims.create({\n            key: 'turn',\n            frames: [{ key: 'dude', frame: 4 }],\n            frameRate: 20\n        });\n        this.anims.create({\n            key: 'right',\n            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),\n            frameRate: 10,\n            repeat: -1\n        });\n        this.anims.create({\n            key: 'cratepic',\n            frames: this.anims.generateFrameNumbers('crate', { start: 0, end: 0 }),\n            frameRate: 10,\n            repeat: -1\n        });\n        cursors = this.input.keyboard.createCursorKeys();\n        wasd = this.input.keyboard.addKeys('W,S,A,D');\n        // stars = this.matter.add.group({\n        //     key: 'star',\n        //     repeat: 11,\n        //     setXY: { x: 12, y: 0, stepX: 70 }\n        // });\n        // stars.children.iterate(function (child) {\n        //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));\n        // });\n        // crates = this.physics.add.group({\n        //     key: 'crate',\n        //     frame: 0,\n        //     repeat: 7,\n        //     setXY: { x: 200, y: 500, stepX: 0, stepY: -48 }\n        // });\n        // let i = 0\n        // crates.children.iterate(function (child) {\n        //     child.body.setSize(48,48);\n        //     child.setOffset(15, 30);\n        //     child.setBounce(1);\n        //     test[i] = child\n        //     i += 1\n        // });\n        for (var i = 0; i < 10; i += 1) {\n            crates[i] = this.matter.add.sprite(400, 300 + i * 60, 'crate');\n            // crates[i].body.allowGravity = true;\n            crates[i].setRectangle(50, 50, { render: { sprite: { xOffset: 0, yOffset: 0.15 } } });\n            // this.physics.add.collider(player, crates[i]);\n            // this.physics.add.collider(crates[i], platforms);\n        }\n        this.matter.world.on('collisionstart', function (event) {\n            //  Loop through all of the collision pairs\n            var pairs = event.pairs;\n            for (var i = 0; i < pairs.length; i++) {\n                var bodyA = pairs[i].bodyA;\n                var bodyB = pairs[i].bodyB;\n                //  We only want sensor collisions\n                if (pairs[i].isSensor) {\n                    var blockBody = void 0;\n                    var playerBody_1 = void 0;\n                    if (bodyA.isSensor) {\n                        blockBody = bodyB;\n                        playerBody_1 = bodyA;\n                    }\n                    else if (bodyB.isSensor) {\n                        blockBody = bodyA;\n                        playerBody_1 = bodyB;\n                    }\n                    if (playerBody_1.label === 'groundSensor') {\n                        touchingGround = true;\n                    }\n                }\n            }\n        });\n    };\n    GameScene.prototype.update = function () {\n        // player.setRotation(0);\n        if (wasd.A.isDown) {\n            player.setVelocityX(-7);\n            player.anims.play('left', true);\n        }\n        else if (wasd.D.isDown) {\n            player.setVelocityX(7);\n            player.anims.play('right', true);\n        }\n        else {\n            player.setVelocityX(0);\n            player.anims.play('turn');\n        }\n        if (wasd.W.isDown && touchingGround) {\n            player.setVelocityY(-10);\n            touchingGround = false;\n        }\n        if (cursors.right.isDown) {\n            this.matter.add.image(player.position.x, player.position.y, 'star');\n        }\n    };\n    return GameScene;\n}(Phaser.Scene));\nexports.GameScene = GameScene;\n\n\n//# sourceURL=webpack:///./src/scenes/game-scene.ts?");

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