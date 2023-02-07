"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BlogService_1 = __importDefault(require("../service/BlogService"));
const CategoryService_1 = __importDefault(require("../service/CategoryService"));
class HomeController {
    constructor() {
        this.getAll = async (req, res) => {
            try {
                let blogs = await BlogService_1.default.getAll();
                res.status(200).json(blogs);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.getMyList = async (req, res) => {
            try {
                let id = req.params.id;
                let blogs = await BlogService_1.default.getMyList(id);
                res.status(200).json(blogs);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findById = async (req, res) => {
            try {
                let id = req.params.id;
                let blog = await this.blogService.findById(id);
                res.status(200).json(blog);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.create = async (req, res) => {
            let newBlog = await BlogService_1.default.save(req.body);
            res.status(200).json(newBlog);
        };
        this.saveBlogCategory = async (req, res) => {
            let blogCategory = await CategoryService_1.default.save(req.body);
            res.status(200).json(blogCategory);
        };
        this.update = async (req, res) => {
            let id = req.params.id;
            let newBlog = req.body;
            await this.blogService.update(id, newBlog);
            res.status(200).json('Success!');
        };
        this.remove = async (req, res) => {
            let id = req.params.id;
            await this.blogService.remove(id);
            res.status(200).json('Success!');
        };
        this.search = async (req, res) => {
            let search = req.query.name;
            let blogs = await BlogService_1.default.findByName(search);
            res.status(200).json(blogs);
        };
        this.getCategories = async (req, res) => {
            try {
                let categories = await CategoryService_1.default.getAll();
                res.status(200).json(categories);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.blogService = BlogService_1.default;
        this.categoryService = CategoryService_1.default;
    }
}
exports.default = new HomeController();
//# sourceMappingURL=HomeController.js.map