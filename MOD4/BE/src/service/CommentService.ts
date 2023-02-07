import {Comment} from "../model/comment";
import {AppDataSource} from "../data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class CommentService {
    private commentRepository;
    constructor() {
        this.commentRepository = AppDataSource.getRepository(Comment)
    }

    findByIdBlog = async (idBLog) =>{
        let sql = `select c.comment, u.username from comment c join user u on c.user = u.id where c.blog = ${idBLog}`;
        let comments = await this.commentRepository.query(sql)
        return comments;
    }

    save = async (comment) => {
        return  this.commentRepository.save(comment);
    }
}

export default new CommentService();