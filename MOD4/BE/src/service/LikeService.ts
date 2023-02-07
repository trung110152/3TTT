import {Like} from "../model/like";
import {AppDataSource} from "../data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class LikeService {
    private likeRepository;
    constructor() {
        this.likeRepository = AppDataSource.getRepository(Like)
    }

    findByIdBlog = async (idBLog) =>{
        let sql = `select c.comment, u.username from comment c join user u on c.user = u.id where c.blog = ${idBLog}`;
        let likes = await this.likeRepository.query(sql)
        return likes;
    }

    countLike =async (idBLog) =>{
        let sql = `SELECT COUNT(l.status) as likes FROM blog.like l WHERE l.status = "like" and l.blog = ${idBLog};`;
        let likes = await this.likeRepository.query(sql)
        return likes;
    }
    checkLike = async (idBLog,idUser) =>{
        let sql = `select * from blog.like l where l.blog = ${idBLog} and l.user =${idUser};`;
        let likes = await this.likeRepository.query(sql)
        if(likes.length === 0){
            return null
        }
        return likes;
    }

    save = async (like) => {
        return  this.likeRepository.save(like);
    }

    update = async (id, status)=>{
        let sql = `UPDATE blog.like l SET l.status = '${status}' WHERE l.id = ${id};`
        return this.likeRepository.query(sql);
    }
}

export default new LikeService();