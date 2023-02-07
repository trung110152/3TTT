"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blog_1 = require("../model/blog");
const data_source_1 = require("../data-source");
class BlogService {
    constructor() {
        this.getAll = async () => {
            let sql = 'select b.id, b.content, b.status, b.date, b.image, u.username, c.name as nameCategory from blog_category bc join blog b on bc.idBlog = b.id join category c on bc.idCategory = c.id join user u on b.user = u.id';
            let blogs = await this.blogRepository.query(sql);
            return blogs;
        };
        this.getMyList = async (id) => {
            let sql = `select b.id, b.content, b.status, b.date, b.image, u.username, c.name as nameCategory from blog_category bc join blog b on bc.idBlog = b.id join category c on bc.idCategory = c.id join user u on b.user = u.id where b.user = ${id} `;
            let blogs = await this.blogRepository.query(sql);
            return blogs;
        };
        this.save = async (blog) => {
            return this.blogRepository.save(blog);
        };
        this.update = async (id, newBlog) => {
            let blog = await this.blogRepository.findOneBy({ id: id });
            if (!blog) {
                return null;
            }
            return this.blogRepository.update({ id: id }, newBlog);
        };
        this.findById = async (id) => {
            let blog = await this.blogRepository.findOneBy({ id: id });
            if (!blog) {
                return null;
            }
            return blog;
        };
        this.findByName = async (search) => {
            let sql = `select b.id, b.content, b.status, b.date, b.image, u.username, c.name as nameCategory from blog_category bc join blog b on bc.idBlog = b.id join category c on bc.idCategory = c.id join user u on b.user = u.id where u.username like '%${search}%'`;
            let blog = await this.blogRepository.query(sql);
            if (!blog) {
                return null;
            }
            return blog;
        };
        this.remove = async (id) => {
            let blog = await this.blogRepository.findOneBy({ id: id });
            if (!blog) {
                return null;
            }
            return this.blogRepository.delete({ id: id });
        };
        this.blogRepository = data_source_1.AppDataSource.getRepository(blog_1.Blog);
    }
}
exports.default = new BlogService();
//# sourceMappingURL=BlogService.js.map