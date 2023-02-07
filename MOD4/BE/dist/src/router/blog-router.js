"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = require("express");
const HomeController_1 = __importDefault(require("../controller/HomeController"));
const auth_1 = require("../../middleware/auth");
const checkRole_1 = require("../../middleware/checkRole");
exports.blogRouter = (0, express_1.Router)();
exports.blogRouter.use(auth_1.auth);
exports.blogRouter.get('/', HomeController_1.default.getAll);
exports.blogRouter.post('/', checkRole_1.checkRole, HomeController_1.default.create);
exports.blogRouter.put('/:id', checkRole_1.checkRole, HomeController_1.default.update);
exports.blogRouter.delete('/:id', HomeController_1.default.remove);
exports.blogRouter.get('/findById/:id', HomeController_1.default.findById);
exports.blogRouter.get('/getCategories', HomeController_1.default.getCategories);
exports.blogRouter.get('/search/findByName', HomeController_1.default.search);
exports.blogRouter.post('/blogCategory', checkRole_1.checkRole, HomeController_1.default.saveBlogCategory);
exports.blogRouter.get('/myList/:id', HomeController_1.default.getMyList);
//# sourceMappingURL=blog-router.js.map