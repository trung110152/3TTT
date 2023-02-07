"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRouter = void 0;
const express_1 = require("express");
const LikeController_1 = __importDefault(require("../controller/LikeController"));
exports.likeRouter = (0, express_1.Router)();
exports.likeRouter.get('/countLike/:idBlog', LikeController_1.default.countLike);
exports.likeRouter.put('/checkLike', LikeController_1.default.checkLike);
//# sourceMappingURL=like-router.js.map