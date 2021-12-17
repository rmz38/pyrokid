webpackHotUpdate("app",{

/***/ "./src/objects/crate.ts":
/*!******************************!*\
  !*** ./src/objects/crate.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Crate = /** @class */ (function () {\n    // timeIgnite: number;\n    function Crate(x, y, id, game, frame) {\n        if (frame === void 0) { frame = 0; }\n        var rec = game.matter.bodies.rectangle(x, y, 50, 50, {\n            label: 'crate' + id,\n            inertia: Infinity,\n        });\n        var crate = game.matter.add.sprite(x, y, 'crate', frame);\n        crate.setExistingBody(rec);\n        // this.crate.setRectangle(100, 50, {\n        //   render: { sprite: { xOffset: 0, yOffset: 0.15 } },\n        //   label: label,\n        //   inertia: Infinity,\n        // });\n        crate.setCollisionCategory(0x0100);\n        crate.setBounce(0);\n        this.sprite = crate;\n        this.onFire = false;\n        this.fireSprite = null;\n        // this.timeIgnite = null;\n    }\n    Crate.prototype.syncFire = function () {\n        if (this.sprite.active) {\n            this.fireSprite.x = this.sprite.x;\n            this.fireSprite.y = this.sprite.y - 10;\n        }\n    };\n    Crate.prototype.destroy = function () {\n        this.sprite.destroy();\n    };\n    return Crate;\n}());\nexports.default = Crate;\n\n\n//# sourceURL=webpack:///./src/objects/crate.ts?");

/***/ })

})