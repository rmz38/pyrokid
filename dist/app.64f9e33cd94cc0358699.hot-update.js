webpackHotUpdate("app",{

/***/ "./src/scenes/game-scene.ts":
/*!**********************************!*\
  !*** ./src/scenes/game-scene.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.GameScene = void 0;\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'Game',\n};\nvar player;\nvar stars;\nvar platforms;\nvar cursors;\nvar ground;\nvar movingPlatform;\nvar crate;\nvar crates;\nvar test = [];\nfunction collectStar(player, star) {\n    star.disableBody(true, true);\n}\nfunction crateCollide(crate1, crate2) {\n    crate1.body.setVelocity(0, 0);\n    crate2.body.setVelocity(0, 0);\n}\nfunction createBox(posX, posY, width, height, isDynamic) {\n    // this is how we create a generic Box2D body\n    var box = this.planck.world.createBody();\n    if (isDynamic) {\n        // Box2D bodies born as static bodies, but we can make them dynamic\n        box.setDynamic();\n    }\n    // a body can have one or more fixtures. This is how we create a box fixture inside a body\n    box.createFixture(this.planck.Box(width / 2 / this.worldScale, height / 2 / this.worldScale));\n    // now we place the body in the world\n    box.setPosition(this.planck.Vec2(posX / this.worldScale, posY / this.worldScale));\n    // time to set mass information\n    box.setMassData({\n        mass: 1,\n        center: this.planck.Vec2(),\n        // I have to say I do not know the meaning of this \"I\", but if you set it to zero, bodies won't rotate\n        I: 1\n    });\n    // now we create a graphics object representing the body\n    var color = new Phaser.Display.Color();\n    color.random();\n    color.brighten(50).saturate(100);\n    var userData = this.add.graphics();\n    userData.fillStyle(color.color, 1);\n    userData.fillRect(-width / 2, -height / 2, width, height);\n    // a body can have anything in its user data, normally it's used to store its sprite\n    box.setUserData(userData);\n}\nvar GameScene = /** @class */ (function (_super) {\n    __extends(GameScene, _super);\n    //   private player;\n    //   private stars;\n    //   private platforms;\n    //   private cursors;\n    //   private movingPlatform;\n    function GameScene() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.speed = 200;\n        return _this;\n    }\n    GameScene.prototype.preload = function () {\n        this.load.image('sky', 'assets/sky.png');\n        this.load.image('ground', 'assets/platform.png');\n        this.load.image('star', 'assets/star.png');\n        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });\n        this.load.spritesheet('crate', 'assets/crate.png', { frameWidth: 79, frameHeight: 80 });\n    };\n    GameScene.prototype.create = function () {\n        this.add.image(400, 300, 'sky');\n        // this.physics.world.setFPS(120);\n        console.log(this);\n        platforms.create(400, 568, 'ground').setScale(2).refreshBody();\n        platforms.create(600, 400, 'ground');\n        platforms.create(50, 250, 'ground');\n        platforms.create(750, 220, 'ground');\n        player = this.physics.add.sprite(100, 450, 'dude');\n        player.setBounce(0.2);\n        player.setCollideWorldBounds(true);\n        this.anims.create({\n            key: 'left',\n            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),\n            frameRate: 10,\n            repeat: -1\n        });\n        this.anims.create({\n            key: 'turn',\n            frames: [{ key: 'dude', frame: 4 }],\n            frameRate: 20\n        });\n        this.anims.create({\n            key: 'right',\n            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),\n            frameRate: 10,\n            repeat: -1\n        });\n        this.anims.create({\n            key: 'cratepic',\n            frames: this.anims.generateFrameNumbers('crate', { start: 0, end: 0 }),\n            frameRate: 10,\n            repeat: -1\n        });\n        cursors = this.input.keyboard.createCursorKeys();\n        stars = this.physics.add.group({\n            key: 'star',\n            repeat: 11,\n            setXY: { x: 12, y: 0, stepX: 70 }\n        });\n        stars.children.iterate(function (child) {\n            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));\n        });\n        crates = this.physics.add.group({\n            key: 'crate',\n            frame: 0,\n            repeat: 7,\n            setXY: { x: 200, y: 500, stepX: 0, stepY: -48 }\n        });\n        var i = 0;\n        crates.children.iterate(function (child) {\n            child.body.setSize(48, 48);\n            child.setOffset(15, 30);\n            child.setBounce(1);\n            test[i] = child;\n            i += 1;\n        });\n        // for(let i = 0; i < 10; i+= 1) {\n        //     crates[i] = this.physics.add.sprite(400 + i * 50, 300, 'crate')\n        //     crates[i].body.allowGravity = true;\n        //     crates[i].body.setSize(48,48);\n        //     crates[i].setOffset(15,30)\n        //     this.physics.add.collider(player, crates[i]);\n        //     this.physics.add.collider(crates[i], platforms);\n        // }\n        this.physics.add.collider(player, platforms);\n        this.physics.add.collider(player, movingPlatform);\n        this.physics.add.collider(stars, platforms);\n        this.physics.add.collider(stars, movingPlatform);\n        this.physics.add.collider(crates, test);\n        this.physics.add.collider(crates, platforms);\n        this.physics.add.collider(crates, player);\n        // this.physics.add.overlap(crates, crates, crateCollide, null, this)\n        this.physics.add.overlap(player, stars, collectStar, null, this);\n    };\n    GameScene.prototype.update = function () {\n        if (cursors.left.isDown) {\n            player.setVelocity(-160);\n            player.anims.play('left', true);\n        }\n        else if (cursors.right.isDown) {\n            player.setVelocityX(160);\n            player.anims.play('right', true);\n        }\n        else {\n            player.setVelocityX(0);\n            player.anims.play('turn');\n        }\n        if (cursors.up.isDown && player.body.touching.down) {\n            player.setVelocityY(-330);\n        }\n    };\n    return GameScene;\n}(Phaser.Scene));\nexports.GameScene = GameScene;\n\n\n//# sourceURL=webpack:///./src/scenes/game-scene.ts?");

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