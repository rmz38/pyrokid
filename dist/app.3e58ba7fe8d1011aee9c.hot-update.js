webpackHotUpdate("app",{

/***/ "./src/helpers/init.ts":
/*!*****************************!*\
  !*** ./src/helpers/init.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.connectorBlocks = exports.jointBlocks = exports.initAnims = void 0;\nvar clump_1 = __webpack_require__(/*! ../helpers/clump */ \"./src/helpers/clump.ts\");\nvar connector_1 = __webpack_require__(/*! ../objects/connector */ \"./src/objects/connector.ts\");\nvar initAnims = function (game) {\n    game.anims.create({\n        key: 'squareFire',\n        frames: game.anims.generateFrameNumbers('squareFire', { start: 0, end: 5 }),\n        frameRate: 30,\n        repeat: -1,\n    });\n    game.anims.create({\n        key: 'fireball',\n        frames: game.anims.generateFrameNumbers('fireball', { start: 0, end: 1 }),\n        frameRate: 10,\n        repeat: -1,\n    });\n    game.anims.create({\n        key: 'fireDisappear',\n        frames: game.anims.generateFrameNumbers('fireDisappear', { start: 0, end: 39 }),\n        frameRate: 60,\n    });\n    game.anims.create({\n        key: 'lizard',\n        frames: game.anims.generateFrameNumbers('lizard', { start: 0, end: 29 }),\n        frameRate: 30,\n        repeat: -1,\n    });\n    game.anims.create({\n        key: 'left',\n        frames: game.anims.generateFrameNumbers('player', { start: 0, end: 3 }),\n        frameRate: 10,\n        repeat: -1,\n    });\n    game.anims.create({\n        key: 'turn',\n        frames: [{ key: 'player', frame: 4 }],\n        frameRate: 20,\n    });\n    game.anims.create({\n        key: 'right',\n        frames: game.anims.generateFrameNumbers('player', { start: 5, end: 8 }),\n        frameRate: 10,\n        repeat: -1,\n    });\n    game.anims.create({\n        key: 'spider',\n        frames: game.anims.generateFrameNumbers('spider', { start: 0, end: 9 }),\n        frameRate: 10,\n        repeat: -1,\n    });\n    game.anims.create({\n        key: 'spiderArmored',\n        frames: game.anims.generateFrameNumbers('spiderArmored', { start: 0, end: 9 }),\n        frameRate: 10,\n        repeat: -1,\n    });\n};\nexports.initAnims = initAnims;\nvar jointBlocks = function (game, blocks, data) {\n    var track = new Set();\n    var items = [];\n    data.steel.forEach(function (e) { return items.push(e); });\n    data.crate.forEach(function (e) { return items.push(e); });\n    data.lava.forEach(function (e) { return items.push(e); });\n    items.forEach(function (e) {\n        track.add(blocks[e.x + ',' + e.y]);\n        var sprite = blocks[e.x + ',' + e.y].sprite;\n        var id = clump_1.indexes[e.frame];\n        // odd numbers are sides\n        var sides = id.split('');\n        var up = blocks[e.x + ',' + (e.y - 50)];\n        var right = blocks[e.x + 50 + ',' + e.y];\n        var down = blocks[e.x + ',' + (e.y + 50)];\n        var left = blocks[e.x - 50 + ',' + e.y];\n        if (sides[1] == 1 && !track.has(up)) {\n            var up_1 = blocks[e.x + ',' + (e.y - 50)];\n            game.matter.add.joint(sprite.body, up_1.sprite.body, 0, 1, {\n                pointA: { x: 0, y: -25 },\n                pointB: { x: 0, y: 25 },\n                angularStiffness: 1,\n            });\n            track.add(up_1);\n        }\n        if (sides[3] == 1 && !track.has(right)) {\n            game.matter.add.joint(sprite.body, right.sprite.body, 0, 1, {\n                pointA: { x: 25, y: 0 },\n                pointB: { x: -25, y: 0 },\n                angularStiffness: 1,\n            });\n            track.add(right);\n        }\n        if (sides[5] == 1 && !track.has(down)) {\n            game.matter.add.joint(sprite.body, down.sprite.body, 0, 1, {\n                pointA: { x: 0, y: 25 },\n                pointB: { x: 0, y: -25 },\n                angularStiffness: 1,\n            });\n            track.add(down);\n        }\n        if (sides[7] == 1 && !track.has(left)) {\n            game.matter.add.joint(sprite.body, left.sprite.body, 0, 1, {\n                pointA: { x: -25, y: 0 },\n                pointB: { x: 25, y: 0 },\n                angularStiffness: 1,\n            });\n            track.add(left);\n        }\n    });\n};\nexports.jointBlocks = jointBlocks;\nvar connectorBlocks = function (game, blocks, data) {\n    data.connector.forEach(function (e) {\n        var x = parseInt(e.substring(0, e.indexOf(',')));\n        var y = parseInt(e.substring(e.indexOf(',') + 1));\n        console.log(blocks);\n        console.log(x + ',' + (y - 25));\n        if (x % 50 == 0) {\n            new connector_1.default(blocks[x - 25 + ',' + y], blocks[x - 25 + ',' + y], game);\n        }\n        else {\n            new connector_1.default(blocks[x + ',' + (y - 25)], blocks[x + ',' + (y + 25)], game);\n        }\n    });\n};\nexports.connectorBlocks = connectorBlocks;\n\n\n//# sourceURL=webpack:///./src/helpers/init.ts?");

/***/ }),

/***/ "./src/objects/connector.ts":
/*!**********************************!*\
  !*** ./src/objects/connector.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar crate_1 = __webpack_require__(/*! ./crate */ \"./src/objects/crate.ts\");\nvar Connector = /** @class */ (function () {\n    function Connector(obj1, obj2, game) {\n        var x1 = obj1.sprite.x;\n        var x2 = obj2.sprite.x;\n        var y1 = obj1.sprite.y;\n        var y2 = obj2.sprite.y;\n        var posx = (Math.max(x2, x1) - Math.min(x2, x1)) / 2;\n        var posy = (Math.max(y2, y1) - Math.min(y2, y1)) / 2;\n        var connector = game.matter.add.image(x2 + (x1 - x2) / 2, y2 + (y1 - y2) / 2, 'connector', null, {\n            isSensor: true,\n            ignoreGravity: true,\n        });\n        this.constraint = game.matter.add.joint(obj1.sprite.body, obj2.sprite.body, 0, 1, {\n            pointA: { x: (x2 - x1) / 2, y: (y2 - y1) / 2 },\n            pointB: { x: (x1 - x2) / 2, y: (y1 - y2) / 2 },\n            angularStiffness: 1,\n        });\n        if (x2 - x1 == 0) {\n            connector.angle = 90;\n        }\n        this.connectorPin = game.matter.add.joint(obj1.sprite.body, connector.body, 0, 1, {\n            pointA: { x: 0, y: 0 },\n            pointB: { x: (x1 - x2) / 2, y: (y1 - y2) / 2 },\n            angularStiffness: 1,\n        });\n        this.sprite = connector;\n        if (obj1 instanceof crate_1.default) {\n            obj1.connectors.add(this);\n        }\n        if (obj2 instanceof crate_1.default) {\n            obj2.connectors.add(this);\n        }\n    }\n    Connector.prototype.destroy = function (game) {\n        this.sprite.destroy();\n        game.matter.world.removeConstraint(this.constraint);\n        game.matter.world.removeConstraint(this.connectorPin);\n    };\n    return Connector;\n}());\nexports.default = Connector;\n\n\n//# sourceURL=webpack:///./src/objects/connector.ts?");

/***/ }),

/***/ "./src/objects/crate.ts":
/*!******************************!*\
  !*** ./src/objects/crate.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Crate = /** @class */ (function () {\n    // timeIgnite: number;\n    function Crate(x, y, id, game, frame) {\n        if (frame === void 0) { frame = 0; }\n        var rec = game.matter.bodies.rectangle(x, y, 50, 50, {\n            label: 'crate' + id,\n            inertia: Infinity,\n        });\n        var crate = game.matter.add.sprite(x, y, 'crate', frame);\n        crate.setExistingBody(rec);\n        // this.crate.setRectangle(100, 50, {\n        //   render: { sprite: { xOffset: 0, yOffset: 0.15 } },\n        //   label: label,\n        //   inertia: Infinity,\n        // });\n        crate.setCollisionCategory(0x0100);\n        crate.setBounce(0);\n        this.sprite = crate;\n        this.onFire = false;\n        this.fireSprite = null;\n        this.connectors = new Set();\n        // this.timeIgnite = null;\n    }\n    Crate.prototype.syncFire = function () {\n        if (this.sprite.active) {\n            this.fireSprite.x = this.sprite.x;\n            this.fireSprite.y = this.sprite.y - 10;\n        }\n    };\n    Crate.prototype.destroy = function (game) {\n        this.sprite.destroy();\n        this.connectors.forEach(function (e) {\n            e.destroy(game);\n        });\n    };\n    return Crate;\n}());\nexports.default = Crate;\n\n\n//# sourceURL=webpack:///./src/objects/crate.ts?");

/***/ })

})