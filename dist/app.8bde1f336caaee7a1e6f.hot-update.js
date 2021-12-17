webpackHotUpdate("app",{

/***/ "./src/scenes/game-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/game-scene.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.GameScene = void 0;\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'Game',\n};\nvar player;\nvar platforms;\nvar cursors;\nvar wasd;\nvar crates = {};\nvar touchingGround = true;\nvar fire;\nvar fireActive = false;\nfunction igniteCrate(crateLabel, destroyFire) {\n    if (destroyFire) {\n        fire.destroy();\n    }\n    crates[crateLabel].onFire = true;\n    setTimeout(function () {\n        crates[crateLabel].crate.destroy();\n    }, 1000);\n}\nvar GameScene = /** @class */ (function (_super) {\n    __extends(GameScene, _super);\n    function GameScene() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        return _this;\n    }\n    GameScene.prototype.preload = function () {\n        this.load.image('background', 'assets/backgrounds/TutorialBackground1.png');\n        this.load.image('ground', 'assets/platform.png');\n        this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 38, frameHeight: 19 });\n        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });\n        this.load.spritesheet('crate', 'assets/crate.png', { frameWidth: 79, frameHeight: 80 });\n        this.load.spritesheet('squareFire', 'assets/squareFire.png', { frameWidth: 79, frameHeight: 80 });\n    };\n    GameScene.prototype.create = function () {\n        this.add.image(400, 300, 'background');\n        var rec = this.matter.bodies.rectangle(0, 24, 20, 1, { isSensor: true, label: 'groundSensor' });\n        this.matter.world.setBounds(0, 0, 800, 600, 32, true, true, false, true);\n        platforms = this.matter.add.sprite(400, 568, 'ground');\n        var playerBody = this.matter.bodies.rectangle(0, 0, 32, 48);\n        var compound = this.matter.body.create({\n            parts: [playerBody, rec],\n            inertia: Infinity,\n            render: { sprite: { xOffset: 0.5, yOffset: 0.5 } },\n        });\n        player = this.matter.add.sprite(0, 0, 'dude');\n        player.setExistingBody(compound);\n        player.body.render.sprite.xOffset = 0;\n        player.body.render.sprite.yOffset = 0;\n        player.setPosition(100, 450);\n        this.anims.create({\n            key: 'left',\n            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),\n            frameRate: 10,\n            repeat: -1,\n        });\n        this.anims.create({\n            key: 'turn',\n            frames: [{ key: 'dude', frame: 4 }],\n            frameRate: 20,\n        });\n        this.anims.create({\n            key: 'right',\n            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),\n            frameRate: 10,\n            repeat: -1,\n        });\n        this.anims.create({\n            key: 'cratepic',\n            frames: this.anims.generateFrameNumbers('crate', { start: 0, end: 0 }),\n            frameRate: 10,\n            repeat: -1,\n        });\n        this.anims.create({\n            key: 'squareFire',\n            frames: this.anims.generateFrameNumbers('squareFire', { start: 0, end: 5 }),\n            frameRate: 10,\n            repeat: -1,\n        });\n        this.anims.create({\n            key: 'fireball',\n            frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 1 }),\n            frameRate: 10,\n            repeat: -1,\n        });\n        cursors = this.input.keyboard.createCursorKeys();\n        wasd = this.input.keyboard.addKeys('W,S,A,D');\n        for (var i = 0; i < 10; i += 1) {\n            var label = 'crate_' + i;\n            crates[label] = {\n                crate: this.matter.add.sprite(400, 300 + i * 60, 'crate', null, { label: label }),\n                onFire: false,\n                fixtures: [],\n            };\n            crates[label].crate.setRectangle(50, 50, { render: { sprite: { xOffset: 0, yOffset: 0.15 } }, label: label });\n            crates[label].crate.setBounce(0);\n            // hash instead\n        }\n        this.matter.world.on('collisionstart', function (event) {\n            //  Loop through all of the collision pairs\n            var pairs = event.pairs;\n            for (var i = 0; i < pairs.length; i++) {\n                var bodyA = pairs[i].bodyA;\n                var bodyB = pairs[i].bodyB;\n                console.log(pairs[i]);\n                //  sensor collisions\n                if (pairs[i].isSensor) {\n                    var playerBody_1 = void 0;\n                    var otherBody = void 0;\n                    if (bodyA.isSensor) {\n                        playerBody_1 = bodyA;\n                        otherBody = bodyB;\n                    }\n                    else if (bodyB.isSensor) {\n                        playerBody_1 = bodyB;\n                        otherBody = bodyB;\n                    }\n                    if (playerBody_1.label === 'groundSensor' && otherBody.label != 'fire') {\n                        touchingGround = true;\n                    }\n                }\n                // fire collision\n                if (bodyA.label === 'fire' && bodyB.label.includes('crate')) {\n                    igniteCrate(bodyB.label, true);\n                }\n                if (bodyB.label === 'fire' && bodyA.label.includes('crate')) {\n                    igniteCrate(bodyA.label, true);\n                }\n            }\n        });\n    };\n    GameScene.prototype.update = function () {\n        if (wasd.A.isDown) {\n            player.setVelocityX(-7);\n            player.anims.play('left', true);\n        }\n        else if (wasd.D.isDown) {\n            player.setVelocityX(7);\n            player.anims.play('right', true);\n        }\n        else {\n            player.setVelocityX(0);\n            player.anims.play('turn');\n        }\n        if (wasd.W.isDown && touchingGround) {\n            player.setVelocityY(-10);\n            touchingGround = false;\n        }\n        if ((cursors.right.isDown || cursors.down.isDown || cursors.up.isDown || cursors.left.isDown) &&\n            fireActive === false) {\n            fire = this.matter.add.sprite(player.body.position.x, player.body.position.y, 'fireball', null, {\n                isSensor: true,\n                label: 'fire',\n            });\n            fire.anims.play('fireball', true);\n            fire.setIgnoreGravity(true);\n            var xDir = cursors.right.isDown ? 1 : -1;\n            var xVel = cursors.right.isDown || cursors.left.isDown ? 10 : 0;\n            fire.setVelocityX(xVel * xDir);\n            var yDir = cursors.down.isDown ? 1 : -1;\n            var yVel = cursors.down.isDown || cursors.up.isDown ? 10 : 0;\n            fire.setVelocityY(yVel * yDir);\n            fireActive = true;\n            setTimeout(function () {\n                if (fireActive) {\n                    fireActive = false;\n                    fire.destroy();\n                }\n            }, 500);\n        }\n    };\n    return GameScene;\n}(Phaser.Scene));\nexports.GameScene = GameScene;\n\n\n//# sourceURL=webpack:///./src/scenes/game-scene.ts?");

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