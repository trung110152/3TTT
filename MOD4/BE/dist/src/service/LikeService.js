"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const like_1 = require("../model/like");
const data_source_1 = require("../data-source");
class LikeService {
    constructor() {
        this.findByIdBlog = async (idBLog) => {
            let sql = `select c.comment, u.username from comment c join user u on c.user = u.id where c.blog = ${idBLog}`;
            let likes = await this.likeRepository.query(sql);
            return likes;
        };
        this.countLike = async (idBLog) => {
            let sql = `SELECT COUNT(l.status) as likes FROM blog.like l WHERE l.status = "like" and l.blog = ${idBLog};`;
            let likes = await this.likeRepository.query(sql);
            return likes;
        };
        this.checkLike = async (idBLog, idUser) => {
            let sql = `select * from blog.like l where l.blog = ${idBLog} and l.user =${idUser};`;
            let likes = await this.likeRepository.query(sql);
            if (likes.length === 0) {
                return null;
            }
            return likes;
        };
        this.save = async (like) => {
            return this.likeRepository.save(like);
        };
        this.update = async (id, status) => {
            let sql = `UPDATE blog.like l SET l.status = '${status}' WHERE l.id = ${id};`;
            return this.likeRepository.query(sql);
        };
        this.likeRepository = data_source_1.AppDataSource.getRepository(like_1.Like);
    }
}
exports.default = new LikeService();
//# sourceMappingURL=LikeService.js.map