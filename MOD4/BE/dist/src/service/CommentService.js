"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_1 = require("../model/comment");
const data_source_1 = require("../data-source");
class CommentService {
    constructor() {
        this.findByIdBlog = async (idBLog) => {
            let sql = `select c.comment, u.username from comment c join user u on c.user = u.id where c.blog = ${idBLog}`;
            let comments = await this.commentRepository.query(sql);
            return comments;
        };
        this.save = async (comment) => {
            return this.commentRepository.save(comment);
        };
        this.commentRepository = data_source_1.AppDataSource.getRepository(comment_1.Comment);
    }
}
exports.default = new CommentService();
//# sourceMappingURL=CommentService.js.map