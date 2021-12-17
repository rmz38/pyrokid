webpackHotUpdate("app",{

/***/ "./src/objects/crate.ts":
/*!******************************!*\
  !*** ./src/objects/crate.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Crate = /** @class */ (function () {\n    // timeIgnite: number;\n    function Crate(game, x, y, label, owner) {\n        this.crate = game.matter.bodies.add(x, y, 50, 50, { label: label });\n        this.crate.setRectangle(100, 50, {\n            render: { sprite: { xOffset: 0, yOffset: 0.15 } },\n            label: label,\n            inertia: Infinity,\n        });\n        // this.crate.body.immovable = true;\n        // this.crate.body.moves = false;\n        this.crate.setBounce(0);\n        this.onFire = false;\n        this.neighbors = new Set();\n        this.fireSprite = null;\n        this.owner = owner;\n        // this.timeIgnite = null;\n    }\n    return Crate;\n}());\nexports.default = Crate;\n\n\n//# sourceURL=webpack:///./src/objects/crate.ts?");

/***/ })

})