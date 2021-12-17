webpackHotUpdate("app",{

/***/ "./src/objects/connector.ts":
/*!**********************************!*\
  !*** ./src/objects/connector.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar crate_1 = __webpack_require__(/*! ./crate */ \"./src/objects/crate.ts\");\nvar Connector = /** @class */ (function () {\n    function Connector(obj1, obj2, game) {\n        var x1 = obj1.sprite.x;\n        var x2 = obj2.sprite.x;\n        var y1 = obj1.sprite.y;\n        var y2 = obj2.sprite.y;\n        var posx = (Math.max(x2, x1) - Math.min(x2, x1)) / 2;\n        var posy = (Math.max(y2, y1) - Math.min(y2, y1)) / 2;\n        var connector = game.matter.add.image(x2, y2, 'connector', null, { isSensor: true });\n        game.matter.add.joint(obj1.sprite.body, obj2.sprite.body, 0, 1, {\n            pointA: { x: (x2 - x1) / 2, y: (y2 - y1) / 2 },\n            pointB: { x: (x1 - x2) / 2, y: (y1 - y2) / 2 },\n            angularStiffness: 1,\n        });\n        if (x2 - x1 == 0) {\n            connector.angle = 90;\n        }\n        var j = game.matter.add.joint(obj1.sprite.body, connector.body, 0, 1, {\n            pointA: { x: (x2 - x1) / 2, y: (y2 - y1) / 2 },\n            pointB: { x: 0, y: 0 },\n            angularStiffness: 1,\n        });\n        //@ts-ignore\n        j.destroy();\n        this.sprite = connector;\n        if (obj1 instanceof crate_1.default) {\n            obj1.connectors.add(this);\n        }\n        if (obj2 instanceof crate_1.default) {\n            obj2.connectors.add(this);\n        }\n    }\n    Connector.prototype.destroy = function () {\n        this.sprite.destroy();\n    };\n    return Connector;\n}());\nexports.default = Connector;\n\n\n//# sourceURL=webpack:///./src/objects/connector.ts?");

/***/ }),

/***/ "./src/objects/crate.ts":
/*!******************************!*\
  !*** ./src/objects/crate.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Crate = /** @class */ (function () {\n    // timeIgnite: number;\n    function Crate(x, y, id, game, frame) {\n        if (frame === void 0) { frame = 0; }\n        var rec = game.matter.bodies.rectangle(x, y, 50, 50, {\n            label: 'crate' + id,\n            inertia: Infinity,\n        });\n        var crate = game.matter.add.sprite(x, y, 'crate', frame);\n        crate.setExistingBody(rec);\n        // this.crate.setRectangle(100, 50, {\n        //   render: { sprite: { xOffset: 0, yOffset: 0.15 } },\n        //   label: label,\n        //   inertia: Infinity,\n        // });\n        crate.setCollisionCategory(0x0100);\n        crate.setBounce(0);\n        this.sprite = crate;\n        this.onFire = false;\n        this.fireSprite = null;\n        this.connectors = new Set();\n        // this.timeIgnite = null;\n    }\n    Crate.prototype.syncFire = function () {\n        if (this.sprite.active) {\n            this.fireSprite.x = this.sprite.x;\n            this.fireSprite.y = this.sprite.y - 10;\n        }\n    };\n    Crate.prototype.destroy = function () {\n        this.sprite.destroy();\n    };\n    return Crate;\n}());\nexports.default = Crate;\n\n\n//# sourceURL=webpack:///./src/objects/crate.ts?");

/***/ })

})