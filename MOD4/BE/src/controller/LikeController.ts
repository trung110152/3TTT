import {Request, Response} from "express";
import likeService from "../service/LikeService";


class LikeController {
    private likeService;

    constructor() {
        this.likeService = likeService;
    }

    countLike = async (req: Request, res: Response) => {
        let likes = await likeService.countLike(req.params.idBlog);
        res.status(200).json(likes);
    }

    checkLike = async (req: Request, res: Response) => {
        let like = req.body
        let likes = await this.likeService.checkLike(like.blog, like.user);
        if(likes === null){
            like.status = 'like';
            await this.likeService.save(like)
            res.status(200).json('done');
        }else if(likes[0].status === 'dislike'){
            likes[0].status = 'like';
            await this.likeService.update(likes[0].id,likes[0].status)
            res.status(200).json('done');
        }else {
            likes[0].status = 'dislike';
            await this.likeService.update(likes[0].id,likes[0].status)
            res.status(200).json('done');
        }
    }
}

export default new LikeController();