"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../model/category");
const data_source_1 = require("../data-source");
const blog_category_1 = require("../model/blog-category");
class CategoryService {
    constructor() {
        this.getAll = async () => {
            let categories = await this.categoryRepository.find();
            return categories;
        };
        this.save = async (blogCategory) => {
            return this.blog_categoryRepository.save(blogCategory);
        };
        this.categoryRepository = data_source_1.AppDataSource.getRepository(category_1.Category);
        this.blog_categoryRepository = data_source_1.AppDataSource.getRepository(blog_category_1.BlogCategory);
    }
}
exports.default = new CategoryService();
//# sourceMappingURL=CategoryService.js.map