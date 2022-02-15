webpackHotUpdate("app",{

/***/ "./src/objects/bomb.ts":
/*!*****************************!*\
  !*** ./src/objects/bomb.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar exit_1 = __webpack_require__(/*! ./exit */ \"./src/objects/exit.ts\");\nvar Bomb = /** @class */ (function () {\n    function Bomb(x, y, id, game) {\n        var rec = game.matter.bodies.rectangle(0, 0, 35, 35, {\n            label: 'bomb' + id,\n            inertia: Infinity,\n        });\n        var bombTop = game.matter.bodies.rectangle(0, -17, 10, 2, { isSensor: true, label: 'bomb' + id });\n        var compound = game.matter.body.create({\n            parts: [rec, bombTop],\n            inertia: Infinity,\n            label: 'bomb' + id,\n            render: { sprite: { xOffset: 0.5, yOffset: 0.5 } },\n        });\n        this.sprite = game.matter.add.sprite(x, y, 'bomb', null, {\n            label: 'bomb' + id,\n        });\n        this.sprite.setExistingBody(compound);\n        this.sprite.setPosition(x, y);\n        //collides with lizardcollisionsensors and normal blocks\n        this.sprite.setCollisionCategory(0x100000);\n        this.sprite.setCollidesWith(0x1100);\n        this.sprite.setFixedRotation();\n        this.sprite.setBounce(0);\n    }\n    Bomb.prototype.makeExit = function (game) {\n        if (this.sprite.active) {\n            new exit_1.default(this.sprite.x, this.sprite.y, game);\n            var explosion = game.add.sprite(this.sprite.x, this.sprite.y, 'explosion');\n            explosion.anims.play('explosion');\n            this.sprite.destroy();\n        }\n        //TODO: PLAY EXPLOSION ANIMATION\n    };\n    return Bomb;\n}());\nexports.default = Bomb;\n\n\n//# sourceURL=webpack:///./src/objects/bomb.ts?");

/***/ })

})