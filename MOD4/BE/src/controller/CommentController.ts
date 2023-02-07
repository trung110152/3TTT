import {Request, Response} from "express";
import commentService from "../service/CommentService";


class CommentController {
    private commentService;

    constructor() {
        this.commentService = commentService;
    }

    showComment = async (req: Request, res: Response) => {
        try{
            let comments = await commentService.findByIdBlog(req.params.id);
            res.status(200).json(comments)

        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    commentSave = async (req: Request, res: Response) => {
        let comment = await commentService.save(req.body);
        res.status(200).json(comment);
    }


}

export default new CommentController();