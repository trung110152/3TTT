"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const CommentController_1 = __importDefault(require("../controller/CommentController"));
exports.commentRouter = (0, express_1.Router)();
exports.commentRouter.get('/showComment/:id', CommentController_1.default.showComment);
exports.commentRouter.post('/commentSave', CommentController_1.default.commentSave);
//# sourceMappingURL=comment-router.js.map